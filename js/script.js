function start(){
    var queue;
    var stage;

    function init(){
        stage = new createjs.Stage(document.getElementById('canvas'));
    }	
    
    init();
}

window.addEventListener('load', start, false);