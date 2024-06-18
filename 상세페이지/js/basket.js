export { mutCalc };

// + 버튼 누를때 마다 변경된 수량 * 제품 가격
function mutCalc(num){
    let sum = 0;
    let price = document.getElementById('intPrice');
    // let sumPrice = document.getElementById('sumPrice');
    let sumCost = document.getElementById('sumCost');
    sum = parseInt(price.innerText) * num;
    sumCost.innerText = sum;
    cost(sum);
}

// - 버튼 클릭 후 0 이 되면 화면 표현 함수
function updateUI(){
    
    let pTagCol = document.getElementById('pTagCol'); // 선택된 색상
    
    let pTagSiz = document.getElementById('pTagSiz'); // 선택된 사이즈
    
    pTagCol.innerHTML = '색상 : '; // 선택된 값 표시 태그 => 초기화
    pTagSiz.innerHTML = '사이즈 : '; // 선택된 값 표시 태그 => 초기화

    let selectList = document.getElementById('selectList');
    selectList.style.display = 'none';
    

    $("select[name='selColor']").val("").prop("selected", true); // select 값 초기화
    $("select[name='selSize']").val("").prop("selected", true); // select 값 초기화
    $('#selSize').prop('disabled', true);
}


// - 버튼 클릭 이벤트
let minus = document.getElementById('minus');
minus.addEventListener('click', () =>{
    let sum = 0;
    let productQty = document.getElementById('productQty');
    let qtyInt = parseInt(productQty.innerText);
    let price = document.getElementById('intPrice');
    let sumCost = document.getElementById('sumCost');
    let productNameCode = document.getElementById('productNameCode');
    let intCode = parseInt(productNameCode.innerText);
    if( qtyInt < 2 && intCode == 1){ // productQty 가 0이 되면 
        productQty.innerText = 0; // productQty 에 0을 넣어주고
        let totalProducts = document.getElementById('totalProducts');
        totalProducts.style.display = 'none';
        updateUI();
    }else if( intCode != 1){
        let totalProducts = document.getElementById('totalProducts');
        totalProducts.style.display = 'flex';
    }
    productQty.innerText = parseInt(productQty.innerText) < 1 ? 0 : parseInt(productQty.innerText) - 1;
    // 변경된 수량값이 1 보다 작아지면 1을 / 크면 변경된 수량에서 -1 한 값을 반영

    sum = parseInt(sumCost.innerText) - parseInt(price.innerText);
    sumCost.innerText = sum < parseInt(price.innerText) ? parseInt(price.innerText) : sum;
    cost(sum);
    
})

// + 버튼 클릭 이벤트
let plus = document.getElementById('plus');
plus.addEventListener('click', (e) =>{

    let num = 0;
    let productQty = document.getElementById('productQty');
    let selBox = document.getElementById('selColor');
    // productQty.innerText = 
    if( (parseInt(productQty.innerText ) + 1) > 10 ){
        alert('대량 구매는 고객센터에 문의해주세요.');
        productQty.innerText = 10;
    
    let productNameCode = document.getElementById('productNameCode');
    }else if( selBox.value === '' && productNameCode == '1' ){ // select 값이 없으면 
        // e.preventDefault();// + 버튼 기능 정지
        productQty.innerText = 0;
        let totalProducts = document.getElementById('totalProducts');
        totalProducts.style.display = 'none';
        
    }else{
        productQty.innerText = parseInt(productQty.innerText ) + 1;

    }
    num = parseInt(productQty.innerText);
    mutCalc(num);
})

// 숫자 3자리 콤마 찍기
const cost = (sum)=>{
    
    let price = document.getElementById('intPrice'); // 제품값
    let productQty = document.getElementById('productQty');

    // sum = sum < parseInt(price.innerText) ? parseInt(price.innerText) : sum;
    sum = parseInt(price.innerText) * parseInt(productQty.innerText);
    
    let result = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // 금액 세자리 숫자마다 콤마찍어서 변경해주는 공식
    sumPrice(result);
}

// 마지막 최종 값 html에 반영
const sumPrice = (result) =>{
    let sumPrice = document.getElementById('sumPrice');
    sumPrice.innerText = `${result}원`
}

// 장바구니 클릭 이벤트
// const cartBtn = document.getElementById('cartBtn');
// cartBtn.addEventListener('click', ()=>{
    // let productQty = document.getElementById('productQty');
    //     // 수량이 0이 아닐때 이동
    //     if( productQty.innerText != '0'){
    //         let productNameCode = document.getElementById('productNameCode');
    //         let codeNum = productNameCode.innerText;
    //         if(codeNum == '1'){
    //             // 상품정보(상품명, 판매가, 수량, 구매가)
    //             // productName productImg(이미지) productPrice intPrice(숫자)  sumCost
    //             let productName = document.getElementById('productName');

    //         }else{

    //         }


    //         window.location.href = '../마이페이지/장바구니.html'
    //     }
    
$(document).ready(function (){
    $('#cartBtn').on('click', function(sessionStorage){

        let productName = document.getElementById('productName');
        productName = productName.innerText;
        let imgId = document.getElementById('imgId');
        let img = imgId.src;
        let strPrice = document.getElementById('strPrice');
        let pPrice = strPrice.innerText;
    
        let selSiz = document.getElementById('selSize');
    
        let selColr = document.getElementById('selColor');
        
        // 사이즈 값 selIndex.value
        let selIndex = selSiz.options[selSiz.selectedIndex];
        
        // 선택된 색상 값 selColrIndx.value
        let selColrIndx = selColr.options[selColr.selectedIndex];
        
        // 구매수량 qty.innerText
        let qty = document.getElementById('productQty');
        
        // 최종 구매 금액 sumCost.innerText
        let sumCost = document.getElementById('sumCost');
        let sumPrice = document.getElementById('sumPrice');
        
        const basketData = [
            { 
                pName : productName,
                img : img,
                pPrice : pPrice,
                color : selColrIndx.value,
                size : selIndex.value,
                qty : qty.innerText,
                cost : sumCost.innerText,
                sumPrice : sumPrice.innerText
            }
        ];
        // console.log("inputD", basketData);
        
        // console.log('selIndex', sumCost.innerText);
    
        window.sessionStorage.setItem('data', JSON.stringify(basketData));
        // sessionData();
    
        window.location.href = '../마이페이지/장바구니.html';
    })
});
    // $(document).ready(function(){ 

        // $('#cartBtn').on('click', function(sessionStorage){
        //     let productName = document.getElementById('productName');
            
        //     let img = productData[0].src;
        //     let name = productData[1].outerText;
        //     let price = productData[3].innerText;

        //     // 객체 형태로 저장
        //     const inputData = [
        //         {
        //         img : img,
        //         name : name,
        //         price : price
        //     }
        // ];

        // // sessionStorage 사용 => 데이터 전달
        // window.sessionStorage.setItem('data', JSON.stringify(inputData));
        // // 페이지연결
        // window.location.href = '../상세페이지/index.html'
        // });
// });// btn 클릭 이벤트

