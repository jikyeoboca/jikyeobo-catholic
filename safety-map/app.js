(function () {
  const map = document.getElementById('map');
  const list = document.getElementById('list');
  const nearBtn = document.getElementById('near-btn');
  const nearStatus = document.getElementById('near-status');
  let filter = 'all';
  let userPos = null;
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
      dot.setAttribute('aria-label', '내 위치');
      map.appendChild(dot);
    }
    dot.style.left = p.x + '%';
    dot.style.top = p.y + '%';
    return true;
  }

  // 건물 이름 끝 괄호 속 약어로 핀 고르기: "다솔관(D)" → images/pins/D.png
  function pinSrc(b) {
    const m = b.name.match(/\(([A-Z]+)관?\)$/);
    return m ? 'images/pins/' + m[1] + '.png' : 'images/pin.png';
  }

  // ---------- 핀과 목록 그리기 ----------
  function render() {
    map.querySelectorAll('.pin').forEach(function (p) { p.remove(); });
    list.innerHTML = '';

    let rows = Object.entries(AED_DATA)
      .map(function ([id, b]) { return Object.assign({ id: id, type: 'aed' }, b); })
      .filter(function (b) { return filter === 'all' || b.type === filter; });

    if (userPos) {
      rows.forEach(function (b) { b.dist = hasCoords(b) ? distanceM(userPos, b) : null; });
      rows.sort(function (a, b) {
        return (a.dist == null ? Infinity : a.dist) - (b.dist == null ? Infinity : b.dist);
      });
    }

    rows.forEach(function (b) {
      const pin = document.createElement('a');
      pin.className = 'pin';
      pin.href = 'aed.html?b=' + b.id;
      pin.style.left = b.x + '%';
      pin.style.top = b.y + '%';
      pin.setAttribute('aria-label', b.name + ' AED 정보');
      pin.innerHTML =
        '<img src="' + pinSrc(b) + '" alt="">' +
        '<span class="tip"><strong>' + b.name + '</strong>' +
        'AED ' + b.floors.join(', ') + '<br>' + b.detail + '</span>';
      map.appendChild(pin);

      const row = document.createElement('a');
      row.href = 'aed.html?b=' + b.id;
      const dist = (userPos && b.dist != null) ? '<em>' + formatDist(b.dist) + '</em>' : '';
      row.innerHTML = '<b>' + b.name + '</b><span>' + b.floors.join(', ') + dist + '</span>';
      list.appendChild(row);

      // PC: 목록에 마우스를 올리거나 키보드로 고르면 해당 핀이 움직여요
      if (canHover) {
        row.addEventListener('mouseenter', function () { pin.classList.add('active'); });
        row.addEventListener('mouseleave', function () { pin.classList.remove('active'); });
      }
      row.addEventListener('focus', function () { pin.classList.add('active'); });
      row.addEventListener('blur', function () { pin.classList.remove('active'); });
    });

    if (!rows.length) list.innerHTML = '<p class="empty">표시할 시설이 없어요.</p>';
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
  function setStatus(text, withReset) {
    nearStatus.innerHTML = text +
      (withReset ? ' <button type="button" class="link-btn" id="near-reset">원래 순서로</button>' : '');
    if (withReset) {
      document.getElementById('near-reset').onclick = function () {
        userPos = null;
        nearStatus.textContent = '';
        render();
        showMe();        
      };
    }
  }

  function locate() {
    if (!('geolocation' in navigator)) {
      setStatus('이 브라우저에서는 위치 기능을 쓸 수 없어요.');
      return;
    }
    setStatus('내 위치를 찾는 중이에요…');
    navigator.geolocation.getCurrentPosition(function (pos) {
      userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      render();
      const onMap = showMe();
      setStatus('내 위치에서 가까운 순으로 정렬했어요. ' +
        (onMap ? '지도의 파란 점이 내 위치예요. 실내에서는 수십 m 오차가 날 수 있어요.'
               : '지금은 캠퍼스 밖이라 지도에는 내 위치를 표시하지 않았어요.'), true);
    }, function (err) {
      if (err.code === 1) {
        setStatus('위치 권한이 꺼져 있어요. 브라우저 설정에서 이 사이트의 위치 권한을 허용한 뒤 다시 눌러 주세요.');
      } else {
        setStatus('위치를 찾지 못했어요. 잠시 후 다시 눌러 주세요.');
      }
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  }

  nearBtn.addEventListener('click', function () {
    openModal(
      '<div class="confirm-box" role="dialog" aria-modal="true" aria-labelledby="loc-title">' +
      '<p id="loc-title">내 위치를 사용할까요?</p>' +
      '<p class="small">가까운 안전시설을 찾는 데만 쓰고, 어디에도 저장하지 않아요. ' +
      '허용을 누르면 브라우저에서 한 번 더 위치 권한을 물어볼 수 있어요.</p>' +
      '<div class="confirm-btns">' +
      '<button type="button" class="no">취소</button>' +
      '<button type="button" class="yes ok">허용</button>' +
      '</div></div>',
      function (box, close) {
        box.querySelector('.no').onclick = close;
        box.querySelector('.yes').onclick = function () { close(); locate(); };
        box.querySelector('.yes').focus();
      }
    );
  });

  // ---------- 완강기 사용법 팝업 ----------
  const escapeBtn = document.getElementById('escape-btn');
  if (escapeBtn) {
    escapeBtn.addEventListener('click', function () {
      openModal(
        '<div class="confirm-box info-box" role="dialog" aria-modal="true" aria-labelledby="escape-title">' +
        '<p id="escape-title">완강기 사용법</p>' +
        '<p class="small">캠퍼스 완강기 위치는 준비 중이에요. 먼저 사용법을 익혀 두세요.</p>' +
        '<div class="card-carousel" data-folder="images/escape-guide" data-prefix="escape-" data-count="6" data-label="완강기 사용법"></div>' +
        '<p class="small">완강기는 불이나 연기 때문에 계단으로 대피할 수 없을 때만 사용하세요.</p>' +
        '<div class="confirm-btns"><button type="button" class="yes ok">확인</button></div>' +
        '</div>',
        function (box, close) {
          setupCarousel(box.querySelector('.card-carousel'));
          box.querySelector('.yes').onclick = close;
          box.querySelector('.yes').focus();
        }
      );
    });
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
    fire.setAttribute('aria-label', '소화기 사용법 보기');
    fire.innerHTML = '<span aria-hidden="true">🔥</span>';

    fire.addEventListener('click', function () {
      const total = 6;
      let slides = '';
      let dots = '';
      for (let i = 1; i <= total; i++) {
        slides += '<li class="slide"><img src="images/fire/fire-' + i + '.jpg" alt="소화기 사용법 ' + i + '단계" draggable="false"></li>';
        dots += '<button type="button" class="dot" aria-label="' + i + '번째 카드"></button>';
      }
      openModal(
        '<div class="confirm-box info-box" role="dialog" aria-modal="true" aria-labelledby="fire-title">' +
        '<p id="fire-title">소화기 사용법</p>' +
        '<p class="small">오늘의 불은 연습용 표시예요. 실제 소화기 위치가 아니에요.</p>' +
        '<div class="carousel">' +
          '<ul class="slides">' + slides + '</ul>' +
          '<button type="button" class="nav prev" aria-label="이전 카드">‹</button>' +
          '<button type="button" class="nav next" aria-label="다음 카드">›</button>' +
          '<span class="count">1 / ' + total + '</span>' +
        '</div>' +
        '<div class="dots">' + dots + '</div>' +
        '<p class="small">불이 천장까지 번졌거나 연기가 많으면 끄려 하지 말고 바로 대피한 뒤 119에 신고하세요.</p>' +
        '<div class="confirm-btns"><button type="button" class="yes ok">확인</button></div>' +
        '</div>',
        function (box, close) {
          const track = box.querySelector('.slides');
          const dotBtns = box.querySelectorAll('.dot');
          const count = box.querySelector('.count');
          const prev = box.querySelector('.prev');
          const next = box.querySelector('.next');
          function current() { return Math.round(track.scrollLeft / track.clientWidth); }
          function go(i) {
            i = Math.max(0, Math.min(total - 1, i));
            track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
          }
          function update() {
            const i = current();
            count.textContent = (i + 1) + ' / ' + total;
            dotBtns.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
            prev.disabled = i === 0;
            next.disabled = i === total - 1;
          }
          track.addEventListener('scroll', function () { window.requestAnimationFrame(update); });
          prev.onclick = function () { go(current() - 1); };
          next.onclick = function () { go(current() + 1); };
          dotBtns.forEach(function (d, k) { d.onclick = function () { go(k); }; });
          box.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') go(current() - 1);
            if (e.key === 'ArrowRight') go(current() + 1);
          });
          update();
          box.querySelector('.yes').onclick = close;
          box.querySelector('.yes').focus();
        }
      );
    });
    map.appendChild(fire);
  }

  render();
  placeFire();
})();
