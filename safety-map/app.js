(function () {
  const map = document.getElementById('map');
  const list = document.getElementById('list');
  const nearBtn = document.getElementById('near-btn');
  const nearStatus = document.getElementById('near-status');
  let filter = 'all';
  let userPos = null;
  let fireEl = null;
  const canHover = window.matchMedia('(hover: hover)').matches;

  // ---------- 공통 팝업 ----------
  function openModal(html, onReady) {
    const back = document.createElement('div');
    back.className = 'confirm-backdrop';
    back.innerHTML = html;
    document.body.appendChild(back);
    const opener = document.activeElement;
    function onKey(ev) { if (ev.key === 'Escape') close(); }
    function close() {
      back.remove();
      document.removeEventListener('keydown', onKey);
      if (opener && opener.focus) opener.focus();
    }
    document.addEventListener('keydown', onKey);
    back.addEventListener('click', function (ev) { if (ev.target === back) close(); });
    onReady(back, close);
  }

  // ---------- 거리 계산 ----------
  function distanceM(a, b) {
    const R = 6371000, rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
    const h = Math.sin(dLat / 2) ** 2 +
      Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function formatDist(m) {
    return m < 1000 ? Math.round(m) + 'm' : (m / 1000).toFixed(1) + 'km';
  }
  function hasCoords(b) { return typeof b.lat === 'number' && typeof b.lng === 'number'; }

  // ---------- 내 위치 점 ----------
  // 위도·경도 → 지도 그림 위 위치(%). 건물 13곳 좌표로 맞춘 값이에요.
  function toMap(lat, lng) {
    const a = (lat - 37.4865) * 1e4, g = (lng - 126.801) * 1e4;
    return { x: 1.534 * a - 0.521 * g + 49.327, y: 0.828 * a + 1.362 * g + 45.191 };
  }
  function showMe() {
    let dot = document.getElementById('me-dot');
    const p = userPos ? toMap(userPos.lat, userPos.lng) : null;
    if (!p || p.x < 0 || p.x > 100 || p.y < 0 || p.y > 100) {
      if (dot) dot.remove();
      return false;
    }
    if (!dot) {
      dot = document.createElement('span');
      dot.id = 'me-dot';
      dot.className = 'me-dot';
      dot.setAttribute('role', 'img');
      dot.setAttribute('aria-label', 'My location');
      map.appendChild(dot);
    }
    dot.style.left = p.x + '%';
    dot.style.top = p.y + '%';
    return true;
  }

  // 건물 이름 끝 괄호 속 약어로 핀 고르기: AED "다솔관(D)" → images/aed-pins/D.png
  //                                    완강기 "다솔관(D)" → images/escape-pins/D.png
  function pinSrc(b) {
    const m = b.name.match(/\(([A-Z]+)관?\)$/);
    const folder = b.type === 'escape' ? 'images/escape-pins/' : 'images/aed-pins/';
    return m ? folder + m[1] + '.png' : 'images/pin.png';
  }

  // ---------- 핀과 목록 그리기 ----------
  function render() {
    map.querySelectorAll('.pin').forEach(function (p) { p.remove(); });
    list.innerHTML = '';

    function withId(type) {
      return function ([id, b]) { return Object.assign({ id: id, type: type }, b); };
    }
    let rows = Object.entries(AED_DATA).map(withId('aed'))
      .concat(Object.entries(ESCAPE_DATA).map(withId('escape')))
      .filter(function (b) { return filter === 'all' || b.type === filter; });

    // 건물 번호순으로 묶어 보여 주고, 같은 건물 안에서는 AED → 완강기 순서
    rows.sort(function (a, b) {
      return (Number(a.id) - Number(b.id)) || (a.type === 'aed' ? -1 : 1) - (b.type === 'aed' ? -1 : 1);
    });

    if (userPos) {
      rows.forEach(function (b) { b.dist = hasCoords(b) ? distanceM(userPos, b) : null; });
      rows.sort(function (a, b) {
        return (a.dist == null ? Infinity : a.dist) - (b.dist == null ? Infinity : b.dist);
      });
    }

    rows.forEach(function (b) {
      const name = bName(b);
      const floors = bFloors(b).join(', ');
      const detail = bDetail(b);
      const isEscape = b.type === 'escape';
      const kind = isEscape ? t('escapeShort') : 'AED';
      const href = (isEscape ? 'escape.html?b=' : 'aed.html?b=') + b.id;

      const pin = document.createElement('a');
      pin.className = 'pin';
      pin.href = href;
      pin.style.left = b.x + '%';
      pin.style.top = b.y + '%';
      pin.setAttribute('aria-label', name + ' ' + t(isEscape ? 'escapeInfo' : 'aedInfo'));
      pin.innerHTML =
        '<img src="' + pinSrc(b) + '" alt="">' +
        '<span class="tip"><strong>' + name + '</strong>' +
        kind + ' ' + floors + '<br>' + detail + '</span>';
      map.appendChild(pin);

      const row = document.createElement('a');
      row.href = href;
      const dist = (userPos && b.dist != null) ? '<em>' + formatDist(b.dist) + '</em>' : '';
      row.innerHTML = '<b>' + name + '</b><span>' + kind + ' · ' + floors + dist + '</span>';
      list.appendChild(row);

      // PC: 목록에 마우스를 올리거나 키보드로 고르면 해당 핀이 움직여요
      if (canHover) {
        row.addEventListener('mouseenter', function () { pin.classList.add('active'); });
        row.addEventListener('mouseleave', function () { pin.classList.remove('active'); });
      }
      row.addEventListener('focus', function () { pin.classList.add('active'); });
      row.addEventListener('blur', function () { pin.classList.remove('active'); });
    });

    if (!rows.length) list.innerHTML = '<p class="empty">' + t('noFacility') + '</p>';
  }

  // ---------- 1. 시설 종류 필터 ----------
  document.querySelectorAll('.filters button[data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      filter = btn.dataset.filter;
      document.querySelectorAll('.filters button[data-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      render();
    });
  });

  // ---------- 2. 가까운 순 정렬 ----------
  let statusKey = null;
  let statusReset = false;

  function drawStatus() {
    if (!statusKey) { nearStatus.textContent = ''; return; }
    nearStatus.innerHTML = t(statusKey) +
      (statusReset ? ' <button type="button" class="link-btn" id="near-reset">' + t('nearReset') + '</button>' : '');
    if (statusReset) {
      document.getElementById('near-reset').onclick = function () {
        userPos = null;
        statusKey = null;
        statusReset = false;
        drawStatus();
        render();
        showMe();
      };
    }
  }
  function setStatus(key, withReset) {
    statusKey = key;
    statusReset = !!withReset;
    drawStatus();
  }

  function locate() {
    if (!('geolocation' in navigator)) {
      setStatus('locNoSupport');
      return;
    }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(function (pos) {
      userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      render();
      const onMap = showMe();
      setStatus(onMap ? 'nearDoneOn' : 'nearDoneOff', true);
    }, function (err) {
      setStatus(err.code === 1 ? 'locDenied' : 'locFail');
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  }

  nearBtn.addEventListener('click', function () {
    openModal(
      '<div class="confirm-box" role="dialog" aria-modal="true" aria-labelledby="loc-title">' +
      '<p id="loc-title">' + t('nearTitle') + '</p>' +
      '<p class="small">' + t('nearDesc') + '</p>' +
      '<div class="confirm-btns">' +
      '<button type="button" class="no">' + t('cancel') + '</button>' +
      '<button type="button" class="yes ok">' + t('allow') + '</button>' +
      '</div></div>',
      function (box, close) {
        box.querySelector('.no').onclick = close;
        box.querySelector('.yes').onclick = function () { close(); locate(); };
        box.querySelector('.yes').focus();
      }
    );
  });

  // ---------- 소화기 안내 페이지로 이동 ----------
  const fireBtn = document.getElementById('fire-btn');
  if (fireBtn) {
    fireBtn.addEventListener('click', function () { location.href = 'fire.html'; });
  }

  // ---------- 오늘의 불 아이콘 → 소화기 사용법 팝업 ----------
  function openFirePopup() {
    const note = t('cardNote');
    openModal(
      '<div class="confirm-box info-box" role="dialog" aria-modal="true" aria-labelledby="fire-pop-title">' +
      '<p id="fire-pop-title">' + t('firePopTitle') + '</p>' +
      '<p class="small">' + t('firePopP1') + '</p>' +
      '<div class="card-carousel" data-folder="images/fire-guide" data-prefix="fire" data-count="6" data-label="' + t('firePopTitle') + '"></div>' +
      '<a class="video-btn" href="https://youtube.com/shorts/PhK9Bbx7uVk" target="_blank" rel="noopener">' + t('videoBtn') + '</a>' +
      (note ? '<p class="small">' + note + '</p>' : '') +
      '<p class="small">' + t('firePopP2') + '</p>' +
      '<div class="confirm-btns">' +
      '<button type="button" class="no">' + t('close') + '</button>' +
      '<button type="button" class="yes ok">' + t('moreBtn') + '</button>' +
      '</div></div>',
      function (box, close) {
        setupCarousel(box.querySelector('.card-carousel'));
        box.querySelector('.no').onclick = close;
        box.querySelector('.yes').onclick = function () { location.href = 'fire.html'; };
        box.querySelector('.yes').focus();
      }
    );
  }

  // ---------- 3. 오늘의 불 아이콘 ----------
  function todaySpot() {
    const kst = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10); // 한국 날짜
    let h = 2166136261;
    for (const ch of kst) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
    return FIRE_SPOTS[h % FIRE_SPOTS.length];
  }

  function placeFire() {
    const [x, y] = todaySpot();
    const fire = document.createElement('button');
    fire.type = 'button';
    fire.className = 'fire';
    fire.style.left = x + '%';
    fire.style.top = y + '%';
    fire.setAttribute('aria-label', t('fireAria'));
    fire.innerHTML = '<span aria-hidden="true">🔥</span>';
    fire.addEventListener('click', openFirePopup);
    map.appendChild(fire);
    fireEl = fire;
  }

  // ---------- 언어를 바꾸면 핀·목록·안내 문구도 다시 그려요 ----------
  document.addEventListener('langchange', function () {
    render();
    showMe();
    drawStatus();
    if (fireEl) fireEl.setAttribute('aria-label', t('fireAria'));
  });

  render();
  placeFire();
})();
