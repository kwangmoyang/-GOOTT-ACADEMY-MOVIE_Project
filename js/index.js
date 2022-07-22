// 화살표 버튼 애니메이션
let section = document.querySelectorAll('.section_Y');
let scrollBtn = document.querySelectorAll('.uil-arrow-circle-down_Y');

// 각 섹션 위치 변수저장
let firstTop = section[0].offsetTop;
let secondTop = section[1].offsetTop;
let thirdTop = section[2].offsetTop;
let fourTop = section[3].offsetTop;

// 헤더 불러옴
let menu = document.querySelector('.header_Y');
let scrollTop = window.scrollY;

// 라이트바 애니메이션
let right = document.querySelector('#rightBar_Y').children;
console.log(right[0]);

// 스크롤 애니메이션
let flag = false;
window.addEventListener('scroll', function () {
    scrollTop = window.scrollY;
    
    if (scrollTop > 6) {
        menu.style.background = 'var(--bg-color)';
    } else {
        menu.style.background = 'transparent';
    }
});



right[0].addEventListener('click',function(){
    window.scroll({ top: firstTop, behavior: 'smooth' });
    color(0,1,2,3);
})
right[1].addEventListener('click',function(){
    window.scroll({ top: secondTop, behavior: 'smooth' });
    color(1,0,2,3);
})
right[2].addEventListener('click',function(){
    window.scroll({ top: thirdTop, behavior: 'smooth' });
    color(2,0,1,3);
})
right[3].addEventListener('click',function(){
    window.scroll({ top: fourTop, behavior: 'smooth' });
    color(3,0,1,2);
})
//윈도우 리사이즈 되면 섹션들 위치 다시 계산
window.addEventListener('resize' , function(){

    scrollTop = window.scrollY;

    firstTop = section[0].offsetTop;
    secondTop = section[1].offsetTop;
    thirdTop = section[2].offsetTop;
    fourTop = section[3].offsetTop;
    console.log(firstTop , secondTop , thirdTop , fourTop);  
})

scrollBtn[0].onclick = function () {
    window.scroll({ top: secondTop, behavior: 'smooth' });
    color(1,0,2,3);
}
scrollBtn[1].onclick = function () {
    window.scroll({ top: thirdTop, behavior: 'smooth' });
    color(2,0,1,3);
}
scrollBtn[2].onclick = function () {
    window.scroll({ top: fourTop, behavior: 'smooth' });
    color(3,0,1,2);
}
scrollBtn[3].onclick = function () {
    window.scroll({ top: firstTop, behavior: 'smooth' });
    color(0,1,2,3);
}



// right bar BOX 이펙트 함수
function color(effect,ele,ele2,ele3){
    right[effect].style.background='var(--bg-color)';
    right[effect].style.transition='.5s';
    right[ele].style.background='var(--bg2-color)';
    right[ele2].style.background='var(--bg2-color)';
    right[ele3].style.background='var(--bg2-color)';
}

