// document.getElementById('loginForm').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const response = await fetch('/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     });

//     const result = await response.json();

//     if (response.ok) {
//         // 로그인 성공 시 처리
//         alert('로그인 성공!');
//         window.location.href = '"http://127.0.0.1:5500/main.html"';
//     } else {
//         // 로그인 실패 시 처리
//         alert('로그인 실패: ' + result.message);
//     }
// });


function loginForm(){
    document.loginForm.submit();
}