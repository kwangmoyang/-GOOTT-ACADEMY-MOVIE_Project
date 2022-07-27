let profile_C = document.getElementById('profile_C');
let userDiv_C = document.getElementById('userDiv_C');
let qna_P = document.getElementById('qna_P');
let sicon_P = document.querySelector('#sicon_P');
let search_P = document.querySelector('.search_P');

search_P.style.width = '0%';
userDiv_C.style.display = 'none';


sicon_P.addEventListener('click' , function(){
    
    if(search_P.style.width == '0%')
        search_P.style.width = '100%';
    else
        search_P.style.width = '0%';
});

qna_P.addEventListener('click' , function(){
    location.href = './helper.html';
});
profile_C.addEventListener('click' , function(){
    if(userDiv_C.style.display == 'none')
        userDiv_C.style.display = 'block';
    else
        userDiv_C.style.display = 'none';
});


//아이콘 클릭 시 드롭다운
function dp_menu(){
    let click = document.getElementById("drop-content_P");
    if(click.style.display === "none"){
        click.style.display = "block";

    }else{
        click.style.display = "none";
        userDiv_C.style.display = 'none';
    }
}

