// index page 로딩시 검색할 지역 정보 얻기.
const serviceKey = "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
let areaUrl =
  `https://apis.data.go.kr/B551011/KorService1/areaCode1?serviceKey=${
  serviceKey}&numOfRows=20&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;

fetch(areaUrl)
  .then((response) => response.json())
  .then((data) => makeArea(data));



// fetch(areaUrl)
//   .then((response) => response.json())
//   .then((data) => makeArea(data));


function makeArea(data) {
  console.log(data);
  let areas = data.response.body.items.item;

  let sel = document.getElementById("search-area");
  // console.log(data);
  areas.forEach(function (area, i) {
    // console.log(area)
    let opt = document.createElement("option");
    opt.setAttribute("value", area.code);
    opt.appendChild(document.createTextNode(area.name));
    sel.appendChild(opt);
  });
}

// 지역, 관광지 유형, 검색어 입력 후 검색 버튼 클릭.
document.getElementById("btn-search").addEventListener("click", function () {
  let areaCode = document.getElementById("search-area").value;
  let contentTypeId = document.getElementById("search-content-id").value;
  let keyword = document.getElementById("search-keyword").value;
  let searchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keyword}&contentTypeId=${contentTypeId}&areaCode=${areaCode}`;

  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => makeTripList(data));
});

function makeTripList(data) {
  console.log(data);
  let trips = data.response.body.items.item;
  let tripContent = ``;
  trips.forEach(function (trip) {
    tripContent += `
      <tr>
        <td><img src="${trip.firstimage}" width="100px"></td>
        <td>${trip.title}</td>
        <td>${trip.addr1} ${trip.addr2}</td>
        <td>${trip.mapy}</td>
        <td>${trip.mapx}</td>
      </tr>
    `;
  });
  document.getElementById("trip-list").innerHTML = tripContent;
}