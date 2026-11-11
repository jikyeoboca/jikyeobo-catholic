(function () {
  document.querySelectorAll('img.zoom').forEach(function (img) {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
  });

  function openZoom(img) {
    const back = document.createElement('div');
    back.className = 'zoom-backdrop';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.setAttribute('aria-label', img.alt);
    back.innerHTML = '<button type="button" class="zoom-close" aria-label="닫기">✕</button>';
    const big = document.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    back.appendChild(big);
    document.body.appendChild(back);
    document.body.style.overflow = 'hidden';

    function onKey(ev) { if (ev.key === 'Escape') close(); }
    function close() {
      back.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      img.focus();
    }
    document.addEventListener('keydown', onKey);
    back.querySelector('.zoom-close').onclick = close;
    back.addEventListener('click', function (ev) { if (ev.target === back) close(); });
    back.querySelector('.zoom-close').focus();
  }

  document.addEventListener('click', function (e) {
    const img = e.target.closest('img.zoom');
    if (img) openZoom(img);
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('img.zoom')) {
      e.preventDefault();
      openZoom(e.target);
    }
  });
})();
