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

    }, 2.5 * 1000);
}
dramaSlide();


// 마우스 올렸을때 영역 정지

slideStop.addEventListener('mouseenter',function(){ // mouseover
    // mouseover는 직접 이벤트를 걸지않은 자식요소에 마우스 포인터가 와도 발생
    // mouseenter는 오로지 자기 자신에게 마우스 포인터가 와야만 발생
    // for(i=0; i.length < slideStop; i++);
    // console.log('오버');
    tempDramaIndex = dramaIndex;
    clearInterval(start);
});

// 마우스 떼었을때 영역 재실행

slideStop.addEventListener('mouseleave',function(){ // mouseout
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
    
        }, 2.5 * 1000);
        // console.dir('아웃');

});

// 22.07.25 코드 수정