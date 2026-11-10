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
        '<img src="images/pin.png" alt="">' +
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
      const anyCoords = Object.values(AED_DATA).some(hasCoords);
      if (anyCoords) {
        setStatus('내 위치에서 가까운 순으로 정렬했어요. 실내에서는 수십 m 오차가 날 수 있어요.', true);
      } else {
        setStatus('아직 건물 좌표가 등록되지 않아 거리를 계산할 수 없어요.', true);
      }
      render();
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
      openModal(
        '<div class="confirm-box info-box" role="dialog" aria-modal="true" aria-labelledby="fire-title">' +
        '<p id="fire-title">소화기 사용법</p>' +
        '<p class="small">오늘의 불은 연습용 표시예요. 실제 소화기 위치가 아니에요.</p>' +
        '<ol>' +
        '<li><b>안전핀 뽑기</b> 손잡이를 누르지 않은 상태에서 안전핀을 뽑아요.</li>' +
        '<li><b>노즐 잡기</b> 노즐(호스)을 불이 난 쪽으로 향해요.</li>' +
        '<li><b>손잡이 누르기</b> 손잡이를 힘껏 움켜쥐어요.</li>' +
        '<li><b>골고루 뿌리기</b> 불의 아랫부분을 향해 빗자루로 쓸듯이 뿌려요.</li>' +
        '</ol>' +
        '<p class="small">실내에서는 출입구를 등지고, 실외에서는 바람을 등지고 사용하세요. 불이 천장까지 번졌거나 연기가 많으면 끄려 하지 말고 바로 대피한 뒤 119에 신고하세요.</p>' +
        '<div class="confirm-btns"><button type="button" class="yes ok">확인</button></div>' +
        '</div>',
        function (box, close) {
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
