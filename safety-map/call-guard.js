document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="tel:"]');
  if (!link) return;
  e.preventDefault();
  const number = link.getAttribute('href').slice(4);
  // 지금 고른 언어의 문구를 가져와 {n} 자리에 전화번호를 넣어요
  function msg(key) { return window.t(key).split('{n}').join(number); }

  const back = document.createElement('div');
  back.className = 'confirm-backdrop';
  back.innerHTML =
    '<div class="confirm-box" role="dialog" aria-modal="true" aria-labelledby="call-title" aria-describedby="call-desc">' +
    '<p id="call-title">' + msg('callTitle') + '</p>' +
    '<p id="call-desc" class="call-warn">' + msg('callWarn') + '</p>' +
    '<p class="call-question">' + msg('callQ') + '</p>' +
    '<div class="confirm-btns">' +
    '<button type="button" class="no">' + msg('callNo') + '</button>' +
    '<button type="button" class="yes">' + msg('callYes') + '</button>' +
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
