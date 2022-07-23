let mainImgDiv_C = document.querySelector('.mainImgDiv_C'); //메인 이미지부분 이미지들 4개 감싼 디비전
let firstItemClone = mainImgDiv_C.firstElementChild.cloneNode(true); //메인 이미지 1번 이미지 복사
mainImgDiv_C.appendChild(firstItemClone);//복사된 이미지 5번에 추가

let genreSelect_C = document.getElementById('genreSelect_C'); //장르 셀렉트
let yearSelect_C = document.getElementById('yearSelect_C'); //년도 셀렉트
const btnSelect_C = document.getElementById('btnSelect_C'); //소팅 검색 버튼
let movieContainer_C = document.getElementById('movieContainer_C'); //소팅 결과 그릴 컨테이너
let pageBtnContainer_C = document.getElementById('pageBtnContainer_C'); // 페이지 번호 그릴 컨테이너

let genreSelectText; //장르 텍스트
let yearSelectText; //년도 텍스트
let sortedJsonArrayCount; //소팅된후 총 페이지수
let pageStartCount; //페이지 이동시 보여줄 첫번째 배열 번호
let pageEndCount; //페이지 이동시 보여줄 마지막 배열번호

let sortedJsonArray = []; //최종 소팅된 영화 데이터 들어가 있는 배열
let currentPageNum = 1; //현재 페이지 번호

let localStorageId;//로컬스토리지 이메일 저장할 변수
let localStorageAuthority;//로컬스토리지 직책 저장할 변수
let loginID = document.getElementById('loginID_C');//로그인 유저 이메일 표시할 스팬
let loginAuth_C = document.getElementById('loginAuth_C');//로그인 유저 권한 표시할 스팬
let loginPayment_C = document.getElementById('loginPayment_C');//로그인 유저 결제 기간 표시할 스팬
let remainDays_C = document.getElementById('remainDays_C');//잔여일 계산
let manageBtn_C = document.getElementById('manageBtn_C');//관리자만 사용 가능한 버튼
let logoutBtn = document.getElementById('logoutBtn_C');//로그아웃 버튼
window.onload = function () {
    // console.log(localStorage);
    if(localStorage.getItem('loginId')){
        localStorageId = localStorage.getItem('loginId');
        localStorageAuthority = localStorage.getItem('authority');
        localStorageLoginPayment = localStorage.getItem('payment');

        let date = new Date();
        let date2 = new Date(localStorageLoginPayment);

        let result_ = date2.getTime() - date.getTime();
        result_ = ((((result_ / 1000) / 60 ) / 60 ) / 24);
        let result = Math.ceil(result_) + "일 남았습니다.";

        loginID.innerHTML = `${localStorageId}`;
        loginAuth_C.innerHTML = `${localStorageAuthority}`;
        loginPayment_C.innerHTML = `${localStorageLoginPayment}`;
        
        if(result_ > 0){
            remainDays_C.innerHTML = result;
        }
        else{
            alert('결재기간이 만료되었습니다. 결제후 이용해 주세요.');
            location.href = 'signInUp.html';
        }
    }
    else{
        alert('로그인을 하셔야 서비스를 이용하실수 있습니다.');
        location.href = 'signInUp.html';
    }

    //관리자 처리
    if(localStorageAuthority == '관리자'){
        manageBtn_C.style.display = 'inline-block';
    }
    else{
        manageBtn_C.style.display = 'none';
    }
    infinitySlide(); //메인 부분 무한 슬라이드
}

logoutBtn.addEventListener('click' , function(){
    alert('로그아웃 합니다.');
    localStorage.clear();
    location.href = 'index.html';
});

/*장르,년도 선택후 버튼 클릭*/
btnSelect_C.addEventListener('click', function () {
    doAjax();
});
/*선택후 첫화면 그리기*/
function doAjax() {
    console.clear();
    let xhr = new XMLHttpRequest();
    let jsonArray = [];
    sortedJsonArray = [];
    text = null;

    xhr.open('get', './json/movielist2.json');
    // xhr.open('get', 'https://doosan2058.dothome.co.kr/json/movielist2.json');
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            /*제이슨데이터 객체로 변환후 배열에 담기*/
            let returnJson = JSON.parse(xhr.response);
            for (let i = 0; i < returnJson.length; i++) {
                let obj = new Object();
                obj.genre = returnJson[i].genre.toLowerCase();
                obj.title = returnJson[i].title;
                let year_ = returnJson[i].open;
                let year = year_.split('-', 1);
                obj.open = year;
                obj.grade = returnJson[i].grade;
                obj.img = returnJson[i].img;
                obj.story = returnJson[i].story;
                obj.preview = returnJson[i].preview;
                jsonArray.push(obj);
            }

            genreSelectText = genreSelect_C.value;
            genreSelectText = genreSelectText.toLowerCase();
            yearSelectText = yearSelect_C.value;
            /*화면 출력전에 전화면 삭제*/
            let divs = document.querySelectorAll('.movies_C');
            let divs2 = document.querySelector('#divPage_C');
            for (let i = 0; i < divs.length; i++)
                divs[i].remove();
            if (divs2)
                divs2.remove();
            /*조건에 따라 객체 배열 소팅후 최종 배열에 저장*/
            if (genreSelectText == 'all') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        sortedJsonArray.push(jsonArray[i]);
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].open != 2022)
                            continue;
                        sortedJsonArray.push(jsonArray[i]);
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].open < 2020 || jsonArray[i].open > 2021)
                            continue;
                        sortedJsonArray.push(jsonArray[i]);
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].open < 2010 || jsonArray[i].open > 2019)
                            continue;
                        sortedJsonArray.push(jsonArray[i]);
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].open < 2000 || jsonArray[i].open > 2009)
                            continue;
                        sortedJsonArray.push(jsonArray[i]);
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].open < 1990 || jsonArray[i].open > 1999)
                            continue;
                        sortedJsonArray.push(jsonArray[i]);
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].open < 1980 || jsonArray[i].open > 1989)
                            continue;
                        sortedJsonArray.push(jsonArray[i]);
                    }
                }
                else
                    alert('오류');
            }

            else if (genreSelectText == 'action') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'action') {
                            console.log(i);
                            sortedJsonArray.push(jsonArray[i]);
                        }
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'action' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'action' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'action' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'action' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'action' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'action' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');

            }
            else if (genreSelectText == 'comedy') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'comedy')
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'comedy' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'comedy' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'comedy' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'comedy' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'comedy' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'comedy' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');
            }
            else if (genreSelectText == 'thriller') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'thriller')
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'thriller' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'thriller' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'thriller' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'thriller' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'thriller' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'thriller' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');
            }
            else if (genreSelectText == 'horror') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'horror')
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'horror' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'horror' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'horror' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'horror' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'horror' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'horror' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');
            }
            else if (genreSelectText == 'adventure') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'adventure')
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'adventure' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'adventure' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'adventure' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }

                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'adventure' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'adventure' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'adventure' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');
            }
            else if (genreSelectText == 'animation') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'animation')
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'animation' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'animation' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'animation' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'animation' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'animation' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'animation' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');
            }
            else if (genreSelectText == 'crime') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'crime')
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'crime' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'crime' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'crime' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'crime' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'crime' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'crime' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');
            }
            else if (genreSelectText == 'sci-fi') {
                if (yearSelectText == 'all') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'sci-fi')
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y1') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'sci-fi' && jsonArray[i].open == 2022)
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y2') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'sci-fi' && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y3') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'sci-fi' && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y4') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'sci-fi' && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y5') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'sci-fi' && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else if (yearSelectText == 'y6') {
                    for (let i = 0; i < jsonArray.length; i++) {
                        if (jsonArray[i].genre == 'sci-fi' && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                            sortedJsonArray.push(jsonArray[i]);
                        else
                            continue;
                    }
                }
                else
                    alert('에러');
            }
            else
                alert('오류');
            /*최종 소팅된 배열만 화면에 표시*/
            drawArray();
        }
    }


}

function drawArray() {
    currentPageNum = 1; //07-23 02:46 최원석 수정
    if (sortedJsonArray.length > 10) {
        pageStartCount = 0;
        pageEndCount = 10;
        pageBtnContainer_C.style.display = 'block';

        if (sortedJsonArray.length % 10 == 0)
            sortedJsonArrayCount = Math.floor(sortedJsonArray.length / 10);

        else
            sortedJsonArrayCount = Math.floor(sortedJsonArray.length / 10) + 1;


        console.log(`정렬된 영화 수: ${sortedJsonArray.length}`);
        console.log(`페이지 수: ${sortedJsonArrayCount}`);

        let divPage = document.createElement('div');
        pageBtnContainer_C.appendChild(divPage);
        divPage.id = 'divPage_C';

        let aPrev = document.createElement('a');
        aPrev.addEventListener('click', prevPage);
        aPrev.textContent = '이전';
        aPrev.id = 'aPrev_C';
        aPrev.style.opacity = '0';
        divPage.appendChild(aPrev);

        for (let j = 0; j < sortedJsonArrayCount; j++) {
            let aPage = document.createElement('a');
            aPage.textContent = `${j + 1}`;
            aPage.id = `aPage_C${j + 1}`;
            aPage.className = 'aPages_C';
            if (j == 0) {
                aPage.style.color = '#f9d142';
                aPage.style.pointerEvents = 'none';
            }
            divPage.appendChild(aPage);
            aPage.addEventListener('click', pageShow);

        }



        let aNext = document.createElement('a');
        aNext.textContent = '다음';
        aNext.id = 'aNext_C';
        aNext.addEventListener('click', nextPage);
        divPage.appendChild(aNext);

        aPrev.addEventListener('mouseover', function () {
            this.style.color = 'crimson';
        });
        aPrev.addEventListener('mouseout', function () {
            this.style.color = 'white';
        });
        aNext.addEventListener('mouseover', function () {
            this.style.color = 'crimson';
        });
        aNext.addEventListener('mouseout', function () {
            this.style.color = 'white';
        });
    }

    else {
        pageStartCount = 0;
        pageEndCount = sortedJsonArray.length;
        pageBtnContainer_C.style.display = 'none';
        console.log(`정렬된 영화 수: ${sortedJsonArray.length}`);
    }

    for (let i = pageStartCount; i < pageEndCount; i++) {
        drawMovies(i);

    }


}

function drawMovies(i) {
    let movieDiv = document.querySelector('#previewDiv_C');//ifram 감싼 디비전
    let movie = document.querySelector('#iframe_C');//iframe
    let exit = document.querySelector('#exit_C');//iframe 끄는 아이콘

    let poster = document.createElement('img');//포스터
    let div = document.createElement('div');//영화 1개 컨테이너 디비전
    let divCover = document.createElement('div');//호버시 효과 줄 디비전

    let title = document.createElement('p');
    let genre = document.createElement('p');
    let open = document.createElement('p');
    let preview = document.createElement('h4');
    let playIcon = document.createElement('h5');
    playIcon.innerHTML = '<ion-icon name="play-outline" class="play_C"></ion-icon>';



    div.className = `movies${i} movies_C`;
    divCover.className = 'moviesCover_C';
    poster.className = 'poster_C';

    title.innerHTML = sortedJsonArray[i].title;
    genre.innerHTML = sortedJsonArray[i].genre;
    open.innerHTML = sortedJsonArray[i].open;
    preview.innerHTML = sortedJsonArray[i].preview;

    poster.src = "./img/" + sortedJsonArray[i].img;
    let starNum = Math.floor((sortedJsonArray[i].grade) % 10);
    for (let k = 0; k < starNum; k++)
        divCover.innerHTML += '<ion-icon name="star" style="color : blue; background-color: transparent; font-size : 18px;"></ion-icon>';
    if (sortedJsonArray[i].grade % 10 != 0)
        divCover.innerHTML += '<ion-icon name="star-half" style="color : blue; background-color: transparent; font-size : 18px;"></ion-icon>';
    divCover.innerHTML += '<br>' + sortedJsonArray[i].grade;
    divCover.innerHTML += '<br><br>' + sortedJsonArray[i].story;
    divCover.appendChild(playIcon);
    movieContainer_C.appendChild(div);
    document.querySelector(`.movies${i}`).appendChild(divCover);
    document.querySelector(`.movies${i}`).appendChild(poster);
    document.querySelector(`.movies${i}`).appendChild(title);
    document.querySelector(`.movies${i}`).appendChild(genre);
    document.querySelector(`.movies${i}`).appendChild(open);
    document.querySelector(`.movies${i}`).appendChild(preview);

    exit.addEventListener('click', function () {
        movieDiv.style.display = 'none';
        movie.src = '';
    });
    //07-21 영화 컨테이너 클릭시 유튜브 재생에서 재생버튼 클릭시 유튜브 재생으로 변경
    playIcon.addEventListener('click', function (e) {
        // console.dir(this.parentNode.parentNode.children[5].innerHTML);
        console.log(e.pageX, e.pageY);
        movieDiv.style.display = 'block';
        movieDiv.style.top = e.pageY - 157 + 'px';
        movieDiv.style.left = e.pageX - 230 + 'px';
        movie.src = this.parentNode.parentNode.children[5].innerHTML;

    });

}

function prevPage() {
    currentPageNum -= 1;
    currentPageShow();

    if (currentPageNum != 1) {
        doAjax2();
    }
    else {
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
        doAjax2();
    }
    let aNext = document.getElementById('aNext_C');
    aNext.style.opacity = '1';
    aNext.style.pointerEvents = 'auto';
}

function nextPage() {
    currentPageNum += 1;
    currentPageShow();

    if (currentPageNum != sortedJsonArrayCount) {
        doAjax2();
    }
    else {
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
        doAjax2();
    }
    let aPrev = document.getElementById('aPrev_C');
    aPrev.style.opacity = '1';
    aPrev.style.pointerEvents = 'auto';


}

function pageShow() {
    currentPageNum = parseInt(this.textContent);

    currentPageShow();

    let aPrev = document.getElementById('aPrev_C');
    let aNext = document.getElementById('aNext_C');


    if (currentPageNum == sortedJsonArrayCount) {
        aNext.style.opacity = '0';
        aNext.style.pointerEvents = 'none';
    }
    else {
        aNext.style.opacity = '1';
        aNext.style.pointerEvents = 'auto';
    }
    if (currentPageNum == 1) {
        aPrev.style.opacity = '0';
        aPrev.style.pointerEvents = 'none';
    }
    else {
        aPrev.style.opacity = '1';
        aPrev.style.pointerEvents = 'auto';
    }
    doAjax2();
}

function currentPageShow() {
    console.log(currentPageNum);
    let aPages = document.querySelectorAll('.aPages_C');
    let aPageSelect = document.getElementById(`aPage_C${currentPageNum}`);
    // console.log(aPageSelect);
    for (item of aPages) {
        item.style.color = 'white';
        item.style.pointerEvents = 'auto';
    }

    aPageSelect.style.color = '#f9d142';
    aPageSelect.style.pointerEvents = 'none';
}

function doAjax2() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './json/movielist2.json');
    // xhr.open('get', 'https://doosan2058.dothome.co.kr/json/movielist2.json');
    
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            let divs = document.querySelectorAll('.movies_C');
            for (let i = 0; i < divs.length; i++) {
                divs[i].remove();
            }

            pageStartCount = (currentPageNum * 10) - 10;

            if (currentPageNum != sortedJsonArrayCount)
                pageEndCount = currentPageNum * 10;
            else
                pageEndCount = sortedJsonArray.length;

            for (let i = pageStartCount; i < pageEndCount; i++)
                drawMovies(i);
        }
    }
}
//메인 이미지 무한 슬라이드
function infinitySlide() {

    let curIndex = 0;
    setInterval(function () {

        mainImgDiv_C.style.transition = '0.5s';
        mainImgDiv_C.style.transform = `translateX(${-20 * (curIndex + 1)}%)`;

        curIndex++;

        if (curIndex == 4) {
            setTimeout(function () {
                mainImgDiv_C.style.transition = '0s';
                mainImgDiv_C.style.transform = 'translateX(0)';
            }, 501)
            curIndex = 0;
        }

    }, 3 * 1000);
}





