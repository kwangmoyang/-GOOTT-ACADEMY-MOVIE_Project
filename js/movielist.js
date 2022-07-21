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
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
            let divs = document.querySelectorAll('.movies');
            let divs2 = document.querySelector('#divPage');
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
    
    if (sortedJsonArray.length > 10) {
        pageStartCount = 0;
        pageEndCount = 10;
        pageBtnContainer_C.style.display = 'block';

        if (sortedJsonArray.length % 10 == 0) 
            sortedJsonArrayCount = sortedJsonArray.length / 10;
        
        else 
            sortedJsonArrayCount = Math.floor(sortedJsonArray.length / 10) + 1;
        

        console.log(`정렬된 영화 수: ${sortedJsonArray.length}`);
        console.log(`페이지 수: ${sortedJsonArrayCount}`);

        let divPage = document.createElement('div');
        pageBtnContainer_C.appendChild(divPage);
        divPage.id = 'divPage';

        let aPrev = document.createElement('a');
        aPrev.addEventListener('click', prevPage);
        aPrev.textContent = '이전';
        aPrev.id = 'aPrev';
        aPrev.style.opacity = '0';
        divPage.appendChild(aPrev);

        for (let j = 0; j < sortedJsonArrayCount; j++) {
            let aPage = document.createElement('a');
            aPage.textContent = `${j + 1}`;
            aPage.id = `aPage${j + 1}`;
            aPage.className = 'aPages';
            if(j == 0){
                aPage.style.color = '#f9d142';
                aPage.style.pointerEvents = 'none';
            }
            divPage.appendChild(aPage);
            aPage.addEventListener('click', pageShow);
           
        }

        

        let aNext = document.createElement('a');
        aNext.textContent = '다음';
        aNext.id = 'aNext';
        aNext.addEventListener('click', nextPage);
        divPage.appendChild(aNext);

        aPrev.addEventListener('mouseover', function(){
            this.style.color = 'crimson';
        });
        aPrev.addEventListener('mouseout', function(){
            this.style.color = 'white';
        });
        aNext.addEventListener('mouseover', function(){
            this.style.color = 'crimson';
        });
        aNext.addEventListener('mouseout', function(){
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

function drawMovies(i){
    let movieDiv = document.querySelector('#previewDiv_C');
    let movie = document.querySelector('#iframe');
    let exit = document.querySelector('#exit');
    let poster = document.createElement('img');
    let div = document.createElement('div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('h4');

    div.className = `movies${i} movies`;
    poster.className = 'poster';
    
    p1.innerHTML = sortedJsonArray[i].title;
    p2.innerHTML = sortedJsonArray[i].genre;
    p3.innerHTML = sortedJsonArray[i].open;
    p4.innerHTML = sortedJsonArray[i].preview;
    poster.src = "./img/" + sortedJsonArray[i].img;
    
    movieContainer_C.appendChild(div);
    document.querySelector(`.movies${i}`).appendChild(poster);
    document.querySelector(`.movies${i}`).appendChild(p1);
    document.querySelector(`.movies${i}`).appendChild(p2);
    document.querySelector(`.movies${i}`).appendChild(p3);
    document.querySelector(`.movies${i}`).appendChild(p4);
    
    div.addEventListener('click' , function(){
        console.log(p4.textContent);
        movieDiv.style.display = 'block';
        
        movieDiv.style.top = this.offsetTop + (this.offsetHeight / 2) + 'px';
        movieDiv.style.left = this.offsetLeft + 'px';
        movie.src = p4.textContent;
    });

    exit.addEventListener('click' , function(){
        movieDiv.style.display = 'none';
        movie.src = '';
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
    let aNext = document.getElementById('aNext');
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
    let aPrev = document.getElementById('aPrev');
    aPrev.style.opacity = '1';
    aPrev.style.pointerEvents = 'auto';


}

function pageShow() {
    currentPageNum = parseInt(this.textContent);
    
    currentPageShow();
    
    let aPrev = document.getElementById('aPrev');
    let aNext = document.getElementById('aNext');
    
    
    if(currentPageNum == sortedJsonArrayCount){
        aNext.style.opacity = '0';
        aNext.style.pointerEvents = 'none';
    }
    else{
        aNext.style.opacity = '1';
        aNext.style.pointerEvents = 'auto';
    }
    if(currentPageNum == 1){
        aPrev.style.opacity = '0';
        aPrev.style.pointerEvents = 'none';
    }
    else{
        aPrev.style.opacity = '1';
        aPrev.style.pointerEvents = 'auto';
    }
    doAjax2();
}

function currentPageShow(){
    let aPages = document.querySelectorAll('.aPages');
    let aPageSelect = document.getElementById(`aPage${currentPageNum}`);
    
    for(item of aPages){
        item.style.color = 'white';
        item.style.pointerEvents = 'auto';
    }
    
    aPageSelect.style.color = '#f9d142';
    aPageSelect.style.pointerEvents = 'none';
}

function doAjax2() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './json/movielist2.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

            let divs = document.querySelectorAll('.movies');
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






