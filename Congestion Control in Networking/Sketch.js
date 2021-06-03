let cwnd = 1;
let ssthresh = 64;
let threeACKs = false, timeout = false;
let dupACKs = 0;
let state = 0;
let t = 0;
let prevx=0,prevy=0;
let buttA, buttB;
let mss = 10,tmpCounter=0;
function setup(){
    createCanvas(1366,768);
    noLoop();
    background(0);
    buttA = createButton('recvDupACK');
    buttB = createButton('timeout');
    buttA.position(50,530);
    buttB.position(150,530);
    buttA.mousePressed(applyDupACK);
    buttB.mousePressed(applyTimeout);
}  

function draw() {
    if(dupACKs >= 3){ threeACKs = true; }

    (state == 0) ? slowStart() : (state == 1 ? CongestionAvoidance(): FastRecovery());
    fill(0);stroke(0);
    rect(240,520,170,40);
    fill(255);
    (state == 0) ? text("slow Start mode",250,545) : (state == 1 ? text("Congestion avoidance mode",250,545): text("Fast recovery",250,545));


    translate(50,500);
    fill(0);rect(-50,-500,50,500);rect(440,3,50,50);
    stroke(255);strokeWeight(1);fill(255);
    line(0,0,0,-500);text('cwnd',-30,-450);
    line(0,0,500,0);text('segments',450,17)
    line(prevx,prevy,t,-cwnd*5);
    stroke(255,0,0);strokeWeight(7);
    point(t,-cwnd*5);

    point(0,-ssthresh*5);text('ssthresh',-50,-ssthresh*5);
    
    prevx = t;prevy = -cwnd*5;
    t += 20;
}

function slowStart(){
    if(!threeACKs && !timeout){
        if(cwnd < ssthresh){
            cwnd *= 2;
        }else{
            state = 1;
            cwnd++;
        }
    }else if(threeACKs){
        state = 2;
        ssthresh = cwnd/2;
        cwnd =ssthresh + 3;
    }else{
        ssthresh = cwnd/2;
        cwnd = 1;
        threeACKs = false;timeout = false;
    }
}

function CongestionAvoidance(){
    if(!threeACKs && !timeout){
        tmpCounter++;
        if(tmpCounter >= cwnd/mss){
            tmpCounter = 0;
            cwnd++;
        }
    }else if(timeout){
        ssthresh = cwnd/2;
        cwnd = 1;
        state = 0;
        threeACKs = false;timeout = false;
    }else{
        cwnd = ssthresh;
        threeACKs = false;timeout = false;
        dupACKs = 0;
    }
}

function FastRecovery(){
    if(!threeACKs && !timeout){
        cwnd++;
        
        state = 1;
    }
    else if(timeout){
        ssthresh = cwnd/2;
        cwnd = 1;
        state = 0;
    }
    else{
        cwnd++;
        dupACKs = 0;
    }
    threeACKs = false;timeout = false;
}

function mousePressed(){
    redraw();
}

function applyDupACK(){ dupACKs++; }
function applyTimeout(){ timeout = true; }
/**
 * events:  three ACKs
 *          timeout
 * states:  slow start
 *          congestion avoidance
 *          fast recovery
 * vars:    cwnd,ssthresh,mss,t(which is ACK number)
 */

/**
 * three ACKs:  
 *      take TCP segments with numbers 0 1 2 3 4 5 6 7 8 9 10
 *      if sending these one by one, and segment 2 get lost, then next segments will give ACK no 1 because receiver is expecting
 *      segment 2 which has not arrived yet.The ACK numbers received by sender are 0 1 1 1
 *      now three duplicate ACKs arrived and sender knows segment 2 get lost(google why three duplicates and not two)
 * timeout:
 *      happens when sender has waited enough for ACK. Denotes more serious congestion than three ACKs
 * 
 * MSS: max segment size(precisely its number of bytes application layer pass to TCP)
 * CWND: congestion window(number of packets that can be sent, avoiding congestion)
 * SSTHRESH: slow start threshold(equal to half of CWND when timeout or threeACKs occured in slow start mode)
 * 
 * SlowStart:
 *      if(no threeACKs or timeout && CWND < SSTHRESH): exponentially increase congestion window(double each time like 1 2 4 8 16)
 *      if(no threeACKs or timeout && CWND >= SSTHRESH):SSTHRESH = CWND/2;switch mode to CongestionAvoidance 
 *      if(timeout): set congestion window to 1MSS
 *      if(threeACKs): SSTHRESH = current CWND/2;CWND = SSTHRESH;switch mode to FastRecovery
 * CongestionAvoidance:
 *      if(no threeACKs or timeout): increase CWND every CWND/MSS received ACKs
 *      if(timeout): SSTHRESH = current CWND/2;CWND = 1; switch to SlowStart
 * FastRecovery:
 *      if(threeACKs): CWND++;
 *      if(no threeACKs or timeout): switch to CongestionAvoidance
 *      if(timeout):  SSTHRESH = current CWND/2;CWND = 1; switch to SlowStart
 */