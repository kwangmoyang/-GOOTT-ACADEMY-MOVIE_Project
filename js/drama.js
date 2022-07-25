let dramaImgDiv_K = document.querySelector('.dramaImgDiv_K');
let firstdrama = dramaImgDiv_K.firstElementChild.cloneNode(true);
dramaImgDiv_K.appendChild(firstdrama);

// JS 이용해서 첫번째구역 마지막에 추가는 되었으나
// 슬라이드 함수 작동안됨... 

function dramaSlide() {

    let dramaIndex = 0;
    setInterval(function () {

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

    }, 3 * 1000);
}

dramaSlide();