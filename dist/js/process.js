(function ($, root) {
    var startTime;
    var allTime;
    var per;
    var timer;
    function renderInitTime(curTime, totalTime) {
        startTime = curTime;
        allTime = totalTime;
        var time = calTime(allTime);
        var curTime = calTime(startTime)
        $('.allTime').html(time)
        $('.curTime').html(curTime)
        $('.top').css({
            width: 0
        })
    }
    function calTime(allTime) {
        var min = Math.floor(allTime / 60);
        var seconds = allTime % 60;
        min = min >= 10 ? min : '0' + min;
        seconds = seconds >= 10 ? seconds : '0' + seconds;
        return min + ':' + seconds;
    }
    function changeTime() {
        clearInterval(timer)
        timer = setInterval(() => {
            startTime++;
            if (startTime >= allTime) {
                clearInterval(timer)
                $('.play').trigger('click')
            }
            var curTime = calTime(startTime);
            per = startTime / allTime * 100;
            $('.top').css({
                width: `${per}%`
            })
            $('.curTime').html(curTime)
        }, 1000)
    }
    function stopTime() {
        clearInterval(timer);
    }
    function spotDraw() {
        var offset = $('.process').offset();
        var width = offset.width;
        var left = offset.left;
        $('.spot').on('touchstart', function (e) {
            stopTime();
            $(".spot").addClass('change')
        }).on('touchmove', function (e) {
            var x = e.changedTouches[0].clientX;
            var per = (x - left) / width;
            if (per < 0) {
                per = 0;
            } else if (per > 1) {
                per = 1
            }
            startTime = Math.round(per * allTime);
            renderInitTime(startTime, allTime)
            $('.top').css({
                width: `${per * 100}%`
            })

        }).on('touchend',function(e){
           root.audio.playTo(startTime);
           if(root.audio.status == 'play'){
             changeTime();
           }
           $(".spot").removeClass('change')
        })
        $(".process").on('click',function(e){
            var disX = e.clientX - left;
            var per = disX / width;
            startTime = Math.round(per * allTime);
            renderInitTime(startTime, allTime)
            $('.top').css({
                width: `${per * 100}%`
            })
            root.audio.playTo(startTime);
           if(root.audio.status == 'play'){
             changeTime();
           }
        })
    }
    root.renderTime = {
        renderInitTime,
        changeTime,
        stopTime,
        spotDraw,
    }
})(Zepto, window.player || (window.player = {}))