const joinBtn = document.querySelector("button");

joinBtn.addEventListener("click",()=> {
    joinForm();
        alert(`회원가입이 완료되었습니다 !`);
});

function joinForm(){
    document.joinForm.submit();
}