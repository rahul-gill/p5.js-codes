var s;
var resDeclare=false
var gameLoop=false


function setup(){
    createCanvas(600,500);
    s = new Snake();
    frameRate(15);
    
    //initial food properties
    foodx=floor(random(width)/s.scl)*s.scl;
    foody=floor(random(height)/s.scl)*s.scl;

    //game control
    button = createButton('Start');
    button.position(19, 520);
    button.mousePressed(gameControl0);

    button = createButton('Pause');
    button.position(70, 520);
    button.mousePressed(gameControl1);

    button = createButton('Stop');
    button.position(129, 520);
    button.mousePressed(gameControl2);
}

function draw(){
    background(0);
    
    
    //snake drawing and movement
    s.show();if(gameLoop){
    s.move(s.dirx,s.diry);}
    
    //food drawing
    fill(255,0,255);
    rect(foodx,foody,s.scl);

    //when food is eaten
    if(eaten()){
        foodx=floor(random(width)/s.scl)*s.scl;
        foody=floor(random(height)/s.scl)*s.scl;
        
        if(s.dirx==1 && s.diry==0){s.guys.unshift([     s.guys[0][0]+s.scl,s.guys[0][1]     ])}
        else if(s.dirx==-1 && s.diry==0){s.guys.unshift([   s.guys[0][0]-s.scl,s.guys[0][1] ])}
        else if(s.dirx==0 && s.diry==1){s.guys.unshift([    s.guys[0][0],s.guys[0][1]+s.scl     ])}
        else if(s.dirx==0 && s.diry==-1){s.guys.unshift([   s.guys[0][0],s.guys[0][1]-s.scl     ])}

    
        
    }
    //Results
    result()
    if(resDeclare){
        s.guys=[[0,0]]
        
        gameLoop=false
        resDeclare=false}
}

function eaten(){
    //checks if snake has eaten the current food
    if (s.guys[0][0]==foodx && s.guys[0][1]==foody){return true}
    else{return false}
}

function keyPressed(){
    //Key Event listner
    if(keyCode === UP_ARROW && s.diry!=1){s.diry=-1;s.dirx=0}
    else if(keyCode === DOWN_ARROW && s.diry!=-1){s.diry=1;s.dirx=0}
    else if(keyCode === LEFT_ARROW && s.dirx!=1){s.dirx=-1;s.diry=0}
    else if(keyCode === RIGHT_ARROW && s.dirx!=-1){s.dirx=1;s.diry=0}
}

function result(){
    //checks if snake crashed himself
    for(i=1;i<s.guys.length;i++){
        if(s.guys[i][0] == s.guys[0][0] && s.guys[i][1] == s.guys[0][1]){var c = true}}
    //checks if snake hit the bounday   
    a=s.guys[0][0]<0 ||  s.guys[0][0]>width-s.scl 
    b=s.guys[0][1]<0 ||  s.guys[0][1]>height-s.scl 
    if(a || b || c ){resDeclare=true}
    else{resDeclare=false}
    
}

function gameControl0(){
    if(!gameLoop){
        s.dirx=1;
        s.diry=0;
    }
    gameLoop=true; 
}
function gameControl1(){
    gameLoop=false;
}
function gameControl2(){
    s.guys=[[0,0]];
    gameLoop=false;
    foodx=floor(random(width)/s.scl)*s.scl;
    foody=floor(random(height)/s.scl)*s.scl;
}
