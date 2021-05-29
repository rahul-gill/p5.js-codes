let nPoints=2500,r1=1000,r2=10;
function setup(){
    createCanvas(1366,768);
    frameRate(30);
    noLoop();
}
let tempp = 0;
function draw(){
    if(r2 >800){
        tempp = 1;
    }
    if(r2>0 && tempp === 1){r2--;}
    if(tempp === 1 && r2===0){tempp = 0;}
    if(tempp === 0){ r2++; }
    background(0);
    
    fill(255,255,200);
    stroke(255,255,0);
    push();
    translate(500,300);
    rotate(frameCount/20.0);
    star(0,0,r1,r2,nPoints);
    pop();
}


function star(x,y,r1,r2,nPoints){
    let angle = TWO_PI/nPoints;
    let halfAngle = angle/2;
    beginShape();
    for(let i=0;i<TWO_PI;i += angle){
        let verX = x + r1*cos(i);
        let verY = y + r1*sin(i);
        vertex(verX,verY);
        verX = x + r2*cos(i+halfAngle);
        verY = y + r2*sin(i+halfAngle);
        vertex(verX,verY);
    }
    vertex(x+r1,y);
    endShape();
}

function mousePressed(){
    loop();
}