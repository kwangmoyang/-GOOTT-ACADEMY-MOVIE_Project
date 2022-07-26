let dramaImgDiv_K = document.querySelector('.dramaImgDiv_K');
let firstdrama = dramaImgDiv_K.firstElementChild.cloneNode(true);
dramaImgDiv_K.appendChild(firstdrama);
let dramaIndex = 0; //초기화
let slideStop = document.querySelector('.dramaImgDiv_K'); 
let tempDramaIndex; //임시변수
let start; //인터벌 변수

function dramaSlide() {

    start = setInterval(function () {

        dramaImgDiv_K.style.transition = '0.5s';
        dramaImgDiv_K.style.transform = `translateX(${-(100 / 8) * (dramaIndex + 1)}%)`;

        dramaIndex++;

        if (dramaIndex == 7) {
            setTimeout(function () {
                dramaImgDiv_K.style.transition = '0s';
                dramaImgDiv_K.style.transform = 'translateX(0)';
            }, 501)
            dramaIndex = 0;
        }

    }, 4 * 1000);
    
   
}
dramaSlide();

slideStop.addEventListener('mouseenter',function(){
    // for(i=0; i.length < slideStop; i++);
    
    console.log('오버');
    tempDramaIndex = dramaIndex;
    clearInterval(start);
});

slideStop.addEventListener('mouseleave',function(){
    // for(i=0; i.length < slideStop; i++);
  

       dramaIndex = tempDramaIndex;
        start = setInterval(function () {
    
            dramaImgDiv_K.style.transition = '0.5s';
            dramaImgDiv_K.style.transform = `translateX(${-(100 / 8) * (dramaIndex + 1)}%)`;
    
            dramaIndex++;
    
            if (dramaIndex == 7) {
                setTimeout(function () {
                    dramaImgDiv_K.style.transition = '0s';
                    dramaImgDiv_K.style.transform = 'translateX(0)';
                }, 501)
                dramaIndex = 0;
            }
    
        }, 4 * 1000);
        console.dir('아웃');
        
    });

// 화면에 마우스 올렸을때 멈추는거까진 작동했으나
// 마우스 떼면 전에꺼로 돌아감 프로퍼티 추적해서 수정예정 

// console.log(slideStop);



