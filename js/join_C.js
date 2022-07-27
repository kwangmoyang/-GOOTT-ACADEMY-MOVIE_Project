//로그인 페이지 사용할 정규 표현식들
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //최소 8 자, 최소 하나의 문자 및 하나의 숫자
const emailPattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //이메일 
const whiteSpacePattern = /\s/g; //공백


let checkCurrent = document.getElementById('checkCurrent'); //5개 이벤트 처리 상태 확인 버튼(콘솔에 출력)

let email = document.getElementById('email'); //이메일
let emailSpan = document.getElementById('emailSpan'); //이메일 상태 표현할 스팬

let nickname = document.getElementById('nickname'); //이름(닉네임)
let nicknameSpan = document.getElementById('nicknameSpan');

let password1 = document.getElementById('password1'); //비밀번호
let password1Span = document.getElementById('password1Span');

let password2 = document.getElementById('password2'); //비밀번호 확인
let password2Span = document.getElementById('password2Span');

let submit = document.getElementById('submit');
let emailDupSpan = document.getElementById('emailDupSpan');

let isEmailDupCheck = false; //이메일 중복 처리 됬는가
let isEmailCheck = false; //제대로된 이메일 형식인가
let isNickCheck = false; //이름을 입력하였는가
let isPw1Check = false; //비밀번호가 8자 이상, 영문과 숫자가 조합되었는가
let isPw2Check = false; //비밀번호2 가 비밀번호 1과 일치하는가

// checkCurrent.addEventListener('click', function () {//상태 체크
//     console.clear();
//     console.log(`isEmailDupCheck : ${isEmailDupCheck}`);
//     console.log(`isEmailCheck : ${isEmailCheck}`);
//     console.log(`isNickCheck : ${isNickCheck}`);
//     console.log(`isPw1Check : ${isPw1Check}`);
//     console.log(`isPw2Check : ${isPw2Check}`);

// })

email.addEventListener('keyup', function () {
    if (this.value.length == 0) {
        emailSpan.innerHTML = '';
        isEmailCheck = false;
    }
    else if (whiteSpacePattern.test(this.value) == true) {
        emailSpan.innerHTML = '공백이 포함될수 없습니다.';
        isEmailCheck = false;
    }
    else if (emailPattern.test(this.value) == true) {
        emailSpan.innerHTML = '';
        isEmailCheck = true;
    }
    else if (emailPattern.test(this.value) == false) {
        emailSpan.innerHTML = '올바른 이메일 양식이 아닙니다.';
        isEmailCheck = false;
    }
    else {
        emailSpan.innerHTML = '심각한 에러 발생.';
        isEmailCheck = false;
    }
    emailDupSpan.innerHTML = '';
    (isEmailCheck == true && isEmailDupCheck == true) ? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';

});

nickname.addEventListener('keyup', function () {
    if (whiteSpacePattern.test(this.value) == true) { //07-22 21:45 수정 최원석
        nicknameSpan.innerHTML = '공백이 포함될수 없습니다.';
        isNickCheck = false;
    }
    else if (this.value.length != 0) {
        nicknameSpan.innerHTML = '';
        isNickCheck = true;
    }
    else if (this.value.length == 0) {
        nicknameSpan.innerHTML = '';
        isNickCheck = false;
    }
    else {
        nicknameSpan.innerHTML = '심각한 에러 발생.';
        isNickCheck = false;
    }
    isNickCheck ? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';
});

password1.addEventListener('keyup', function () {
    if (this.value.length == 0) {
        password1Span.innerHTML = '최소 8자, 최소 하나의 문자 및 하나의 숫자가 필요합니다.';
        password2Span.innerHTML = '';
        isPw1Check = false;
    }
    else if (whiteSpacePattern.test(this.value) == true) {
        password1Span.innerHTML = '공백이 포함될수 없습니다.';
        isPw1Check = false;
    }
    else if (passwordPattern.test(this.value) == true) {
        password1Span.innerHTML = '';
        isPw1Check = true;
    }
    else if (passwordPattern.test(this.value) == false) {
        password1Span.innerHTML = '올바른 비밀번호 양식이 아닙니다.';
        isPw1Check = false;
    }
    else {
        password1Span.innerHTML = '심각한 에러 발생.';
        isPw1Check = false;
    }
    isPw1Check ? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';
});

password2.addEventListener('keyup', function () {
    let pw1Text = password1.value;
    if (isPw1Check && (pw1Text == this.value)) {
        password2Span.innerHTML = '';
        isPw2Check = true;
    }
    else if (isPw1Check == false) {
        password2Span.innerHTML = '';
        isPw2Check = false;
    }
    else if (pw1Text.length == 0) {
        password2Span.innerHTML = '';
        isPw2Check = false;
    }
    else if (isPw1Check && (pw1Text != this.value)) {
        password2Span.innerHTML = '비밀번호가 일치하지 않습니다.';
        isPw2Check = false;
    }
    else {
        password2Span.innerHTML = '심각한 오류 발생.';
        isPw2Check = false;
    }
    isPw2Check ? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';
})

function checkForm() {
    if (isEmailCheck == false) {
        alert('이메일을 입력해 주세요.');
        return false;
    }
    else if (isEmailDupCheck == false) {
        alert('이메일 중복 체크를 해주세요.');
        return false;
    }
    else if (isNickCheck == false) {
        alert('닉네임을 입력해 주세요.');
        return false;
    }
    else if (isPw1Check == false) {
        alert('비밀번호를 입력해 주세요.');
        return false;
    }
    else if (isPw2Check == false) {
        alert('비밀번호 확인을 해주세요.');
        return false;
    }
    else if (isEmailCheck == true && isEmailDupCheck == true && isNickCheck == true && isPw1Check == true && isPw2Check == true) {
        alert('회원가입을 축하드립니다.');
        return true;
    }
    else {
        alert('심각한 에러 발생.');
        return false;
    }
}


email.addEventListener('blur' , checkDupEmail); //포커스 잃으면 중복 이메일 체크

function getEmailJson(){
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', './json/member.json')
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                let emailJson = JSON.parse(xhr.response);
                resolve(emailJson); //member.json 가져와 emailJson에 배열로 저장
            }
        }
    });
};

async function checkDupEmail(){
    if(email.value.length == 0){
        emailDupSpan.innerHTML = '이메일을 입력해 주세요.';
        isEmailDupCheck = false;
        return;
    }

    if(isEmailCheck == false){
        isEmailDupCheck = false;
        return false;
    }
        
    let returnEmailJson = await getEmailJson();
    for (let i = 0; i < returnEmailJson.length; i++) {
        if (returnEmailJson[i].email == email.value) {
            emailDupSpan.innerHTML = '중복된 아이디 입니다.';
            isEmailDupCheck = false;
            return;
        }
    }
    emailDupSpan.innerHTML = '사용가능한 아이디 입니다.';
    email.nextElementSibling.style.opacity = '1'
    email.disabled = true;
    // alert('사용가능한 아이디 입니다.') //여기까지 왔다는 것은 중복된 아이디가 없다는 뜻
    isEmailDupCheck = true;
   
}

// emailBtn.addEventListener('click', function () {
//     console.clear();
//     if (isEmailCheck == false) {
//         alert('이메일을 입력하셔야 합니다.');
//         console.log('이메일을 입력하셔야 합니다.');
//         return;
//     }
//     let xhr = new XMLHttpRequest();
//     xhr.open('get', './json/member.json')
//     xhr.send();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             let jsonObj = JSON.parse(xhr.response);
//             for (let i = 0; i < jsonObj.length; i++) {
//                 if (jsonObj[i].email == email.value) {
//                     alert('중복된 아이디 입니다.');
//                     isEmailDupCheck = false;
//                     return;
//                 }
//             }
//             alert('사용가능한 아이디 입니다.') //여기까지 왔다는 것은 중복된 아이디가 없다는 뜻
//             isEmailDupCheck = true;
//             emailBtn.innerHTML = 'Email 사용 가능';
//             emailBtn.style.pointerEvents = 'none';
//             email.style.color = 'orangered';
//             email.disabled = true;
//         }
//     }
// });