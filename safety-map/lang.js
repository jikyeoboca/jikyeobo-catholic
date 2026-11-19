// 다국어(한국어·영어·중국어) 문구 모음
// 문구를 고치려면 아래 목록에서 해당 언어 줄만 수정하세요.
// HTML에서는 data-i18n="키" (글자만) 또는 data-i18n-html="키" (굵은 글씨 등 태그 포함)로 연결돼요.
(function () {
  const STRINGS = {
    ko: {
      siteTitle: '지켜보카 | 가톨릭대학교 성심교정 교내 안전맵',
      back: '← 캠퍼스 소방시설 지도로 돌아가기',
      call119: '119에 전화하기',
      brandSlogan: '우리 학교, 우리가 지켜보카!',
      brandDesc: '가톨릭대학교 성심교정 교내 안전맵',
      feedback: '의견 보내기',
      tip: '지도의 <strong>빨간 핀</strong>을 누르면 그 건물의 소방 시설 위치와 사용법을 볼 수 있어요.',
      emergency: '응급 상황이면 먼저 119에 전화하세요',
      filterAll: '전체보기',
      filterAed: 'AED(자동심장충격기)',
      escapeBtn: '완강기 사용법 <small>위치 준비 중</small>',
      fireBtn: '🧯 소화기 안내 →',
      gate: '🚩 정문',
      listTitle: '소방 시설 목록',
      nearBtn: '가까운 순으로 보기',

      fireTitle: '🧯 소화기 안내',
      fireDocTitle: '소화기 안내 | 지켜보카',
      fireWhereH: '소화기는 어디에 있나요?',
      fireWhereP: '캠퍼스에는 소화기가 아주 많아서 지도에 하나씩 표시하지 않았어요. 대신 건물 안에서 찾는 요령을 알려 드려요.',
      find1: '<b>강의실</b>마다 최소 1개가 있어요. 출입문 근처 벽을 먼저 보세요.',
      find2: '<b>복도</b>의 소화전함 안이나 그 옆에 있어요.',
      find3: '<b>계단 입구</b>나 층 중앙 벽면에서도 찾을 수 있어요.',
      find4: '벽에 붙은 <b>빨간 소화기 표지</b>를 따라가 보세요.',
      fireHint: '지도의 🔥 아이콘은 연습용 표시이고, 실제 소화기 위치가 아니에요.',
      fireCardsH: '소화기 사용법 카드',
      cardNote: '',
      stepsH: '소화기 사용 순서',
      step1: '<b>안전핀을 뽑으세요.</b> 손잡이 위쪽의 핀을 돌려 당겨 뽑아요.',
      step2: '<b>호스를 불 쪽으로 겨누세요.</b> 불길 위가 아니라 불이 타는 아래쪽 밑동을 향해요.',
      step3: '<b>손잡이를 힘껏 쥐세요.</b>',
      step4: '<b>빗자루로 쓸듯이 뿌리세요.</b> 좌우로 쓸면서 불을 덮어 주세요.',
      knowH: '꼭 알아두세요',
      know1: '사용 전에 <b>압력 게이지 바늘이 초록색 구간</b>에 있는지 확인하세요.',
      know2: '불은 <b>출구를 등지지 않는 위치</b>에서 끄세요. 불길이 커지면 바로 나갈 수 있어야 해요.',
      know3: '불이 천장까지 번졌거나 연기가 많으면 <b>끄려 하지 말고 바로 대피</b>한 뒤 119에 신고하세요.',
      know4: '소화기는 불이 막 시작된 때에만 효과가 있어요. 무리하지 마세요.'
    },

    en: {
      siteTitle: 'Jikyeoboca | CUK Songsim Campus Safety Map',
      back: '← Back to the campus fire safety map',
      call119: 'Call 119',
      brandSlogan: 'Our school, let\'s watch over it together!',
      brandDesc: 'The Catholic University of Korea, Songsim Campus Safety Map',
      feedback: 'Send feedback',
      tip: 'Tap a <strong>red pin</strong> on the map to see where the fire safety equipment is in that building and how to use it.',
      emergency: 'In an emergency, call 119 first (Korea\'s emergency number)',
      filterAll: 'View all',
      filterAed: 'AED (Defibrillator)',
      escapeBtn: 'Escape descender guide <small>locations coming soon</small>',
      fireBtn: '🧯 Fire extinguisher guide →',
      gate: '🚩 Main gate',
      listTitle: 'Fire safety equipment list',
      nearBtn: 'Sort by nearest',

      fireTitle: '🧯 Fire Extinguisher Guide',
      fireDocTitle: 'Fire Extinguisher Guide | Jikyeoboca',
      fireWhereH: 'Where are the extinguishers?',
      fireWhereP: 'There are too many extinguishers on campus to mark them one by one on the map. Here are some tips for finding them inside a building.',
      find1: 'Every <b>classroom</b> has at least one. Check the wall near the door first.',
      find2: 'In the <b>hallway</b>, look inside or next to the fire hose cabinet.',
      find3: 'You can also find them at the <b>stairwell entrance</b> or on the wall in the middle of each floor.',
      find4: 'Follow the <b>red extinguisher signs</b> on the walls.',
      fireHint: 'The 🔥 icon on the map is for practice only. It does not show a real extinguisher location.',
      fireCardsH: 'How-to cards',
      cardNote: 'The card images are in Korean. The written steps below are translated.',
      stepsH: 'How to use a fire extinguisher',
      step1: '<b>Pull the safety pin.</b> Twist and pull out the pin at the top of the handle.',
      step2: '<b>Aim the hose at the fire.</b> Aim at the base of the flames, not the top.',
      step3: '<b>Squeeze the handle firmly.</b>',
      step4: '<b>Sweep like a broom.</b> Move side to side to cover the fire.',
      knowH: 'Please remember',
      know1: 'Before use, check that the <b>pressure gauge needle is in the green zone</b>.',
      know2: 'Stand where <b>you are not turning your back on the exit</b>. If the fire grows, you must be able to leave right away.',
      know3: 'If the fire has reached the ceiling or there is a lot of smoke, <b>don\'t try to fight it. Evacuate immediately</b> and call 119.',
      know4: 'Extinguishers only work on a fire that has just started. Don\'t take risks.'
    },

    zh: {
      siteTitle: 'Jikyeoboca | 韩国天主教大学圣心校区校内安全地图',
      back: '← 返回校园消防设施地图',
      call119: '拨打119',
      brandSlogan: '我们的学校，我们来守护！',
      brandDesc: '韩国天主教大学圣心校区校内安全地图',
      feedback: '提交意见',
      tip: '点击地图上的<strong>红色图钉</strong>，即可查看该建筑的消防设施位置和使用方法。',
      emergency: '紧急情况请先拨打119（韩国急救电话）',
      filterAll: '查看全部',
      filterAed: 'AED（自动体外除颤器）',
      escapeBtn: '缓降器使用方法 <small>位置准备中</small>',
      fireBtn: '🧯 灭火器指南 →',
      gate: '🚩 正门',
      listTitle: '消防设施列表',
      nearBtn: '按距离排序',

      fireTitle: '🧯 灭火器指南',
      fireDocTitle: '灭火器指南 | Jikyeoboca',
      fireWhereH: '灭火器在哪里？',
      fireWhereP: '校园里的灭火器数量很多，无法在地图上逐一标出。这里告诉你在建筑内寻找灭火器的方法。',
      find1: '每间<b>教室</b>至少有1个。请先看门口附近的墙壁。',
      find2: '在<b>走廊</b>的消防栓箱里面或旁边。',
      find3: '<b>楼梯口</b>或每层中间的墙面也能找到。',
      find4: '请沿着墙上的<b>红色灭火器标志</b>寻找。',
      fireHint: '地图上的🔥图标仅用于练习，并不是真实的灭火器位置。',
      fireCardsH: '灭火器使用方法卡片',
      cardNote: '卡片图片为韩文。下方的文字步骤已翻译。',
      stepsH: '灭火器使用步骤',
      step1: '<b>拔掉安全销。</b>转动并拔出手柄上方的销子。',
      step2: '<b>将喷管对准火源。</b>瞄准火焰根部，而不是火焰上方。',
      step3: '<b>用力握紧手柄。</b>',
      step4: '<b>像扫地一样喷射。</b>左右扫动，覆盖火焰。',
      knowH: '请务必记住',
      know1: '使用前请确认<b>压力表指针在绿色区域</b>。',
      know2: '请站在<b>不背对出口的位置</b>灭火。火势变大时要能立刻撤离。',
      know3: '如果火已蔓延到天花板或烟很大，<b>不要试图灭火，请立即撤离</b>并拨打119。',
      know4: '灭火器只对刚刚起火的火情有效。请不要勉强。'
    }
  };

  const NAMES = { ko: '한국어', en: 'English', zh: '中文' };
  const KEY = 'jikyeoboca-lang';

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function detect() {
    const s = saved();
    if (s && STRINGS[s]) return s;
    const n = (navigator.language || 'ko').toLowerCase();
    if (n.startsWith('zh')) return 'zh';
    if (n.startsWith('en')) return 'en';
    return 'ko';
  }

  let lang = detect();

  // 다른 파일(app.js 등)에서 문구를 가져다 쓸 수 있게 내보내요
  window.t = function (key) {
    const d = STRINGS[lang] || STRINGS.ko;
    return d[key] != null ? d[key] : (STRINGS.ko[key] != null ? STRINGS.ko[key] : key);
  };
  window.getLang = function () { return lang; };

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = window.t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = window.t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  window.setLang = function (next) {
    if (!STRINGS[next]) return;
    lang = next;
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply();
  };

  // 언어 선택 버튼을 페이지 맨 위에 자동으로 넣어요
  function makeSwitch() {
    const wrap = document.querySelector('main.wrap');
    if (!wrap) return;
    const box = document.createElement('div');
    box.className = 'lang-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Language');
    Object.keys(NAMES).forEach(function (code) {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.lang = code;
      b.textContent = NAMES[code];
      b.addEventListener('click', function () { window.setLang(code); });
      box.appendChild(b);
    });
    wrap.insertBefore(box, wrap.firstChild);
  }

  makeSwitch();
  apply();
})();
