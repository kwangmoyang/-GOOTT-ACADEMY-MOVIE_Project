//로고별 각각 클래스네임 이용하여 JS 링크연결 0726

let face = document.querySelector('.logoface_K');
let ins = document.querySelector('.logoins_K');
let twi = document.querySelector('.logotwi_K');
let you = document.querySelector('.logoyou_K');

face.addEventListener('click',function(){
    // URL('https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fprivacy%2Fconsent%2Fpipa%2F%3Fparams%255Bpft_surface%255D%3Dfacebook_comet%26params%255Bis_new_user_blocking_flow%255D%3Dfalse%26params%255Bpft_session_key%255D%3Dc613ad93-58eb-4d9c-985b-d8066f938185%26params%255Bis_existing_user_blocking_flow%255D%26source%3Dpipa_blocking_flow');
    window.open("https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fprivacy%2Fconsent%2Fpipa%2F%3Fparams%255Bpft_surface%255D%3Dfacebook_comet%26params%255Bis_new_user_blocking_flow%255D%3Dfalse%26params%255Bpft_session_key%255D%3Dc613ad93-58eb-4d9c-985b-d8066f938185%26params%255Bis_existing_user_blocking_flow%255D%26source%3Dpipa_blocking_flow");
});

ins.addEventListener('click',function(){
    // URL('https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fprivacy%2Fconsent%2Fpipa%2F%3Fparams%255Bpft_surface%255D%3Dfacebook_comet%26params%255Bis_new_user_blocking_flow%255D%3Dfalse%26params%255Bpft_session_key%255D%3Dc613ad93-58eb-4d9c-985b-d8066f938185%26params%255Bis_existing_user_blocking_flow%255D%26source%3Dpipa_blocking_flow');
    window.open("https://www.instagram.com/yellowbox_kr/");
});

twi.addEventListener('click',function(){
    // URL('https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fprivacy%2Fconsent%2Fpipa%2F%3Fparams%255Bpft_surface%255D%3Dfacebook_comet%26params%255Bis_new_user_blocking_flow%255D%3Dfalse%26params%255Bpft_session_key%255D%3Dc613ad93-58eb-4d9c-985b-d8066f938185%26params%255Bis_existing_user_blocking_flow%255D%26source%3Dpipa_blocking_flow');
    window.open("https://twitter.com/");
});

you.addEventListener('click',function(){
    // URL('https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fprivacy%2Fconsent%2Fpipa%2F%3Fparams%255Bpft_surface%255D%3Dfacebook_comet%26params%255Bis_new_user_blocking_flow%255D%3Dfalse%26params%255Bpft_session_key%255D%3Dc613ad93-58eb-4d9c-985b-d8066f938185%26params%255Bis_existing_user_blocking_flow%255D%26source%3Dpipa_blocking_flow');
    window.open("https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured");
});


