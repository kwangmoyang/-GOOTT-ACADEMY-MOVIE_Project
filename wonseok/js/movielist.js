let genreSelect_C = document.getElementById('genreSelect_C');
let yearSelect_C = document.getElementById('yearSelect_C');
const btnSelect_C = document.getElementById('btnSelect_C');
let movieContainer_C = document.getElementById('movieContainer_C');


let genreSelectText;
let yearSelectText;

/*jsonArray 에서 정렬된 객체 배열*/

function doAjax(){
    let xhr = new XMLHttpRequest();
    
    let jsonArray = [];
    let sortedJsonArray = [];
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            
        let returnJson = JSON.parse(xhr.response);
        
        for(let i = 0; i < returnJson.length; i++){
            let obj = new Object();
            obj.genre = returnJson[i].genre.toLowerCase();
            obj.title = returnJson[i].title;
            obj.open = returnJson[i].open;
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
        for(let i = 0; i < divs.length; i++){
            console.log('지우는중');
            divs[i].remove();
        }
    
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
        else if(genreSelectText == 'animated'){
            
            let pattern = /animated/g;
            
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
            for(let i = 0; i < sortedJsonArray.length; i++){

                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies${i} movies`;
               
                h1.innerHTML = sortedJsonArray[i].title;
                h2.innerHTML = sortedJsonArray[i].genre;
                h3.innerHTML = sortedJsonArray[i].open;
                
                movieContainer_C.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
            }
        }

        }
    }

    xhr.open('get','./json/movielist.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

btnSelect_C.addEventListener('click' , function(){
    doAjax();
});




