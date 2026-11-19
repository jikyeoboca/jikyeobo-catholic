// 카드뉴스를 한 장씩 옆으로 넘기는 기능
// 언어별 카드는 같은 이름의 폴더 뒤에 -en, -zh를 붙인 폴더에 넣어요. (예: images/fire-guide-en)
// 사용법: <div class="card-carousel" data-folder="이미지 폴더" data-prefix="파일 이름 앞부분" data-count="장 수" data-label="제목" data-ext="확장자(기본 png)"></div>
(function () {
  function setupCarousel(wrap) {
    if (!wrap || wrap.dataset.ready) return;
    wrap.dataset.ready = '1';
    const lang = window.getLang ? window.getLang() : 'ko';
    const baseFolder = wrap.dataset.folder;
    const folder = baseFolder + (lang === 'ko' ? '' : '-' + lang);
    const prefix = wrap.dataset.prefix;
    const total = Number(wrap.dataset.count);
    const label = wrap.dataset.label || '카드뉴스';
    const ext = wrap.dataset.ext || 'png';

    let slides = '';
    let dots = '';
    for (let i = 1; i <= total; i++) {
      slides += '<li class="slide"><img src="' + folder + '/' + prefix + i + '.' + ext + '" alt="' + label + ' ' + i + '단계" draggable="false"></li>';
      dots += '<button type="button" class="dot" aria-label="' + i + '번째 카드"></button>';
    }
    wrap.innerHTML =
      '<div class="carousel" tabindex="0" aria-label="' + label + ' 카드">' +
        '<ul class="slides">' + slides + '</ul>' +
        '<button type="button" class="nav prev" aria-label="이전 카드">‹</button>' +
        '<button type="button" class="nav next" aria-label="다음 카드">›</button>' +
        '<span class="count">1 / ' + total + '</span>' +
      '</div>' +
      '<div class="dots">' + dots + '</div>';

    // 언어별 카드가 없거나 파일 이름이 틀리면 한국어 카드로 대신 보여줘요
    if (folder !== baseFolder) {
      wrap.querySelectorAll('.slide img').forEach(function (img, k) {
        img.addEventListener('error', function () {
          img.src = baseFolder + '/' + prefix + (k + 1) + '.' + ext;
        }, { once: true });
      });
    }

    const track = wrap.querySelector('.slides');
    const dotBtns = wrap.querySelectorAll('.dot');
    const count = wrap.querySelector('.count');
    const prev = wrap.querySelector('.prev');
    const next = wrap.querySelector('.next');

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
    wrap.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
    });
    update();
  }

  // 팝업처럼 나중에 생기는 카드뉴스에서도 쓸 수 있게 내보내요
  window.setupCarousel = setupCarousel;
  document.querySelectorAll('.card-carousel').forEach(setupCarousel);

  // 언어를 바꾸면 그 언어의 카드로 다시 그려요
  document.addEventListener('langchange', function () {
    document.querySelectorAll('.card-carousel[data-ready]').forEach(function (wrap) {
      delete wrap.dataset.ready;
      setupCarousel(wrap);
    });
  });
})();
