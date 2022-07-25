let dramaImgDiv_K = document.querySelector('.dramaImgDiv_K');
let firstdrama = dramaImgDiv_K.firstElementChild.cloneNode(true);
dramaImgDiv_K.appendChild(firstdrama);


function dramaSlide() {

    let dramaIndex = 0;
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

// 화면에 마우스 올렸을때 멈추는거까진 작동했으나
// 마우스 떼면 전에꺼로 돌아감 프로퍼티 추적해서 수정예정 

let slideStop = document.querySelector('.dramaImgDiv_K'); 
// console.log(slideStop);

slideStop.addEventListener('mouseover',function(){
    // for(i=0; i.length < slideStop; i++);
    console.log('오버');
    clearInterval(start);
});

// slideStop.addEventListener('mouseout',function(){
//     // for(i=0; i.length < slideStop; i++);
//     setInterval(dramaSlide());
//     console.dir('아웃');
// });

