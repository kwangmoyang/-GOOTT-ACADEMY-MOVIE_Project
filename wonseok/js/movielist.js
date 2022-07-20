let genreSelect_C = document.getElementById('genreSelect_C');
let yearSelect_C = document.getElementById('yearSelect_C');
const btnSelect_C = document.getElementById('btnSelect_C');
let movieContainer_C = document.getElementById('movieContainer_C');
let pageBtnContainer_C = document.getElementById('pageBtnContainer_C');


let genreSelectText;
let yearSelectText;
let sortedJsonArrayCount = 0;
let pageStartCount = 0;
let pageEndCount = 0;
/*jsonArray 에서 정렬된 객체 배열*/
let sortedJsonArray = [];

function doAjax(){
    console.clear();
    let xhr = new XMLHttpRequest();
    
    let jsonArray = [];
    sortedJsonArray = [];
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            
        let returnJson = JSON.parse(xhr.response);
        
        for(let i = 0; i < returnJson.length; i++){
            let obj = new Object();
            obj.genre = returnJson[i].genre.toLowerCase();
            obj.title = returnJson[i].title;
            // obj.open = returnJson[i].open;
            let year_ = returnJson[i].open;
            let year = year_.split('-',1);
            // year = parseInt(year);
            // console.log(year);
            obj.open = year;
            obj.grade = returnJson[i].grade;
            obj.img = returnJson[i].img;
            obj.story = returnJson[i].story;
            obj.preivew = returnJson[i].preivew;
            jsonArray.push(obj);
        }

        genreSelectText = genreSelect_C.value;
        genreSelectText = genreSelectText.toLowerCase();
        yearSelectText = yearSelect_C.value;
        
        // console.log(jsonArray);
       
        let divs = document.querySelectorAll('.movies');
        let divs2 = document.querySelector('#divPage');
        for(let i = 0; i < divs.length; i++){
            // console.log('지우는중');
            divs[i].remove();
        }
        if(divs2)
            divs2.remove();
        
        
    
        if(genreSelectText == 'all'){
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    sortedJsonArray.push(jsonArray[i]);
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(jsonArray[i].open != 2022)
                        continue;
                    sortedJsonArray.push(jsonArray[i]);
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(jsonArray[i].open < 2020 || jsonArray[i].open > 2021)
                        continue;
                    sortedJsonArray.push(jsonArray[i]);
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(jsonArray[i].open < 2010 || jsonArray[i].open > 2019)
                        continue;
                    sortedJsonArray.push(jsonArray[i]);
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(jsonArray[i].open < 2000 || jsonArray[i].open > 2009)
                        continue;
                    sortedJsonArray.push(jsonArray[i]);
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(jsonArray[i].open < 1990 || jsonArray[i].open > 1999)
                        continue;
                    sortedJsonArray.push(jsonArray[i]);
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(jsonArray[i].open < 1980 || jsonArray[i].open > 1989)
                        continue;
                    sortedJsonArray.push(jsonArray[i]);
                }
            }
            else
                alert('오류');
        }
        
        else if(genreSelectText == 'action'){
            
            let pattern = /action/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else
                alert('에러');

        }
        
        else if(genreSelectText == 'comedy'){
            
            let pattern = /comedy/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else
                alert('에러');
        }
        else if(genreSelectText == 'thriller'){
            
            let pattern = /thriller/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else
                alert('에러');
        }
        else if(genreSelectText == 'horror'){
            
            let pattern = /horror/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else
                alert('에러');
        }
        else if(genreSelectText == 'adventure'){
            
            let pattern = /adventure/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
                
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else
                alert('에러');
        }
        else if(genreSelectText == 'animation'){
            
            let pattern = /animation/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else
                alert('에러');
        }
        else if(genreSelectText == 'crime'){
            
            let pattern = /crime/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else
                alert('에러');
        }
        
        else if(genreSelectText == 'sci-fi'){
            
            let pattern = /sci-fi/g;
            
            if(yearSelectText == 'all'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre))
                        sortedJsonArray.push(jsonArray[i]);
                    else
                        continue;
                }
            }
            else if(yearSelectText == 'y1'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && jsonArray[i].open == 2022)
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y2'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open == 2020 || jsonArray[i].open == 2021))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y3'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2010 && jsonArray[i].open <= 2019))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y4'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 2000 && jsonArray[i].open <= 2009))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y5'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1990 && jsonArray[i].open <= 1999))
                        sortedJsonArray.push(jsonArray[i]);
                    else    
                        continue;
                }
            }
            else if(yearSelectText == 'y6'){
                for(let i = 0; i < jsonArray.length; i++){
                    if(pattern.test(jsonArray[i].genre) && (jsonArray[i].open >= 1980 && jsonArray[i].open <= 1989))
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
        


        drawArray();

        function drawArray(){
            console.log(sortedJsonArray);
            if(sortedJsonArray.length > 10){
                pageStartCount = 0;
                pageEndCount = 10;
                pageBtnContainer_C.style.display = 'block';
                
                if(sortedJsonArray.length % 10 == 0){
                    sortedJsonArrayCount = sortedJsonArray.length / 10;
                }
                else{
                    sortedJsonArrayCount = Math.floor(sortedJsonArray.length / 10) + 1;
                }
                
                console.log(`정렬된 영화 수: ${sortedJsonArray.length}`);
                console.log(`페이지 수: ${sortedJsonArrayCount}`);
                
                let divPage = document.createElement('div');
                pageBtnContainer_C.appendChild(divPage);
                divPage.id = 'divPage';
                
                let aPrev = document.createElement('a');
                aPrev.textContent = '이전';
                divPage.appendChild(aPrev);
                
                for(let j = 0; j < sortedJsonArrayCount; j++ ){
                    let aPage = document.createElement('a');
                    aPage.textContent = `${j + 1}`;
                    divPage.appendChild(aPage);

                    aPage.addEventListener('click' , pageShow );
                }
                
                let aNext = document.createElement('a');
                aNext.textContent = '다음';
                divPage.appendChild(aNext);
            }
            
            else{
                pageStartCount = 0;
                pageEndCount = sortedJsonArray.length;
                pageBtnContainer_C.style.display = 'none';
                
                console.log(`정렬된 영화 수: ${sortedJsonArray.length}`);
            }
            
            for(let i = pageStartCount; i < pageEndCount; i++){

                let div = document.createElement('div');
                let poster = document.createElement('img');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies${i} movies`;
                poster.className = 'poster';
                
                h1.innerHTML = sortedJsonArray[i].title;
                h2.innerHTML = sortedJsonArray[i].genre;
                h3.innerHTML = sortedJsonArray[i].open;
                poster.src = "./img/" + sortedJsonArray[i].img;
                
                movieContainer_C.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(poster);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
            }

            
        }

        }
    }

    xhr.open('get','./json/movielist2.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

function pageShow(){
    let text = parseInt(this.textContent);
    

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            
            let divs = document.querySelectorAll('.movies');
            for(let i = 0; i < divs.length; i++){
                divs[i].remove();
            }

            if(text != sortedJsonArrayCount){
                pageStartCount = (text * 10) - 10;
                pageEndCount = text * 10;
                console.log(pageStartCount);
                console.log(pageEndCount);
            }
            else{
                pageStartCount = (text * 10) - 10;
                pageEndCount = sortedJsonArray.length;
            }

            for(let i = pageStartCount; i < pageEndCount; i++){

                let div = document.createElement('div');
                let poster = document.createElement('img');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies${i} movies`;
                poster.className = 'poster';
                
                h1.innerHTML = sortedJsonArray[i].title;
                h2.innerHTML = sortedJsonArray[i].genre;
                h3.innerHTML = sortedJsonArray[i].open;
                poster.src = "./img/" + sortedJsonArray[i].img;
                
                movieContainer_C.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(poster);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
            }
        }
    }
   

    xhr.open('get','./json/movielist2.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

btnSelect_C.addEventListener('click' , function(){
    doAjax();
});




