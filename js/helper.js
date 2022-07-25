let btn = document.querySelectorAll('.btn_Y');
        let answer = document.querySelectorAll('.answer_Y');
        // let line = document.querySelectorAll('hr');

        let flag = false;
        // 아이콘 클릭시 구현부
        for(let i=0; i<btn.length; i++){
            btn[i].addEventListener('click',function(event){

            if(flag==false){
                this.style.transform = 'rotate(180deg)';
                answer[i].style.display = 'block';
                // line[i].style.display = 'none';
                
            }else if(flag==true){
                answer[i].style.display = 'none';
                // line[i].style.display = 'block';
                this.style.transform = '';
            }
            flag = !flag;
            
        })
        }