const render = player.render
const getIndex = player.getIndex
let curIndex = 0;
let length;
const audio = player.audio;
let timer;
let deg = 0;
let res;
const renderLrc = player.renderLrc
const renderTime = player.renderTime;
const renderList = player.renderList;
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success(result) {
            res = result;
            renderLrc(res[curIndex])
            length = res.length;
            renderList.renderMusicList(res,curIndex);
            render(res[curIndex])
            audio.load(res[curIndex].audio)
            bindEvent(res);
            renderTime.renderInitTime(0,res[curIndex].duration)
        },
        error() {
            console.log('error')
        }
    })
}
getData('../mock/data.json')

function bindEvent(data) {
    renderTime.spotDraw();
    var lis = document.getElementsByTagName('li');
    for(let i=0;i<lis.length;i++){
        lis[i].addEventListener('click',function(e){
            curIndex = this.dataset.num;
            util(data,curIndex)
            $('.list-wrap .selected').removeClass('selected')
            $(this).addClass('selected')
            $('.play').addClass('pause')
        },false)
    }
    $('.like').on('click',function(){
        $('.like')[0].classList.toggle('liking')
        data[curIndex].isLike = !data[curIndex].isLike;
    })
    $('.prev').on('click', function () {
        curIndex = getIndex(-1,length)
        util(data,curIndex)
        $('.play').addClass('pause')
    })
    $('.next').on('click', function () {
        curIndex = getIndex(1,length)
        util(data,curIndex)
        $('.play').addClass('pause')
    })
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            renderTime.changeTime();
            $('.play').addClass('pause')
            rotate()
        } else {
            renderTime.stopTime();
            audio.pause();
            $('.play').removeClass('pause')
            clearInterval(timer)
        }

    })
    $('.list .close').on('click',function(e){
        e.stopPropagation();
        $('.list').removeClass('active')
    })
    $('.list').on('click',function(){
        $('.list').addClass('active')
        const tilHeight = $('.music-list .title').offset().height;
        const topWrap = $('.list-wrap').offset().top;
        const liTop = $('.list-wrap .selected').offset().top;
        const disX = liTop - (tilHeight + topWrap)
        $('.list-wrap').scrollTop(disX);
    })
}
function rotate() {
    timer = setInterval(() => {
        deg++;
        $('.music-img').css({
            transform: `rotate(${deg}deg)`,
            transition: 'all .5s'
        })
    }, 100)
}

function util(data) {
    $('.music-info ul').css({
        transition: 'none',
        marginTop:'0'
    })
    $('.list-wrap .selected').removeClass('selected')
    $('.list-wrap li').eq(curIndex).addClass('selected')
    renderLrc(res[curIndex])
    renderTime.renderInitTime(0,res[curIndex].duration)
    renderTime.changeTime()
    render(data[curIndex])
    audio.load(data[curIndex].audio)
    audio.play();
    clearInterval(timer)
    deg = 0;
    $('.music-img').css({
        transform: `rotate(${deg}deg)`,
        transition: 'none'
    })
    rotate()
}

