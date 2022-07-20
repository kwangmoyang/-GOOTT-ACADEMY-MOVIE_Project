// 헤더 불러옴
var menu = document.querySelector('.header_Y');
var scrollTop = window.scrollY || document.documentElement.scrollTop;

// 스크롤 애니메이션
var flag = false;
window.addEventListener('scroll', function () {
    scrollTop = window.scrollY;
    console.log('gd');
    if (scrollTop > 6) {
        menu.style.background = 'var(--bg-color)';
    } else {
        menu.style.background = 'transparent';
    }
});

// 라이트바 애니메이션
var right = document.querySelector('#rightBar_Y').children;
console.log(right[0]);

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

// 화살표 버튼 애니메이션
var section = document.querySelectorAll('.section_Y');
var scrollBtn = document.querySelectorAll('.uil-arrow-circle-down_Y');
console.log(scrollBtn[0]);
console.log(section[0]);

// 각 섹션 위치 변수저장
const firstTop = section[0].offsetTop;
const secondTop = section[1].offsetTop;
const thirdTop = section[2].offsetTop;
const fourTop = section[3].offsetTop;


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
