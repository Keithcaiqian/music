(function ($, root) {
    function renderImg(src) {
        const img = new Image();
        img.src = src;
        img.onload = function(){
            $('.music-img img').attr('src',src);
            root.blurImg(img,$('body'))
        }

    }
    function renderIslike(data){
        if(data){
            $('.like').addClass('liking')
        }else{
            $('.like').removeClass('liking')
        }
    }
    root.render = function (data) {
        renderImg(data.image);
        renderIslike(data.isLike)
    }
})(Zepto, window.player || (window.player = {}))