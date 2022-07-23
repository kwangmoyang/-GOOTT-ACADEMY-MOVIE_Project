const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //최소 8 자, 최소 하나의 문자 및 하나의 숫자
        const emailPattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //이메일 
        const whiteSpacePattern = /\s/g; //공백
        
        let emailBtn = document.getElementById('emailBtn');
        let checkCurrent = document.getElementById('checkCurrent');

        let email = document.getElementById('email');
        let emailSpan = document.getElementById('emailSpan');
        
        let nickname = document.getElementById('nickname');
        let nicknameSpan = document.getElementById('nicknameSpan');
        
        let password1 = document.getElementById('password1');
        let password1Span = document.getElementById('password1Span');
        
        let password2 = document.getElementById('password2');
        let password2Span = document.getElementById('password2Span');

        let submit = document.getElementById('submit');

        let isEmailDupCheck = false;
        let isEmailCheck = false;
        let isNickCheck = false;
        let isPw1Check = false;
        let isPw2Check = false;

        checkCurrent.addEventListener('click' , function(){
            console.clear();
            console.log(`isEmailDupCheck : ${isEmailDupCheck}`);
            console.log(`isEmailCheck : ${isEmailCheck}`);
            console.log(`isNickCheck : ${isNickCheck}`);
            console.log(`isPw1Check : ${isPw1Check}`);
            console.log(`isPw2Check : ${isPw2Check}`);
            
        })
        
        email.addEventListener('keyup' , function(){
            if(this.value.length == 0){
                emailSpan.innerHTML = '';
                isEmailCheck = false;
            }
            else if(whiteSpacePattern.test(this.value) == true){
                emailSpan.innerHTML = '공백이 포함될수 없습니다.';
                isEmailCheck = false;
            }
            else if(emailPattern.test(this.value) == true){
                emailSpan.innerHTML = '';
                isEmailCheck = true;
            }
            else if(emailPattern.test(this.value) == false){
                emailSpan.innerHTML = '올바른 이메일 양식이 아닙니다.';
                isEmailCheck = false;
            }
            else{
                emailSpan.innerHTML = '심각한 에러 발생.';
                isEmailCheck = false;
            }
            isEmailCheck? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';
            
        });

        nickname.addEventListener('keyup' , function(){
            if(whiteSpacePattern.test(this.value) == true){ //07-22 21:45 수정 최원석
                nicknameSpan.innerHTML = '공백이 포함될수 없습니다.';
                isNickCheck = false;
            }
            else if(this.value.length != 0){
                nicknameSpan.innerHTML = '';
                isNickCheck = true;
            }
            else if(this.value.length == 0){
                nicknameSpan.innerHTML = '';
                isNickCheck = false;
            }
            else{
                nicknameSpan.innerHTML = '심각한 에러 발생.';
                isNickCheck = false;
            }
            isNickCheck? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';
        });

        password1.addEventListener('keyup' , function(){
            if(this.value.length == 0){
                password1Span.innerHTML = '최소 8 자, 최소 하나의 문자 및 하나의 숫자';
                password2Span.innerHTML = '';
                isPw1Check = false;
            }
            else if(whiteSpacePattern.test(this.value) == true){
                password1Span.innerHTML = '공백이 포함될수 없습니다.';
                isPw1Check = false;
            }
            else if(passwordPattern.test(this.value) == true){
                password1Span.innerHTML = '';
                isPw1Check = true;
            }
            else if(passwordPattern.test(this.value) == false){
                password1Span.innerHTML = '올바른 비밀번호 양식이 아닙니다.';
                isPw1Check = false;
            }
            else{
                password1Span.innerHTML = '심각한 에러 발생.';
                isPw1Check = false;
            }
            isPw1Check? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';
        });

        password2.addEventListener('keyup' , function(){
            let pw1Text = password1.value;
            if(isPw1Check && (pw1Text == this.value)){
                password2Span.innerHTML = '';
                isPw2Check = true;
            }
            else if(isPw1Check == false){
                password2Span.innerHTML = '';
                isPw2Check = false;
            }
            else if(pw1Text.length == 0){
                password2Span.innerHTML = '';
                isPw2Check = false;
            }
            else if(isPw1Check && (pw1Text != this.value)){
                password2Span.innerHTML = '비밀번호가 일치하지 않습니다.';
                isPw2Check = false;
            }
            else{
                password2Span.innerHTML = '심각한 오류 발생.';
                isPw2Check = false;
            }
            isPw2Check? this.nextElementSibling.style.opacity = '1' : this.nextElementSibling.style.opacity = '0';
        })

        function checkForm(){
            if(isEmailCheck == false){
                alert('이메일을 입력해 주세요.');
                return false;
            }
            else if(isEmailDupCheck == false){
                alert('이메일 중복 체크를 해주세요.');
                return false;
            }
            else if(isNickCheck == false){
                alert('닉네임을 입력해 주세요.');
                return false;
            }
            else if(isPw1Check == false){
                alert('비밀번호를 입력해 주세요.');
                return false;
            }
            else if(isPw2Check == false){
                alert('비밀번호 확인을 해주세요.');
                return false;
            }
            else if(isEmailCheck == true && isEmailDupCheck == true && isNickCheck == true && isPw1Check == true && isPw2Check == true){
                alert('회원가입을 축하드립니다.');
                return true;
            }
            else{
                alert('심각한 에러 발생.');
                return false;
            }
        }

        emailBtn.addEventListener('click' , function(){
            console.clear();
            if(isEmailCheck == false){
                alert('이메일을 입력하셔야 합니다.');
                console.log('이메일을 입력하셔야 합니다.');
                return;
            }
            console.log('이메일체크 시작');
            let xhr = new XMLHttpRequest();
            xhr.open('get','./json/member.json')
            xhr.send();

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    console.log('member.json 연결 성공');
                    
                    let jsonObj = JSON.parse(xhr.response);
                    console.log('받아온 member제이슨 객체로 변환');
                    console.log(jsonObj);
                    console.log(`현재 email : ${email.value}`);
                    for(let i = 0; i < jsonObj.length; i++){
                        if(jsonObj[i].email == email.value){
                            alert('중복된 아이디 입니다.');
                            isEmailDupCheck = false;
                            return;
                        }
                    }
                    alert('사용가능한 아이디 입니다.')
                    console.log('아이디 중복되지 않습니다.') //07-22 21:46 수정 최원석
                    isEmailDupCheck = true;
                    emailBtn.innerHTML = 'Email 사용 가능';
                    emailBtn.style.pointerEvents = 'none';
                    email.disabled = true;
                }
                else{
                    // console.log('member.json 연결 실패');
                }
            }
        });