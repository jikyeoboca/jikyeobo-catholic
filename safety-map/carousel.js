// 카드뉴스를 한 장씩 옆으로 넘기는 기능
// 사용법: <div class="card-carousel" data-folder="이미지 폴더" data-prefix="파일 이름 앞부분" data-count="장 수" data-label="제목"></div>
(function () {
  function setupCarousel(wrap) {
    if (!wrap || wrap.dataset.ready) return;
    wrap.dataset.ready = '1';
    const folder = wrap.dataset.folder;
    const prefix = wrap.dataset.prefix;
    const total = Number(wrap.dataset.count);
    const label = wrap.dataset.label || '카드뉴스';

    let slides = '';
    let dots = '';
    for (let i = 1; i <= total; i++) {
      slides += '<li class="slide"><img src="' + folder + '/' + prefix + i + '.jpg" alt="' + label + ' ' + i + '단계" draggable="false"></li>';
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
})();
