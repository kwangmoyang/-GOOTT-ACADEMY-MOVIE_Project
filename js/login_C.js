let email = document.getElementById('email');
        let password = document.getElementById('password');
        let submit = document.getElementById('submit');
        let emailSpan = document.getElementById('emailSpan');
        let password1Span = document.getElementById('password1Span');

        email.addEventListener('keyup', function () {
            emailSpan.innerHTML = '';
        });
        password.addEventListener('keyup', function () {
            password1Span.innerHTML = '';
        });

        submit.addEventListener('click' , checkForm);

        function checkForm() {

            if (email.value.length == 0) {
                emailSpan.innerHTML = '이메일을 입력하세요.';
                return;
            }
            if (password.value.length == 0) {
                password1Span.innerHTML = '비밀번호를 입력하세요.';
                return;
            }

            let promise = new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('get', './json/member.json');
                xhr.send();
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log('member.json 접속 성공');
                        let memberJson = JSON.parse(xhr.response);
                        resolve(memberJson);

                    }
                }
            });


            promise.then((memberJson) => {
                console.log(memberJson);
                for (let i = 0; i < memberJson.length; i++) {
                    if (memberJson[i].email == email.value) {
                        if (memberJson[i].password == password.value) {
                            localStorage.setItem('loginId' , memberJson[i].nickname);
                            localStorage.setItem('authority' , memberJson[i].authority);
                            localStorage.setItem('payment' , memberJson[i].payment);
                            location.href = 'lay.html';
                            return;
                        }
                        else{
                            emailSpan.innerHTML = '';
                            password1Span.innerHTML = '비밀번호가 틀립니다.';
                            return;
                        }
                    }
                }
                emailSpan.innerHTML = '아이디가 없습니다.';
            }).catch(() => {
            });
            
        }