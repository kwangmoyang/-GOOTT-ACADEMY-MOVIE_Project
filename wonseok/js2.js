let select = document.getElementById('select');
const btn = document.getElementById('btn');
let movieContainer = document.getElementById('movieContainer');


let selectText;



function doAjax(){
    let xhr = new XMLHttpRequest();

    let jsonArray = [];
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            
        let returnJson = JSON.parse(xhr.response);
        
        for(let i = 0; i < returnJson.length; i++){
            let obj = new Object();
            obj.title = returnJson[i].title;
            obj.genre = returnJson[i].genre.toLowerCase();
            obj.year = returnJson[i].year;
            jsonArray.push(obj);
            
        }

        selectText = select.value;
        selectText = selectText.toLowerCase();
    
        
        
        
       
        
        let divs = document.querySelectorAll('.movies');
        for(let i = 0; i < divs.length; i++){
            divs[i].remove();
        }
    
        if(selectText == 'all'){
            for(let i = 0; i < jsonArray.length; i++){
               
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies${i} movies`;
               
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'action'){
            let pattern = /action/g;
            // console.log(pattern.test('melody/comedy'));
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'comedy'){
            let pattern = /comedy/g;
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'thriller'){
            let pattern = /thriller/g;
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'horror'){
            let pattern = /horror/g;
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'adventure'){
            let pattern = /adventure/g;
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'animated'){
            let pattern = /animated/g;
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'crime'){
            let pattern = /crime/g;
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else if(selectText == 'sci-fi'){
            let pattern = /sci-fi/g;
            for(let i = 0; i < jsonArray.length; i++){
                if(!pattern.test(jsonArray[i].genre)){
                    continue;
                }
                let div = document.createElement('div');
                let h1 = document.createElement('h1');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                
                div.className = `movies movies${i}`;
                h1.innerHTML = jsonArray[i].title;
                h2.innerHTML = jsonArray[i].genre;
                h3.innerHTML = jsonArray[i].year;
                
                movieContainer.appendChild(div);
                document.querySelector(`.movies${i}`).appendChild(h1);
                document.querySelector(`.movies${i}`).appendChild(h2);
                document.querySelector(`.movies${i}`).appendChild(h3);
                
                
            }
        }
        else{
            alert('오류');
        }


        

        }
    }

    xhr.open('get','test2.json');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

btn.addEventListener('click' , function(){
    
   
    doAjax();
    
  
});




