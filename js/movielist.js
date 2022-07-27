let mainImgDiv_C = document.querySelector('.mainImgDiv_C'); //메인 이미지부분 이미지들 4개 감싼 디비전
let genreSelect_C = document.getElementById('genreSelect_C'); //장르 셀렉트
let yearSelect_C = document.getElementById('yearSelect_C'); //년도 셀렉트
const btnSelect_C = document.getElementById('btnSelect_C'); //소팅 검색 버튼
let chooseOption = document.querySelectorAll('.chooseOption');//옵션 선택
let mainImg_C = document.querySelectorAll('.mainImg_C');//섹션 1 최신영화 4개 이미지들
let movieContainer_C = document.getElementById('movieContainer_C'); //소팅 결과 그릴 컨테이너
let pageBtnContainer_C = document.getElementById('pageBtnContainer_C'); // 페이지 번호 그릴 컨테이너
let loginID = document.getElementById('loginID_C');//로그인 유저 이메일 표시할 스팬
let loginAuth_C = document.getElementById('loginAuth_C');//로그인 유저 권한 표시할 스팬
let loginPayment_C = document.getElementById('loginPayment_C');//로그인 유저 결제 기간 표시할 스팬
let remainDays_C = document.getElementById('remainDays_C');//잔여일 계산
let manageBtn_C = document.getElementById('manageBtn_C');//관리자만 사용 가능한 버튼
let logoutBtn = document.getElementById('logoutBtn_C');//로그아웃 버튼
let manageDiv_C = document.getElementById('manageDiv_C');//관리자 회원 목록 보여줄 디비전
let section2_S = document.getElementById('section2_S');//메인 부분 디비전
let coupon = document.getElementById('coupon');//쿠폰 처리 앵커
let currentChooseOptionText = '일반'; //일반,날짜순,평점순 담는 변수, 처음엔 일반으로 초기화
let genreSelectText = null; //장르 셀렉트 텍스트
let yearSelectText = null; //년도 셀렉트 텍스트
let sortedJsonArrayCount = null; //소팅된후 총 페이지수
let pageStartCount = null; //페이지 이동시 보여줄 첫번째 배열 번호
let pageEndCount = null; //페이지 이동시 보여줄 마지막 배열번호
let sortedJsonArray = []; //최종 소팅된 영화 데이터 들어가 있는 배열, 전역으로 설정해서 접근
let sortedJsonArrayFullYear = []; //소팅된 영화 데이터를 날짜순 내림차순 정렬한 배열
let sortedJsonArrayGrade = []; //소팅된 영화 데이터를 평점 순으로 내림차순 정렬한 배열
let currentPageNum = 1; //현재 페이지 번호, 처음엔 1로 초기화
let localStorageId = null;//로그인된 이메일 저장할 변수
let localStorageAuthority = null;//로그인된 직책 저장할 변수




window.onload = startPage();

function startPage() { //페이지 로딩시 실행해야 하는 함수
    afterCallTopMovie(); //평점 상위 5개 불러오는 함수
    if (localStorage.getItem('loginId')) { //로그인 아이디가 로컬스토리지에 있다면
        localStorageId = localStorage.getItem('loginId'); 
        localStorageAuthority = localStorage.getItem('authority');
        localStorageLoginPayment = localStorage.getItem('payment');
        
        let date = new Date(); //현재 날짜
        let date2 = new Date(localStorageLoginPayment); //결제 날자
        let result_ = date2.getTime() - date.getTime(); //ms로 리턴
        result_ = ((((result_ / 1000) / 60) / 60) / 24); //일수 계산
        let result = Math.ceil(result_) + "일 남았습니다.";
        
        loginID.innerHTML = `${localStorageId}`;
        loginAuth_C.innerHTML = `${localStorageAuthority}`;
        loginPayment_C.innerHTML = `${localStorageLoginPayment}`;

        if (result_ > 0) {
            remainDays_C.innerHTML = result;
            doAjax(); //결제 기간이 남았다면 메인 화면 로딩
        }
        else {
            alert('결재기간이 만료되었습니다. 결제후 이용해 주세요.');
            remainDays_C.innerHTML = '만료';
            section2_S.style.display = 'none';
            /*여기에 쿠폰 이벤트 작성*/
        }
    }
    else { //로컬 스토리지에 아이디 없으면 로그인 안한걸로 간주(원래 세션 역할)
        alert('로그인을 하셔야 서비스를 이용하실수 있습니다.');
        location.href = 'signInUp.html';
    }

    //관리자 처리
    if (localStorageAuthority == '관리자') {
        manageBtn_C.style.display = 'inline-block';
        showMemberJson();
    }
    else {
        manageBtn_C.style.display = 'none';
    }
    
    infinitySlide(); //메인 부분 무한 슬라이드
}

coupon.addEventListener('click' , function(){ //쿠폰 앵커 클릭시 프롬프트 띄우기
    let text = prompt('쿠폰 번호를 입력하세요');
    if(text == '1234'){
        let beforeDate = loginPayment_C.innerHTML;
        let date = new Date(beforeDate);
        date.setMonth(date.getMonth() + 1);
        loginPayment_C.innerHTML = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        localStorage.setItem('payment' , loginPayment_C.innerHTML );
        alert('쿠폰을 사용합니다.');
        location.reload();
    }
    else if(text.length == 0)
        alert('쿠폰번호를 입력해주세요.');
    else{
        alert('존재하지 않는 쿠폰 번호 입니다.');
    }
});

function callMember(){
    return new Promise(resolve => {
        let xhr = new XMLHttpRequest();
        xhr.open('get', './json/member.json');
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                let memberJson = JSON.parse(xhr.response);
                resolve(memberJson);
            }
        }
    });
}

async function showMemberJson(){
    let dateNow = new Date();
    
    let memberJson = await callMember();
    let text = '<table>'; //텍스트 만들기
    for(item of memberJson){ 
        if(item.authority == '관리자')//회원만 출력
            continue;
        text += `<tr><td>${item.email}</td>`;
        text += `<td>${item.nickname}</td>`;
        let date = new Date(item.payment);
        if(dateNow > date)
            text += `<td style='color : red;'>${item.payment}</td></tr>`;
        else
            text += `<td style='color : grey;'>${item.payment}</td></tr>`;
    }
    text += '</table>';
    manageDiv_C.innerHTML = text;
}

function callTopMovie(){ //평점 상위 5개 영화 알아오는 함수
    return new Promise( resolve => {
        let xhr = new XMLHttpRequest();
        xhr.open('get' , './json/movielist2.json');
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                let arrMovieList2 = JSON.parse(xhr.response); //movielist2 JSON 파일, 배열로 저장
                resolve(arrMovieList2);
            }
        }
    });
}

async function afterCallTopMovie(){
    let arrMovie = await callTopMovie(); //arrMovieList2 -> arrMovie
    arrMovie.sort(function(a, b){ //내림차순 정렬
        if(a.grade > b.grade)
            return -1;
        if(a.grade == b.grade)
            return 0;
        if(a.grade < b.grade)
            return 1;
    });
    let ratingImg = document.querySelectorAll('.ratingImg');
    for(let i = 0; i < ratingImg.length; i++){
        ratingImg[i].src = './img/' + arrMovie[i].img;
    }
}

//소팅 앵커 3개 클릭 이벤트 등록
for(let i = 0; i < chooseOption.length; i++){
    chooseOption[i].addEventListener('click' , function(){
        for(item of chooseOption)
            item.style.color = 'white'; //일단 3개다 흰색으로 초기화
        
        this.style.color = 'crimson'; //클릭한 앵커 색 효과
        currentChooseOptionText = this.innerHTML; //정렬할 옵션 저장
        console.log(currentChooseOptionText);
        doAjax(); //정렬할 옵션으로 소팅 배열 저장 및 첫화면 그리기
    });
}

logoutBtn.addEventListener('click', function () {
    alert('로그아웃 합니다.');
    localStorage.clear(); //로그아웃 시 로컬스토리지 비우기
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
    let jsonArray = []; //장르, 연도 선택시, 화면에 그릴 배열 초기화
    sortedJsonArray = []; //일반 소팅 저장 배열
    sortedJsonArrayFullYear = []; //날짜 최신순 소팅 저장 배열
    sortedJsonArrayGrade = []; //평점 높은순 소팅 저장 배열
    text = null;

    xhr.open('get', './json/movielist2.json');
    // xhr.open('get', 'https://doosan2058.dothome.co.kr/json/movielist2.json');
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            /*제이슨데이터 객체로 변환후 배열에 담기*/
            let returnJson = JSON.parse(xhr.response); //1차로 배열에 저장
            for (let i = 0; i < returnJson.length; i++) {
                let obj = new Object();
                obj.genre = returnJson[i].genre.toLowerCase(); //장르 대문자 소문자로 변경
                obj.title = returnJson[i].title; //제목
                let year_ = returnJson[i].open; 
                let year = year_.split('-', 1); //개봉일자 년도 앞에 4자리만 잘라오기
                obj.open = year;
                obj.openFull = returnJson[i].open; //전체 개봉일자
                obj.grade = returnJson[i].grade; //평점
                obj.img = returnJson[i].img; //포스터 주소
                obj.story = returnJson[i].story; //스토리
                obj.preview = returnJson[i].preview; //트레일러 유튜브 주소
                jsonArray.push(obj); //소팅후 2차로 배열에 저장
            }
            genreSelectText = genreSelect_C.value; //셀렉트된 장르 텍스트
            genreSelectText = genreSelectText.toLowerCase(); 
            yearSelectText = yearSelect_C.value; //셀렉트된 년도 텍스트
            /*화면 출력전 전화면 삭제*/
            let divs = document.querySelectorAll('.movies_C');
            let divs2 = document.querySelector('#divPage_C');
            for (let i = 0; i < divs.length; i++)
                divs[i].remove();
            if (divs2)
                divs2.remove();
            /*07-24 최원석 수정 >> 소팅하는 로직 if else 문 에서, 함수 처리방식으로 변경*/
            sort(genreSelectText, yearSelectText, jsonArray, sortedJsonArray);
            drawArray(); //3차로 소팅된 배열 화면에 그리기
        }
    }
}

/*장르, 년도 소팅하는 함수*/
function sort(genreSelectText, yearSelectText, jsonArray, sortedJsonArray) {
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
    else {
        if (yearSelectText == 'all') {
            for (let i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i].genre == genreSelectText) {
                    sortedJsonArray.push(jsonArray[i]);
                }
                else
                    continue;
            }
        }
        else if (yearSelectText == 'y1') {
            for (let i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i].genre == genreSelectText && jsonArray[i].open == 2022)
                    sortedJsonArray.push(jsonArray[i]);
                else
                    continue;
            }
        }
        else if (yearSelectText == 'y2') {
            for (let i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i].genre == genreSelectText && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                    sortedJsonArray.push(jsonArray[i]);
                else
                    continue;
            }
        }
        else if (yearSelectText == 'y3') {
            for (let i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i].genre == genreSelectText && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                    sortedJsonArray.push(jsonArray[i]);
                else
                    continue;
            }
        }
        else if (yearSelectText == 'y4') {
            for (let i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i].genre == genreSelectText && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                    sortedJsonArray.push(jsonArray[i]);
                else
                    continue;
            }
        }
        else if (yearSelectText == 'y5') {
            for (let i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i].genre == genreSelectText && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                    sortedJsonArray.push(jsonArray[i]);
                else
                    continue;
            }
        }
        else if (yearSelectText == 'y6') {
            for (let i = 0; i < jsonArray.length; i++) {
                if (jsonArray[i].genre == genreSelectText && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                    sortedJsonArray.push(jsonArray[i]);
                else
                    continue;
            }
        }
        else
            alert('에러');
    }
    
    if(currentChooseOptionText == '일반')
        sortedJsonArray = sortedJsonArray; //일반 소팅이면 그대로 반환
    else if(currentChooseOptionText == '개봉순'){ //최신일자순이면
        sortedJsonArray.sort(function(a, b){
            if(a.openFull > b.openFull) 
                return -1;
            if(a.openFull == b.openFull) 
                return 0;
            if(a.openFull < b.openFull) 
                return 1;
        });
    }
    else if(currentChooseOptionText == '평점순'){ //평점순이면
        sortedJsonArray.sort(function(a, b){
            if(a.grade > b.grade) 
                return -1;
            if(a.grade == b.grade) 
                return 0;
            if(a.grade < b.openFull) 
                return 1;
        });
    }
    else
        console.log('배열 소팅중 오류발생');
    /*최종 소팅된 배열만 화면에 표시*/
    console.log(`정렬 기준 : ${currentChooseOptionText}`)
    
}

function drawArray() { //첫화면 그리기
    currentPageNum = 1; //07-23 02:46 최원석 수정
    if (sortedJsonArray.length > 10) { //길이가 10개가 넘으면 페이징 처리시작
        pageStartCount = 0; //반복문 시작
        pageEndCount = 10; //반복문 끝
        pageBtnContainer_C.style.display = 'block'; //페이지 담을 디비전 화면에 보이기
        
        if (sortedJsonArray.length % 10 == 0) //만약 10개단위로 끝난다면
            sortedJsonArrayCount = Math.floor(sortedJsonArray.length / 10); //총 페이지수는 딱떨어짐
        else //10단위가 아니면 총페이지 수 1개 추가
            sortedJsonArrayCount = Math.floor(sortedJsonArray.length / 10) + 1;
        
        console.log(`정렬된 영화 수: ${sortedJsonArray.length}`);
        console.log(`페이지 수: ${sortedJsonArrayCount}`);

        let divPage = document.createElement('div'); //페이지 앵커들 담을 디비전
        pageBtnContainer_C.appendChild(divPage); //페이지 컨테이너 디비전에 추가
        divPage.id = 'divPage_C';

        let aPrev = document.createElement('a'); //이전 앵커
        aPrev.addEventListener('click', prevPage); //클릭시 페이지 앞으로가기 처리
        aPrev.textContent = '이전';
        aPrev.id = 'aPrev_C';
        aPrev.style.opacity = '0'; //처음에는 무조건 맨앞 페이지 이므로 안보이게 처리
        divPage.appendChild(aPrev);

        for (let j = 0; j < sortedJsonArrayCount; j++) { //위에서 계산된 총 페이지 수만큼 페이징 앵커 생산
            let aPage = document.createElement('a');
            aPage.textContent = `${j + 1}`; 
            aPage.id = `aPage_C${j + 1}`;
            aPage.className = 'aPages_C';
            if (j == 0) {//1번 페이징 앵커는 현재 선택된 페이지 이므로 색처리 및 클릭 이벤트 비활성화
                aPage.style.color = '#f9d142';
                aPage.style.pointerEvents = 'none';
            }
            divPage.appendChild(aPage);
            aPage.addEventListener('click', pageShow); //페이징 앵커의 번호로 페이지 다시 그리기
        }

        let aNext = document.createElement('a'); //다음 앵커
        aNext.textContent = '다음';
        aNext.id = 'aNext_C';
        aNext.addEventListener('click', nextPage);
        divPage.appendChild(aNext);

        aPrev.addEventListener('mouseenter', function () {
            this.style.color = 'crimson';
        });
        aPrev.addEventListener('mouseleave', function () {
            this.style.color = 'white';
        });
        aNext.addEventListener('mouseenter', function () {
            this.style.color = 'crimson';
        });
        aNext.addEventListener('mouseleave', function () {
            this.style.color = 'white';
        });
    }

    else { //만약 소팅된 최종 배열이 10개가 안되면 페이징 처리 x
        pageStartCount = 0;
        pageEndCount = sortedJsonArray.length;
        pageBtnContainer_C.style.display = 'none';
        console.log(`정렬된 영화 수: ${sortedJsonArray.length}`);
    }

    for (let i = pageStartCount; i < pageEndCount; i++) {
        drawMovies(i); //첫화면 영화 그리기
    }


}

function drawMovies(i) { //영화 그리는 함수
    
    let movieDiv = document.querySelector('#previewDiv_C');//ifram 감싼 디비전
    let movie = document.querySelector('#iframe_C');//iframe
    let exit = document.querySelector('#exit_C');//iframe 끄는 아이콘
    let poster = document.createElement('img');//포스터
    let div = document.createElement('div');//영화 1개 컨테이너 디비전
    let divCover = document.createElement('div');//호버시 효과 줄 디비전
    let title = document.createElement('p'); //제목
    let genre = document.createElement('p'); //장르
    let open = document.createElement('p'); //개봉일
    let preview = document.createElement('h4'); //영화 트레일러 유튜브 주소, display none 처리
    let playIcon = document.createElement('h5'); //재생 아이콘
    playIcon.innerHTML = '<ion-icon name="play-circle-outline" class="play_C"></ion-icon>'; //h5태그에 텍스트로 처리

    div.className = `movies${i} movies_C`; //영화 하나 디비전
    divCover.className = 'moviesCover_C'; //호버시 나타날 커버 디비전
    poster.className = 'poster_C'; //영화 소프터 나타낼 이미지 태그
    title.innerHTML = sortedJsonArray[i].title; //최종 소팅된 배열중 전역변수로 넘어온 배열 그리기
    genre.innerHTML = sortedJsonArray[i].genre;
    open.innerHTML = sortedJsonArray[i].openFull;
    preview.innerHTML = sortedJsonArray[i].preview;
    poster.src = "./img/" + sortedJsonArray[i].img;
    let starNum = Math.floor((sortedJsonArray[i].grade) % 10); //평점 만큼 별 그리기
    for (let k = 0; k < starNum; k++)
        divCover.innerHTML += '<ion-icon name="star" style="color : #f9d142; background-color: transparent; font-size : 2rem;"></ion-icon>';
    if (sortedJsonArray[i].grade % 10 != 0)//소숫점은 반개짜리 별 그리기
        divCover.innerHTML += '<ion-icon name="star-half" style="color : #f9d142; background-color: transparent; font-size : 2rem;"></ion-icon>';
    divCover.innerHTML += `<br><span>${sortedJsonArray[i].grade}</span>`;
    divCover.innerHTML += `<br><br>${sortedJsonArray[i].story}`;
    divCover.appendChild(playIcon);
    movieContainer_C.appendChild(div);//섹션2에 영화 한개씩 부착
    document.querySelector(`.movies${i}`).appendChild(divCover);
    document.querySelector(`.movies${i}`).appendChild(poster);
    document.querySelector(`.movies${i}`).appendChild(title);
    document.querySelector(`.movies${i}`).appendChild(genre);
    document.querySelector(`.movies${i}`).appendChild(open);
    document.querySelector(`.movies${i}`).appendChild(preview);
    exit.addEventListener('click', function () { //유튜브 끄기 아이콘
        movieDiv.style.display = 'none'; //누르면 모달창 다시 none 처리
        movie.src = ''; //주소 초기화
    });
    //07-21 영화 컨테이너 클릭시 유튜브 재생에서 재생버튼 클릭시 유튜브 재생으로 변경
    playIcon.addEventListener('click', function (e) {
        movieDiv.style.display = 'block'; //모달창 보이게
        movieDiv.style.top = e.pageY - 157 + 'px'; //현재 마우스 위치에서 재색
        movieDiv.style.left = e.pageX - 230 + 'px';
        movie.src = this.parentNode.parentNode.children[5].innerHTML; //부모(영화 디비전)에 트레일러 주소 저장되 있음
    });
}

function prevPage() { //이전 앵커 클릭시 이벤트 처리
    currentPageNum -= 1; //현재 페이지 -1
    currentPageShow(); //클릭시 현재 페이지 앵커 색처리 및 클릭이벤트 비활성화, 나머지 앵커들 색처리

    if (currentPageNum != 1) { //-1 값이 1이 아니라면, 즉 2페이지까지
        doAjax2(); //화면 그리기
    }
    else { //1페이지에 도착하면
        this.style.opacity = '0'; //다시 화면에 안보이게
        this.style.pointerEvents = 'none';
        doAjax2(); //페이징 앵커 또는 다음, 이전버튼 누를시 화면 다시 그리기
    }
    
    let aNext = document.getElementById('aNext_C');//이전 페이지 앵커를 누른다면 다음 페이지 앵커 무조건 다시 활성화
    aNext.style.opacity = '1';
    aNext.style.pointerEvents = 'auto';
}

function nextPage() { //다음 페이지 누를시 이벤트 처리
    currentPageNum += 1;
    currentPageShow();

    if (currentPageNum != sortedJsonArrayCount) { //맨끝이 아니라면
        doAjax2(); //페이징 앵커 또는 다음, 이전버튼 누를시 화면 다시 그리기
    }
    else { //페이지 + 1이 만약 맨끝이라면, 즉 맨 뒷페이지에서 1페이지 전이였다면
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
        doAjax2();
    }
    let aPrev = document.getElementById('aPrev_C'); //다음 페이지 버튼 누른다면 무조건 이전 페이지 앵커 활성화
    aPrev.style.opacity = '1';
    aPrev.style.pointerEvents = 'auto';


}

function pageShow() { //앵커들 클릭시 실행 함수
    currentPageNum = parseInt(this.textContent); //현재 페이지 번호는 앵커의 번호

    currentPageShow(); //페이징 앵커들 색처리와 현재 페이징 앵커 비활성화 처리 함수

    let aPrev = document.getElementById('aPrev_C');
    let aNext = document.getElementById('aNext_C');

    if (currentPageNum == sortedJsonArrayCount) { //만약 맽끝 페이지라면
        aNext.style.opacity = '0'; //다음 앵커 비활성화
        aNext.style.pointerEvents = 'none';
    }
    else {  //맨끝페이지가 아니라면
        aNext.style.opacity = '1';
        aNext.style.pointerEvents = 'auto';
    }
    if (currentPageNum == 1) { //만약 맨앞 페이지라면
        aPrev.style.opacity = '0'; //이전 앵커 비활성화
        aPrev.style.pointerEvents = 'none';
    }
    else {  //맨앞 페이지가 아니라면
        aPrev.style.opacity = '1';
        aPrev.style.pointerEvents = 'auto';
    }
    doAjax2(); //페이징 앵커 또는 다음, 이전버튼 누를시 화면 다시 그리기
}

function currentPageShow() { //페이징 앵커들 색처리와 현재 페이징 앵커 비활성화 처리 함수
    console.log(currentPageNum);
    let aPages = document.querySelectorAll('.aPages_C'); //그려져 있는 페이징 앵커들
    let aPageSelect = document.getElementById(`aPage_C${currentPageNum}`); //그중 현재 페이지 번호 나타내는 앵커
    
    for (item of aPages) {
        item.style.color = 'white'; //모두 흰색으로 초기화
        item.style.pointerEvents = 'auto';
    }

    aPageSelect.style.color = '#f9d142'; //현재 페이지 앵커 노란색으로 처리
    aPageSelect.style.pointerEvents = 'none'; //현재 페이지는 다시 클릭하지 못하게 처리
}

function doAjax2() { //페이징 앵커 또는 다음, 이전버튼 누를시 화면 다시 그리기
    let xhr = new XMLHttpRequest();
    xhr.open('get', './json/movielist2.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            let divs = document.querySelectorAll('.movies_C');//전에 그려져 있던 영화들 삭제
            for (let i = 0; i < divs.length; i++) {
                divs[i].remove();
            }

            pageStartCount = (currentPageNum * 10) - 10; //배열 시작 번호는 현재 페이지 번호 * 10 - 10

            if (currentPageNum != sortedJsonArrayCount) //만약 현재 페이지가 끝페이지가 아니라면
                pageEndCount = currentPageNum * 10; //10개 더 그리기
            else //현재 페이지가 끝페이지라면
                pageEndCount = sortedJsonArray.length; //최종 정렬된 배열길이만큼 그리기

            for (let i = pageStartCount; i < pageEndCount; i++)
                drawMovies(i); //영화 그리는 함수
        }
    }
}
//메인 이미지 무한 슬라이드
function infinitySlide() {
    for(let i = 0; i < mainImg_C.length; i++){ 
        mainImg_C[i].src = `./img/main/${i+1}.jpg`; 
    }
    let firstItemClone = mainImgDiv_C.firstElementChild.cloneNode(true); //메인 이미지 1번 이미지 복사
    mainImgDiv_C.appendChild(firstItemClone);//복사된 이미지 5번에 추가
    let curIndex = 0;
    setInterval(function () {
        mainImgDiv_C.style.transform = `translateX(${-20 * 0.0005 * (curIndex + 1)}%)`;
        curIndex++;
        if (curIndex == 4 * 2000) {
            setTimeout(function () {
                mainImgDiv_C.style.transform = 'translateX(0)';
            }, 0.00051 * 1000)
            curIndex = 0;
        }
    }, 0.0005 * 1000);
}





