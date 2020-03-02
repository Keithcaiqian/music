(function($,root){
    var curIndex = 0;
    function getIndex(num,length){
        curIndex = curIndex + num;
        if(curIndex<0){
            curIndex = length-1;
        }else{
            curIndex = curIndex % length;
        }
        return curIndex
    }
    root.getIndex = getIndex;

})(Zepto,window.player || (window.player = {}))