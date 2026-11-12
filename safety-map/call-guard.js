document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="tel:"]');
  if (!link) return;
  e.preventDefault();
  const number = link.getAttribute('href').slice(4);

  const back = document.createElement('div');
  back.className = 'confirm-backdrop';
  back.innerHTML =
    '<div class="confirm-box" role="dialog" aria-modal="true" aria-labelledby="call-title" aria-describedby="call-desc">' +
    '<p id="call-title">⚠️ ' + number + ' 긴급전화 연결 안내</p>' +
    '<p id="call-desc" class="call-warn">이 버튼은 실제 ' + number + ' 긴급전화로 연결됩니다.<br>' +
    '화재, 응급환자, 구조 요청 등 실제 긴급상황에서만 이용해 주세요.</p>' +
    '<p class="call-question">정말로 ' + number + '에 전화하시겠습니까?</p>' +
    '<div class="confirm-btns">' +
    '<button type="button" class="no">아니오</button>' +
    '<button type="button" class="yes">예</button>' +
    '</div></div>';
  document.body.appendChild(back);

  function onKey(ev) { if (ev.key === 'Escape') close(); }
  function close() {
    back.remove();
    document.removeEventListener('keydown', onKey);
    link.focus();
  }
  document.addEventListener('keydown', onKey);
  back.querySelector('.no').onclick = close;
  back.querySelector('.yes').onclick = function () {
    close();
    location.href = 'tel:' + number;
  };
  back.addEventListener('click', function (ev) { if (ev.target === back) close(); });
  back.querySelector('.no').focus();
});
