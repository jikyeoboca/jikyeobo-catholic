document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href^="tel:"]');
  if (!link) return;
  e.preventDefault();
  const number = link.getAttribute('href').slice(4);

  const back = document.createElement('div');
  back.className = 'confirm-backdrop';
  back.innerHTML =
    '<div class="confirm-box" role="dialog" aria-modal="true" aria-labelledby="confirm-text">' +
    '<p id="confirm-text">정말로 ' + number + '에 전화하시겠습니까?</p>' +
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
