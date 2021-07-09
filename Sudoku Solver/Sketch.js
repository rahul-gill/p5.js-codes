let offx=10, offy=70;
let grid = [
    [8,0,0,0,0,7,4,0,0],
    [0,0,0,0,0,1,9,0,0],
    [2,7,9,0,0,0,0,0,3],
    [0,6,0,0,0,4,7,0,0],
    [7,0,0,0,0,0,0,0,9],
    [0,0,3,9,0,0,0,8,0],
    [4,0,0,0,0,0,3,6,8],
    [0,0,7,5,0,0,0,0,0],
    [0,0,2,3,0,0,0,0,7]
];
let blocked = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];
let statex =0, statey = 0, backtrack = false;
let sldr,fastmode = false;
function setup(){
    createCanvas(300,400);
    frameRate(60);
    background(0);
    sldr = createSlider(1,60,1);
    sldr.position(10,10);
    chkbox = createCheckbox("",false);
    chkbox.changed(myCheckedEvent);
    chkbox.position(10,50);

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(grid[i][j] != 0){ blocked[i][j] = 1; }
            if(grid[i][j] > 9 || grid[i][j] < 0){ console.error("Invalid Data"); }
        }
    }
}

function draw(){
    strokeWeight(1);stroke(0);
    text("<-fast mode",40,60);
    if(!fastmode){
        let val = sldr.value();
        frameRate(val);
        drawGrid();solve();
    }
    else{
        frameRate(60);
        for(let i=0;i<9;i++){
            solve();
        }
        drawGrid();
    } 
    strokeWeight(3);stroke(0);
    line(offx+90,offy,offx+90,offy+270);
    line(offx+180,offy,offx+180,offy+270);
    line(offx,offy+90,offx+270,offy+90);
    line(offx,offy+180,offx+270,offy+180);
}

function drawGrid(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){

            stroke(0);
            if(blocked[i][j]){ fill(255,255,100); }
            else{ fill(255); }
            rect(offx+i*30,offy+j*30,30,30);
            if(grid[i][j] > 0){
                fill(0);noStroke();
                textSize(20);
                text(grid[i][j],offx+i*30+7,offy+j*30+22);
            }

        }
    }
}

function rowCheck(r,c){
    for(let i=0;i<9;i++){
        if(i!=c && grid[r][i] != 0 && grid[r][i] === grid[r][c]){return i;}
    }
    return -1;    
}

function colCheck(r,c){
    for(let i=0;i<9;i++){
        if(i!=r && grid[i][c] != 0 && grid[r][c] === grid[i][c]){return i;}
    }
    return -1;    
}
function boxCheck(r,c){
    let blockx = floor(r/3), blocky = floor(c/3);
    for(let i=blockx*3; i<blockx*3+3; i++){
        for(let j=blocky*3; j<blocky*3+3; j++){
            if(i!=r && j!=c && grid[i][j] !=0 && grid[i][j] === grid[r][c]){return i+j*10;}           
        }
    }
    return -1;
}


function solve(){
    if(statex == 9 && statey == 0) return;
    if(blocked[statex][statey] === 1){
        noFill();stroke(0);strokeWeight(2);
        circle(offx+statex*30+15,offy+statey*30+15,30);
        if(!backtrack){
            if(statey<9){ statey++; }
            else if(statex<9){ statex++;statey=0;}
        }else{
            baktrack = true;;
            if(statey===0){statex--;statey=8;}
            else{statey--;}
        }
        return;
    }
    if(grid[statex][statey] <9){
        backtrack = false;
        grid[statex][statey]++;
        drawGrid();
        let rc = rowCheck(statex,statey);
        let cc = colCheck(statex,statey);
        let bc = boxCheck(statex, statey);

        noFill();stroke(0);strokeWeight(2);
        circle(offx+statex*30+15,offy+statey*30+15,30);
        stroke(255,0,0);
        if(rc != -1){
            circle(offx+statex*30+15,offy+rc*30+15,30);
        }else if(cc != -1){
            circle(offx+cc*30+15,offy+statey*30+15,30);
        }else if(bc != -1){
            circle(offx+(bc%10)*30+15,offy+floor(bc/10)*30+15,30);
        }

        if(rc === -1 && cc === -1 && bc === -1){
            if(statey<9){ statey++; }
            else if(statex<9){ statex++;statey=0; }
        }else if(grid[statex][statey] === 9){
            grid[statex][statey] = 0;
            backtrack = true;
            if(statey===0){statex--;statey=8;}
            else{statey--;}
        }
    }else if(grid[statex][statey] === 9 && !(statey==0 && statex==0)){
        grid[statex][statey] = 0;
        baktrack = true;
        if(statey===0){statex--;statey=9;}
        else{statey--;}
    }
    else{
        if(statey<9){ statey++; }
        else if(statex<9){ statex++;statey=0; }
    }

}

function myCheckedEvent(){
    if (this.checked()) {
        fastmode = true;
    }else{
        fastmode = false;
    }
}