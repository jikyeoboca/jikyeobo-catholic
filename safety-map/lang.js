// 다국어(한국어·영어·중국어) 문구 모음
// 문구를 고치려면 아래 목록에서 해당 언어 줄만 수정하세요.
// HTML에서는 data-i18n="키" (글자만) 또는 data-i18n-html="키" (굵은 글씨 등 태그 포함)로 연결돼요.
(function () {
  const STRINGS = {
    ko: {
      siteTitle: '지켜보카 | 가톨릭대학교 성심교정 교내 안전맵',
      brandTitle: '지켜보카',
      back: '← 캠퍼스 소방시설 지도로 돌아가기',
      call119: '119에 전화하기',
      brandSlogan: '우리 학교, 우리가 지켜보카!',
      brandDesc: '가톨릭대학교 성심교정 교내 안전맵',
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
      know4: '소화기는 불이 막 시작된 때에만 효과가 있어요. 무리하지 마세요.',
      nearTitle: '내 위치를 사용할까요?',
      nearDesc: '가까운 안전시설을 찾는 데만 쓰고, 어디에도 저장하지 않아요. 허용을 누르면 브라우저에서 한 번 더 위치 권한을 물어볼 수 있어요.',
      cancel: '취소',
      allow: '허용',
      ok: '확인',
      locating: '내 위치를 찾는 중이에요…',
      locNoSupport: '이 브라우저에서는 위치 기능을 쓸 수 없어요.',
      locDenied: '위치 권한이 꺼져 있어요. 브라우저 설정에서 이 사이트의 위치 권한을 허용한 뒤 다시 눌러 주세요.',
      locFail: '위치를 찾지 못했어요. 잠시 후 다시 눌러 주세요.',
      nearDoneOn: '내 위치에서 가까운 순으로 정렬했어요. 지도의 파란 점이 내 위치예요. 실내에서는 수십 m 오차가 날 수 있어요.',
      nearDoneOff: '내 위치에서 가까운 순으로 정렬했어요. 지금은 캠퍼스 밖이라 지도에는 내 위치를 표시하지 않았어요.',
      nearReset: '원래 순서로',
      noFacility: '표시할 시설이 없어요.',
      aedInfo: 'AED 정보',
      escapeTitle: '완강기 사용법',
      escapeP1: '캠퍼스 완강기 위치는 준비 중이에요. 먼저 사용법을 익혀 두세요.',
      escapeP2: '완강기는 불이나 연기 때문에 계단으로 대피할 수 없을 때만 사용하세요.',
      fireAria: '소화기 안내 페이지로 이동',
      aedTitleSuffix: 'AED(자동심장충격기) 정보 | 지켜보카',
      aedLocH: 'AED(자동심장충격기) 위치',
      aedStepsH: 'AED 사용 순서',
      aedImgNote: '',
      reportQ: '잘못된 정보나 바뀐 시설 위치를 발견하셨나요?',
      reportBtn: '오류·변경사항 제보하기 →',
      footerTitle: '운영 및 정보 안내',
      footer1: '본 지도는 교내 소방시설의 위치 정보를 제공하기 위해 제작되었어요.',
      footer2: '표시된 위치 및 정보는 실제 현장 상황과 차이가 있을 수 있어요.',
      footer3: '소방시설 주변에는 물건을 적치하지 말고, 비상시 누구나 사용할 수 있도록 공간을 확보해 주세요.',
      footer4: '화재 및 긴급 상황 발생 시 즉시 119에 신고해주세요.',
      footerEnd: '우리의 안전은 작은 관심에서 시작됩니다.',
      photoCap: '사진을 누르면 새 창에서 크게 볼 수 있어요',
      notFoundH: '건물 정보를 찾을 수 없어요',
      notFoundP: '지도로 돌아가 핀을 다시 눌러 주세요.',
      aed1: '119에 신고하고, 주변 사람에게 AED(자동심장충격기)를 가져와 달라고 부탁하세요.',
      aed2: 'AED(자동심장충격기) 전원을 켜고 음성 안내를 따르세요.',
      aed3: '환자의 가슴을 드러내고 패드 그림대로 오른쪽 쇄골 아래와 왼쪽 옆구리에 패드를 붙이세요.',
      aed4: '심장 리듬을 분석하는 동안 아무도 환자에게 닿지 않게 하세요.',
      aed5: '쇼크가 필요하다는 안내가 나오면 모두 물러나게 한 뒤 쇼크 버튼을 누르세요.',
      aed6: '바로 가슴압박을 다시 시작하고, 구급대가 올 때까지 AED(자동심장충격기) 안내를 따르세요.'
    },

    en: {
      siteTitle: 'Jikyeoboca | CUK Songsim Campus Safety Map',
      brandTitle: 'Jikyeoboca',
      back: '← Back to the campus fire safety map',
      call119: 'Call 119',
      brandSlogan: 'Our school, let\'s watch over it together!',
      brandDesc: 'The Catholic University of Korea, Songsim Campus Safety Map',
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
      cardNote: '',
      stepsH: 'How to use a fire extinguisher',
      step1: '<b>Pull the safety pin.</b> Twist and pull out the pin at the top of the handle.',
      step2: '<b>Aim the hose at the fire.</b> Aim at the base of the flames, not the top.',
      step3: '<b>Squeeze the handle firmly.</b>',
      step4: '<b>Sweep like a broom.</b> Move side to side to cover the fire.',
      knowH: 'Please remember',
      know1: 'Before use, check that the <b>pressure gauge needle is in the green zone</b>.',
      know2: 'Stand where <b>you are not turning your back on the exit</b>. If the fire grows, you must be able to leave right away.',
      know3: 'If the fire has reached the ceiling or there is a lot of smoke, <b>don\'t try to fight it. Evacuate immediately</b> and call 119.',
      know4: 'Extinguishers only work on a fire that has just started. Don\'t take risks.',
      nearTitle: 'Use your location?',
      nearDesc: 'Your location is only used to find the nearest safety equipment and is not stored anywhere. Your browser may ask for location permission once more after you tap Allow.',
      cancel: 'Cancel',
      allow: 'Allow',
      ok: 'OK',
      locating: 'Finding your location…',
      locNoSupport: 'This browser does not support location features.',
      locDenied: 'Location permission is off. Please allow location for this site in your browser settings and try again.',
      locFail: 'Could not find your location. Please try again in a moment.',
      nearDoneOn: 'Sorted by distance from you. The blue dot on the map is your location. Indoors, it may be off by tens of meters.',
      nearDoneOff: 'Sorted by distance from you. You seem to be outside the campus, so your location is not shown on the map.',
      nearReset: 'Back to original order',
      noFacility: 'No equipment to show.',
      aedInfo: 'AED info',
      escapeTitle: 'Escape descender guide',
      escapeP1: 'Locations of escape descenders on campus are coming soon. Please learn how to use one first.',
      escapeP2: 'Use an escape descender only when fire or smoke keeps you from leaving by the stairs.',
      fireAria: 'Go to the fire extinguisher guide',
      aedTitleSuffix: 'AED (Defibrillator) Info | Jikyeoboca',
      aedLocH: 'AED (Defibrillator) location',
      aedStepsH: 'How to use an AED',
      aedImgNote: '',
      reportQ: 'Found wrong information or a facility that has moved?',
      reportBtn: 'Report an error or change →',
      footerTitle: 'About this map',
      footer1: 'This map was made to show where fire safety equipment is located on campus.',
      footer2: 'Locations and details shown may differ from the actual site.',
      footer3: 'Please keep the area around safety equipment clear so anyone can use it in an emergency.',
      footer4: 'In case of fire or any emergency, call 119 immediately.',
      footerEnd: 'Our safety begins with a little attention.',
      photoCap: 'Tap the photo to view it larger in a new window',
      notFoundH: 'Building information not found',
      notFoundP: 'Go back to the map and tap the pin again.',
      aed1: 'Call 119 and ask someone nearby to bring the AED (automated external defibrillator).',
      aed2: 'Turn on the AED and follow the voice instructions.',
      aed3: 'Expose the person\'s chest and place the pads as shown in the picture: below the right collarbone and on the left side of the ribs.',
      aed4: 'While the AED analyzes the heart rhythm, make sure no one touches the person.',
      aed5: 'If the AED says a shock is needed, make sure everyone stands clear, then press the shock button.',
      aed6: 'Start chest compressions again right away, and keep following the AED instructions until emergency responders arrive.'
    },

    zh: {
      siteTitle: 'Jikyeoboca | 韩国天主教大学圣心校区校内安全地图',
      brandTitle: 'Jikyeoboca',
      back: '← 返回校园消防设施地图',
      call119: '拨打119',
      brandSlogan: '我们的学校，我们来守护！',
      brandDesc: '韩国天主教大学圣心校区校内安全地图',
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
      cardNote: '',
      stepsH: '灭火器使用步骤',
      step1: '<b>拔掉安全销。</b>转动并拔出手柄上方的销子。',
      step2: '<b>将喷管对准火源。</b>瞄准火焰根部，而不是火焰上方。',
      step3: '<b>用力握紧手柄。</b>',
      step4: '<b>像扫地一样喷射。</b>左右扫动，覆盖火焰。',
      knowH: '请务必记住',
      know1: '使用前请确认<b>压力表指针在绿色区域</b>。',
      know2: '请站在<b>不背对出口的位置</b>灭火。火势变大时要能立刻撤离。',
      know3: '如果火已蔓延到天花板或烟很大，<b>不要试图灭火，请立即撤离</b>并拨打119。',
      know4: '灭火器只对刚刚起火的火情有效。请不要勉强。',
      nearTitle: '是否使用您的位置？',
      nearDesc: '位置信息仅用于查找附近的安全设施，不会保存到任何地方。点击“允许”后，浏览器可能会再次询问位置权限。',
      cancel: '取消',
      allow: '允许',
      ok: '确认',
      locating: '正在查找您的位置…',
      locNoSupport: '此浏览器不支持定位功能。',
      locDenied: '位置权限已关闭。请在浏览器设置中允许本网站使用位置，然后再试一次。',
      locFail: '无法获取您的位置，请稍后再试。',
      nearDoneOn: '已按离您最近的顺序排序。地图上的蓝点是您的位置。在室内可能有几十米的误差。',
      nearDoneOff: '已按离您最近的顺序排序。您目前在校园之外，所以地图上不显示您的位置。',
      nearReset: '恢复原顺序',
      noFacility: '没有可显示的设施。',
      aedInfo: 'AED信息',
      escapeTitle: '缓降器使用方法',
      escapeP1: '校园内缓降器的位置正在准备中。请先熟悉使用方法。',
      escapeP2: '只有在火或烟导致无法走楼梯撤离时，才使用缓降器。',
      fireAria: '前往灭火器指南页面',
      aedTitleSuffix: 'AED（自动体外除颤器）信息 | Jikyeoboca',
      aedLocH: 'AED（自动体外除颤器）位置',
      aedStepsH: 'AED使用步骤',
      aedImgNote: '',
      reportQ: '发现错误信息或设施位置有变化吗？',
      reportBtn: '报告错误或变更 →',
      footerTitle: '运营及信息说明',
      footer1: '本地图旨在提供校内消防设施的位置信息。',
      footer2: '所显示的位置和信息可能与现场实际情况有所不同。',
      footer3: '请勿在消防设施周围堆放物品，确保紧急情况下任何人都能使用。',
      footer4: '发生火灾或紧急情况时，请立即拨打119。',
      footerEnd: '我们的安全始于一点点关心。',
      photoCap: '点击照片可在新窗口中查看大图',
      notFoundH: '找不到建筑信息',
      notFoundP: '请返回地图，重新点击图钉。',
      aed1: '拨打119，并请周围的人把AED（自动体外除颤器）拿来。',
      aed2: '打开AED电源，按照语音提示操作。',
      aed3: '露出患者胸部，按照电极片图示，将电极片分别贴在右锁骨下方和左侧肋部。',
      aed4: '在分析心律期间，不要让任何人接触患者。',
      aed5: '如果提示需要电击，请让所有人退开，然后按下电击按钮。',
      aed6: '立即重新开始胸外按压，并在救护人员到达前按照AED的提示操作。'
    }
  };

  const NAMES = { ko: '한국어', en: 'English', zh: '中文' };
  // 언어 버튼 앞에 들어가는 원형 국기 그림 (없으면 글자만 보여요)
  const FLAGS = { ko: 'images/flag-ko.png', en: 'images/flag-en.png', zh: 'images/flag-zh.png' };
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
      if (FLAGS[code]) {
        const img = document.createElement('img');
        img.className = 'flag';
        img.src = FLAGS[code];
        img.alt = '';
        b.appendChild(img);
      }
      b.appendChild(document.createTextNode(NAMES[code]));
      b.addEventListener('click', function () { window.setLang(code); });
      box.appendChild(b);
    });
    wrap.insertBefore(box, wrap.firstChild);
  }

  makeSwitch();
  apply();
})();
