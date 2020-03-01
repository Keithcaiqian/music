(function ($, root) {
    var lrc;
    function renderLrc(res){
        lrc = res.lrc;
        lrc = lrc.replace(/\s+\[/g,"$");
        lrc = lrc.split('$')
        for(let i=0;i<lrc.length;i++){
            lrc[i] = getLrcObj(lrc[i])
        }
        var str = '';
        for(let i=0;i<lrc.length;i++){
            str += `<li>${lrc[i].content}</li>`
        }
        $('.music-info ul').html(str)
    }
    function getLrcObj(lrc){
        var lrcs = lrc.split(']');
        if(lrcs[0].includes('[')>0){
            lrcs[0] = lrcs[0].replace(/\[/,'')
        }
        var time = lrcs[0].slice(1).split(':');
        var min = +time[0] * 60;
        var seconds = +time[1];
        time = min + seconds;
        content = lrcs[1];
        var obj = {
            time,
            content
        }
        return obj;
    }
    function getIndex(){
        var time = root.audio.audio.currentTime + 0.1;
        for(let i=lrc.length-1;i>=0;i--){
            if(lrc[i].time<time){
                return i
            }
        }
        return -1;
    }
    function renderLrcWrap(){
        var disY = $(".music-info ul li").offset().height;
        var curIndex = getIndex();
        if(curIndex<0){
            curIndex = 0;
        }
        $('.music-info ul').css({
            marginTop: - disY * curIndex
        })
        $('.music-info ul li.active').removeClass('active');
        $('.music-info ul li').eq(curIndex).addClass('active');
    }
    root.audio.audio.ontimeupdate = function(){
        $('.music-info ul').css({
            transition: 'margin-top .7s',
        })
        renderLrcWrap()
    }
    root.renderLrc = renderLrc;
    root.renderLrcWrap = renderLrcWrap;
})(Zepto, window.player || (window.player = {}))