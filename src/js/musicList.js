(function ($, root) {
    function renderMusicList(data,curIndex) {
        var str = '';
        for (let i = 0; i < data.length; i++) {
            str += `<li data-num='${i}' class="${i==curIndex?'selected':''}">
                    <span class="song">${data[i].song}</span>
                    -
                    <span class="singer">${data[i].singer}</span>
                    </li>`
        }
        $('.music-list .list-wrap').append(str)
    }
    root.renderList = {
        renderMusicList
    }
})(Zepto, window.player || (window.player = {}))