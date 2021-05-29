function setup(){
    createCanvas(1200,1200);
}
function draw(){
    background(0);
    fill(255);
    stroke(255);
    atPos(0,height/2,9);
}

function atPos(x,y,depth){
    if(depth <= 0){return;}
    /**             .D
     *              |
     *              |
     *      A.______.B
     *              |
     *              |
     *              .C
     */
    const vertHeight = vertHeights(depth);
    const pointAx = x, pointAy = y;
    const pointBx = x+(depth*25), pointBy = y;
    const pointCx = x+(depth*25), pointCy = y + vertHeight/2;
    const pointDx = x+(depth*25), pointDy = y - vertHeight/2;
    line(pointAx, pointAy,pointBx,pointBy);
    line(pointCx,pointCy,pointDx,pointDy);
    atPos(pointCx,pointCy,depth-1);
    atPos(pointDx,pointDy,depth-1);
}

function vertHeights(depth){
    if(depth === 0) { return 0;}
    if(depth === 1) { return 1;}
    return 2*vertHeights(depth-1) + 1;
}
