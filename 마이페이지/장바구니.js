window.addEventListener('DOMContentLoaded', (sessionStorage)=>{
    let getData = JSON.parse(window.sessionStorage.getItem('data'));
    let setData = getData[0];
    console.log('getD',setData.pPrice);
    let imgData = document.getElementById('imgData');
    let price = document.getElementById('price');
    let qty = document.getElementById('qty');
    let sumPrice = document.getElementById('sumPrice');
    imgData.innerHTML = `<img id="imgId" src=${setData.img} alt="img" style="width: 100px; height=100px;"><br><p id='pTag'>${setData.pName}</p>`;
    price.innerText = `${setData.pPrice}원`; 
    qty.innerText = `${setData.qty}`;
    sumPrice.innerText = `${setData.sumPrice}`
})

// function getData (sessionStorage){
//     let getData = JSON.parse(window.sessionStorage.getItem('basketData'));
//     let basketData = getData[0];
//     console.log('getD',basketData.name);
// }