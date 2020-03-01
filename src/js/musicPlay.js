(function($,root){
    function MusicPlay(){
        this.audio = new Audio();
        this.status = 'pause'
    } 
    MusicPlay.prototype.play = function(){
        this.audio.play().then(() => {
            console.log(1)
        }).catch(()=> {
            console.log(2)
        })
        this.status = 'play';
    }
    MusicPlay.prototype.pause = function(){
        this.audio.pause();
        this.status = 'pause'
    }
    MusicPlay.prototype.load = function(src){
        this.audio.src = src;
        this.audio.load();
    }
    MusicPlay.prototype.playTo = function(time){
        this.audio.currentTime = time
    }
    root.audio = new MusicPlay();
})(Zepto,window.player || (window.player = {}))