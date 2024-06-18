import { selectData } from "./detail.js"; 
// 페이지를 실행했을 때 이벤트 발생
// sessionStorage 에 담긴 값 가져오기 위한 
window.addEventListener('DOMContentLoaded', ()=>{
    let data = JSON.parse(window.sessionStorage.getItem('data'));
    // console.log('data',data);
    let imgContainer = document.getElementById('imgContainer');
    let productName = document.getElementById('productName');
    let strPrice = document.getElementById('strPrice');
    let intPrice = document.getElementById('intPrice');
    // let sumPrice = document.getElementById('sumPrice');
    // json 파일 불러오기
    
    
    
    // json데이터 -> 배열로 교체
    let getData = data[0];
    console.log('getData',getData);
    // 배열데이터 => 키값으로 변수에 할당
    let getImg = getData.img;
    let getName = getData.name;
    
    // "00,000원" string 값
    let getPrise = getData.price;
    // "00,000원" 원 자르기
    let splPrice = getPrise.split('원');
    
    // ["00,000", ""] => 나눠진 텍스트 붙이기  => strPrice 에 들어갈 값 "00,000" 
    let joinPrice1 = splPrice.join('');// 결과: 00,000 => #price에 들어갈 값
    // ["00,000", ""] <=  , 콤마 기준으로 나누기
    let splPrice2 = splPrice[0].split(','); // 결과 : ['00', '000']
    
    // intPrice 에서 int형식으로 쓸 "00000" 형태의 값 만들기
    // ['00', '000'] => "00000" 
    let joinPrice2 = splPrice2.join(''); // 결과 : "00000"
    
    // 가공된 데이터 html에 적용
    imgContainer.innerHTML = `<img id="imgId" src=${getImg} alt="img">`
    strPrice.innerText = `${joinPrice1}`;
    intPrice.innerText = `${joinPrice2}`;
    productName.innerText = `${getName}`;
    // sumPrice.innerText = `${joinPrice1}원`;

    // json 파일 불러오기
    function readJSON(file, callback){

        let rawFile = new XMLHttpRequest(); // 객체 생성

        rawFile.overrideMimeType('application/json'); // overrideMimeType 텍스트/xml 로 보고하지 않아도 그렇게 처리하고 구문 분석하도록 하는 데  사용 - send() 이전 호출해야함
        rawFile.open('GET', file, true);
        // ㄴ .open( '전달 방식', 서버URL , 동기여부 ) - true : 비동기 / false : 동기 

        rawFile.onreadystatechange = function(){ // onreadystatechange 이벤트 헨들러

            if(rawFile.readyState === 4 && rawFile.status == "200"){ 
            // 200 : 서버로부터 응답상태가 성공했다는 의미 - 403, 404, 500 등 있음
            // 4 : 데이터 전부 받은 상태 - 0~4 등
            
                
                callback(rawFile.responseText); // responseText 응답으로 받은 데이터를 문자열로 저장
            }
        }
        rawFile.send(null); // send() : GET 방식  / send(문자열) : POST 방식
    };

    // JSON 파일 변환
    readJSON("./js/prdtData.json", function(text){
        var prdtData = JSON.parse(text);
        // console.log(prdtData[0]);
        // 매칭함수
        matchData(prdtData);
    });

    // 제휴판매.html 에서 넘어온 정보와 JSON파일 데이터를 서로 비교하여 원하는 데이터 추출하는 함수
    function matchData(prdtData){
        let prdtName = document.getElementById('productName'); // 페이지이동때 html에 반영된 제품 이름 가져오기

        //매개변수로 전달된 prdtData => 필터 filter() 
        var filterData = prdtData.filter(function (prdtD) {

            // 페이지 전환때 전달받은 제품명과 일치하는 데이터 리턴
            return prdtD.name == prdtName.innerText
        });
        
        // console.log('prdtName',prdtName);
        // console.log('filterData',filterData[0].info);// index 0번째에 데이터가 들어있음
        // console.log('metchData prdtData', prdtData);
        let info = document.getElementById('info');
        let bottContainer = document.getElementById('bottContainer');
        let productNameCode = document.getElementById('productNameCode');
        //페이지에 반영된 제품과 일치하는 제품 상세설명 
        info.innerText = filterData[0].info;
        // 페이지에 반영된 제품과 일치하는 제품 상세 사진
        bottContainer.innerHTML = `<img src=${filterData[0].src} />`
        //만약 가지고 오는 데이터의 코드가 1이 아니라면 (용품-수량만 필요)
        let selectColorData = filterData[0].color;
        let selectColorCode = filterData[0].code;
        console.log('selectColorData',selectColorData);
        selectData(selectColorData, selectColorCode);
        if( filterData[0].code == 1 ){
            productNameCode.innerText = filterData[0].code;

        }
    };   
    sessionStorage.clear();
})







