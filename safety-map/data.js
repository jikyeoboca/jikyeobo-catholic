// 소방시설 정보
// type: "aed"(AED) / "escape"(완강기)
// name: 한국어 이름 / en: 영어 이름(영어·중국어 화면에서 사용, 끝의 (알파벳) 약어는 꼭 유지)
// detail: 한국어 / detailEn: 영어 / detailZh: 중국어
// x, y: 지도 그림에서 핀 끝이 가리키는 위치(가로·세로 %)
// photos: images/aed 폴더의 사진 파일 이름. '건물알파벳_층수.jpg' 형식이면 층수가 사진 아래에 자동으로 표시돼요.
// lat, lng: 실제 위도·경도. 구글 지도에서 건물을 우클릭하면 맨 위에 나오는 숫자예요.
//           비어 있으면(null) 가까운 순 정렬에서 맨 뒤로 가요.
const AED_DATA = {
  3:  { type: "aed", name: "김수환관(K)", en: "Kim Sou-hwan Hall(K)", floors: ["1층"], x: 26.1, y: 72.7, lat: 37.48589, lng: 126.80359, photos: ["K_1.jpg"],
        detail: "1층 주출입구 방풍문 앞",
        detailEn: "1F, in front of the main entrance vestibule doors",
        detailZh: "1层 主入口防风门前" },
  4:  { type: "aed", name: "스테파노기숙사(K)", en: "Dormitory Stephen(K)", floors: ["4층", "10층"], x: 17.4, y: 68.6, lat: 37.48518, lng: 126.80331, photos: ["K_4.jpg", "K_10.jpg"],
        detail: "4층 안내실 앞, 10층 엘리베이터 앞",
        detailEn: "4F in front of the information desk, 10F in front of the elevator",
        detailZh: "4层 服务台前，10层 电梯前" },
  5:  { type: "aed", name: "안드레아(A)", en: "Andreas Dormitory(A)", floors: ["1층", "6층"], x: 28.2, y: 65.6, lat: 37.48570, lng: 126.80302, photos: ["A_1.jpg", "A_6.jpg"],
        detail: "1층 주출입구 로비, 10층 엘리베이터 앞",
        detailEn: "1F main entrance lobby, 6F in front of the elevator",
        detailZh: "1层 主入口大厅，6层 电梯前" },
  6:  { type: "aed", name: "마리아관(M)", en: "Maria Hall(M)", floors: ["1층"], x: 37.5, y: 71.6, lat: 37.48629, lng: 126.80260, photos: ["M_1.jpg"],
        detail: "1층 출입구 방풍문 안",
        detailEn: "1F, inside the entrance vestibule",
        detailZh: "1层 入口防风门内" },
  7:  { type: "aed", name: "니콜스관(N)", en: "Nicholls Hall(N)", floors: ["4층"], x: 33.8, y: 58.6, lat: 37.48580, lng: 126.80247, photos: ["N_4.jpg"],
        detail: "4층 카페 하랑 옆",
        detailEn: "4F, next to Cafe Harang",
        detailZh: "4层 Cafe Harang旁" },
  9:  { type: "aed", name: "다솔관(D)", en: "Dasol Hall(Science Hall)(D)", floors: ["2층"], x: 33.8, y: 43.1, lat: 37.48586, lng: 126.80141, photos: ["D_2.jpg"],
        detail: "2층 안내실 옆 로비",
        detailEn: "2F, lobby next to the information desk",
        detailZh: "2层 服务台旁的大厅" },
  10: { type: "aed", name: "비르투스관(V)", en: "Virtus Hall(V)", floors: ["1층"], x: 30.6, y: 52.8, lat: 37.48565, lng: 126.80212, photos: ["V_1.jpg"],
        detail: "1층 보건실 앞",
        detailEn: "1F, in front of the health center",
        detailZh: "1层 保健室前" },
  11: { type: "aed", name: "학생미래인재관(B)", en: "Sophie Barat Hall(B)", floors: ["1층"], x: 44.0, y: 46.5, lat: 37.48652, lng: 126.80136, photos: ["B_1.jpg"],
        detail: "1층 CUK 드림라운지 앞",
        detailEn: "1F, in front of the CUK Dream Lounge",
        detailZh: "1层 CUK Dream Lounge前" },
  13: { type: "aed", name: "미카엘관-행정동(H)", en: "Michael Hall-Administration(H)", floors: ["1층"], x: 51.4, y: 34.2, lat: 37.48641, lng: 126.80025,
        detail: "1층 로비",
        detailEn: "1F, lobby",
        detailZh: "1层 大厅" },
  15: { type: "aed", name: "베리타스관(중앙도서관)(L)", en: "Veritas Hall(Central Library)(L)", floors: ["2층"], x: 60.7, y: 34.7, lat: 37.48681, lng: 126.80008, photos: ["L_2.jpg"],
        detail: "2층 출입구 안내데스크",
        detailEn: "2F, entrance information desk",
        detailZh: "2层 入口服务台" },
  16: { type: "aed", name: "성심관(SH)", en: "Songsim Hall(SH)", floors: ["2층"], x: 77.8, y: 23.2, lat: 37.48753, lng: 126.79867, photos: ["SH_2.jpg"],
        detail: "2층 출입구 좌측",
        detailEn: "2F, left of the entrance",
        detailZh: "2层 入口左侧" },
  17: { type: "aed", name: "정진석추기경약학관(NP)", en: "Nicholas Cardinal Cheong Pharmacy Hall(NP)", floors: ["1층"], x: 64.4, y: 21.8, lat: 37.48675, lng: 126.79902, photos: ["NP_1.jpg"],
        detail: "1층 안내실 옆",
        detailEn: "1F, next to the information desk",
        detailZh: "1层 服务台旁" },
  18: { type: "aed", name: "콘서트홀(CH)", en: "Concert Hall(CH)", floors: ["2층"], x: 81.2, y: 38.4, lat: 37.48809, lng: 126.79958, photos: ["CH_2.jpg"],
        detail: "2층 로비 출입구 옆",
        detailEn: "2F, next to the lobby entrance",
        detailZh: "2层 大厅入口旁" }
};

// 완강기 정보 (적는 방법은 위 AED_DATA와 같아요)
// 정확한 도면이 없어서 대략적인 위치예요. 완강기가 없는 건물은 넣지 않아요.
// 숫자(4, 5)는 위 AED_DATA의 같은 건물 번호와 맞췄어요. 상세 페이지 주소: escape.html?b=번호
const ESCAPE_DATA = {
  4: { type: "escape", name: "스테파노기숙사(K)", en: "Dormitory Stephen(K)", floors: ["7~15층"], x: 12.6, y: 67.0, lat: 37.48518, lng: 126.80331,
       detail: "고층부(7~15층) 중심, 복도 끝부분 및 외부 창문 주변",
       detailEn: "Mainly on the upper floors (7F–15F), at the ends of the hallways and near exterior windows",
       detailZh: "主要在高层（7–15层），走廊尽头及外窗附近" },
  5: { type: "escape", name: "안드레아기숙사(A)", en: "Andreas Dormitory(A)", floors: ["4~10층"], x: 34.8, y: 65.5, lat: 37.48570, lng: 126.80302,
       detail: "4~10층 복도 양쪽 끝의 외부 창문 주변 (사다리차가 들어오기 어려운 건물 측면 쪽, 사다리차가 닿는 전면부에는 없음)",
       detailEn: "4F–10F, near the exterior windows at both ends of the hallway (on the sides of the building that fire ladder trucks cannot reach, not on the front)",
       detailZh: "4–10层，走廊两端的外窗附近（位于云梯车难以到达的建筑侧面，云梯车可到达的正面没有）" }
};

// 불 아이콘이 나타날 수 있는 자리(가로·세로 %). 매일 이 중 한 곳이 골라져요.
const FIRE_SPOTS = [
  [37.1, 28.3], [55.0, 26.3], [71.4, 25.5], [77.4, 18.7],
  [54.2, 33.9], [34.3, 37.9], [75.0, 39.1], [68.2, 42.7],
  [54.2, 46.7], [79.3, 49.8], [34.3, 51.0], [12.0, 55.0],
  [23.9, 60.2], [52.6, 59.4], [43.5, 67.8], [21.9, 77.0]
];

// ---------- 선택한 언어에 맞는 이름·층·설명 꺼내기 ----------
function bLang() { return typeof getLang === 'function' ? getLang() : 'ko'; }
function bName(b) { return bLang() === 'ko' ? b.name : (b.en || b.name); }
function bFloors(b) {
  const l = bLang();
  return b.floors.map(function (f) {
    return l === 'en' ? f.replace('층', 'F') : l === 'zh' ? f.replace('층', '层') : f;
  });
}
function bDetail(b) {
  const l = bLang();
  if (l === 'en') return b.detailEn || b.detail;
  if (l === 'zh') return b.detailZh || b.detail;
  return b.detail;
}
