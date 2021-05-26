let x,y,vx=0,vy=0,ax=0,ay=0;//position,speed,acceleration
let a = false,b = false;
let esei = 100,eseicycle = false;
let first = true,sizee = 1,sizekam = false;
let wowx = Math.floor(Math.random()*900)+25;
let wowy = Math.floor(Math.random()*400)+25;
console.log(wowx,wowy);
function wowmech(x,y){//dopamine sources, you can recognize them I think.
	fill(0,0,0,0);
	strokeWeight(1);
	stroke(255);
	if(abs(x-wowx) <20 && abs(y-wowy) <20){
		if(first){first = false;}
		else{first = true;}
		badwow(x,y,10,1);
		wowx = Math.floor(Math.random()*900)+25;
 		wowy = Math.floor(Math.random()*400)+25;
	}
	if(first){ellipse(wowx,wowy,random(1,10), 35);}
	else{
		circle(wowx,wowy,4);
		circle(wowx,wowy,sizee);
		if(sizekam){sizee--;}else{sizee++;}
		if(sizee >= 35){sizekam = true;}
		if(sizee  <= 10){sizekam = false;}
		
	}
}
function update(){
	if(a && b){
		ax=10,ay=0;a = false;
	}else if(!a && b){
		ax=0,ay=10;a = true;b = false;
	}else if(a && !b){
		ax=-10,ay=0;a = false;
	}else if(!a && !b){
		ax=0,ay=-10;a = true;b = true;
	}

}
function badwow(x,y,size,or=0){//the lines drawen, I draw them to animate kind of thunder lights
	fill(255);
	strokeWeight(2);
	stroke(255);
	line(x,y,x+size,y+size);
	line(x+size,y+size,x,y+size*2);
	line(x,y,x-size,y-size);
	line(x-size,y-size,x,y-size*2);
	if(or>0){
		line(x,y,x+size*1.3,y+size*1.1);
		line(x+size*1.3,y+size*1.1,x,y+size*2.2);
		line(x,y,x-size*1.3,y-size*1.1);
		line(x-size*1.3,y-size*1.1,x,y-size*2.2);
		/**/line(x,y,x-size*1.3,y+size);
		line(x-size*1.3,y+size*1.1,x,y+size*2.2);
		line(x,y,x+size*1.3,y-size*1.1);
		line(x+size*1.3,y-size*1.1,x,y-size*2.2);
	}
}
function setup(){
    createCanvas(1000,500);
    x = Math.floor(Math.random()*900)+25;
 	y = Math.floor(Math.random()*400)+25;
    frameRate(60);
}

function draw(){
    background(0,0,0);
    //coloring things starts
    let col1 = esei;
    let col2 = (esei+85 >255)?(esei+85-255):(esei+85);
    let col3 = (esei-85 <100)?(esei-85+100):(esei-85);
    if(x>950 || y>450 ||  x<50 || y<50){
    	fill(255,0,0);
    	stroke(255,0,0);
    	strokeWeight(5);
    }
    else{
	    fill(col1,col2,col3);
	    stroke(col2,col3,col1);
	    strokeWeight(col1*5/255);
	}
	//coloring things ends
    if(eseicycle){esei--;if(esei==0){eseicycle = false};}
    else{esei++;if(esei==255){eseicycle = true};}
    circle(x,y,20);
    //the insan can't run out of boundries
    if(x<50){if(vx<0){ax = -2*ax+50;} badwow(x,y,5);}
    if(x>950){if(vx>0){ax = -2*ax-50;} badwow(x,y,5);}
    if( y<50){if(vy<0){ay = -2*ay+50;} badwow(x,y,5);}
    if(y>450){if(vy>0){ay = -2*ay-50;} badwow(x,y,5);}
    //postion,speed,acceleration
    x+=vx;
    y+=vy;
    vx+=ax;
    vy+=ay;
    //the insan in always triggered, never at peace
    if(ax<5 && ax>0){ax+=10;}
    if(ay<5 && ay>0){ay+=10;}
    if(ax>-5 && ax<0){ax-=10;}
    if(ay>-5 && ay<0){ay-=10;}
    update();
    wowmech(x,y);

}
