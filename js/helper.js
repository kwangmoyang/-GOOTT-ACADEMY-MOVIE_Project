let btn = document.querySelectorAll('.btn_Y');
let answer = document.querySelectorAll('.answer_Y');


// 토글 스위치 변수
let flag = false;

// 아이콘 클릭시 구현부
for(let i=0; i<btn.length; i++){
     btn[i].addEventListener('click',function(event){

        if(flag==false){
        // 드롭박스 클릭시 아이콘 회전(접으라는 표시)
        this.style.transform = 'rotate(180deg)';
        answer[i].style.display = 'block';

                
        }else if(flag==true){
        answer[i].style.display = 'none';
        this.style.transform = '';
        }
        flag = !flag;
            
    })
}