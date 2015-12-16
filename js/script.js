function start(){
    var queue;
    var stage;
    var assets = [];
    var parachuter;
    var movement_x;
    var movement_y;
    
    var delta_movement_x = 0;
    var delta_movement_y = 0;
    
    function preload(){
        queue = new createjs.LoadQueue();
        queue.addEventListener('complete', init);
        queue.loadManifest([
            {id: 'cloud_1' , src: '../assets/sprite-sheet-01.png'},
            {id: 'cloud_2' , src: '../assets/sprite-sheet-02.png'},
            {id: 'thunder_cloud' , src: '../assets/sprite-sheet-03.png'},
            {id: 'coin' , src: '../assets/sprite-sheet-04.png'},
            {id: 'zeppelin_left' , src: '../assets/sprite-sheet-05.png'},
            {id: 'plattform' , src: '../assets/sprite-sheet-06.png'},
            {id: 'zeppelin_right' , src: '../assets/sprite-sheet-07.png'},
            {id: 'parachuter' , src: '../assets/sprite-sheet-08.png'},
            {id: 'plane' , src: '../assets/sprite-sheet-09.png'},
        ]);
    }
    
    function drawAsset(x, y, scale_x, scale_y, preload_id){
        //var asset = new createjs.Bitmap(queue.getResult(preload_id));
        /*asset.scaleX = scale_x;
        asset.scaleY = scale_y;
        asset.x = x;
        asset.y = y;
        assets.push(asset);*/
        var asset = new createjs.Shape();
        asset.graphics
		  .beginFill('red')
		  .drawRect(x, y, 50, 50);
        assets.push(asset);
        stage.addChild(asset);
        stage.update();
    }
    
    function drawParachuter(x, y, scale_x, scale_y){
       // var asset = new createjs.Bitmap(queue.getResult('parachuter'));
        var asset = new createjs.Shape();
        asset.graphics
            .beginFill('yellow')
            .drawRect(x,y, 20, 20);
        asset.scaleX = scale_x;
        asset.scaleY = scale_y;
        asset.x = x;
        asset.y = y;
        parachuter = asset;
        stage.addChild(asset);
        stage.update();
        
    }
    
     function calculateVector(x, y){
        var time_x;
        var time_y;
        
        time_x = x * 0.1;
        time_y = y * 0.1;
        
        return {
            time_x: time_x,
            time_y: time_y
        };
    }
    
    function moveParachuter(target_x, target_y){
        var vector_times = calculateVector(movement_x, movement_y);
        if(parachuter.x < 800){
            parachuter.x += vector_times.time_x + delta_movement_x;
        }
        
        if(parachuter.y < 500){
            parachuter.y += vector_times.time_y + delta_movement_y;
        }
    }
    
    function movementParachuter(e){
        switch(e.keyCode){
            case 37:
                delta_movement_x = -0.2;
            break;
            case 38:
                delta_movement_y = -0.1;
            break;
            case 39:
                delta_movement_x = 0.2;
            break;
            case 40:
                delta_movement_y = 0.1;
            break;
        }
    }
    
    function init(){
        stage = new createjs.Stage(document.getElementById('canvas'));
        drawAsset(50,100,0.5,0.5,'cloud_1');
        drawAsset(200,100,0.5,0.5,'cloud_2');
        drawAsset(300,200,0.5,0.5,'thunder_cloud');
        drawAsset(100,200,0.5,0.5,'coin');
        drawAsset(300,300,0.5,0.5,'coin');
        drawAsset(500,300,0.5,0.5,'coin');
        drawAsset(600,800,0.5,0.5,'plattform');
        
        drawParachuter(20,20,1,1);
       // var x = createTicker
        
        for(var i = 0; i < assets.length; i++){
            var time = 10000 * (Math.random() + 1);
            createjs.Tween.get(assets[i], {loop: true})
                .to({x:500}, time, createjs.Ease.getPowInOut(2))
                .to({x:0}, time, createjs.Ease.getPowInOut(2));
            
        }
        
        movement_x = 2;
        movement_y = 2;
        moveParachuter(800, 500);
        
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', stage);
        createjs.Ticker.addEventListener('tick', moveParachuter);
        window.addEventListener('keydown', movementParachuter);
    }	
    
    preload();
}

window.addEventListener('load', start, false);