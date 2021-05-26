let TRAIL_SIZE = 5, PARTICLES = 160;
let G = 0.0001;
let trail_size_slider, particle_slider;
class Particle{
	/**
	 * particle position = (this.x, this.y)
	 * particle position = (this.vx, this.vy)
	 * particle position = (this.ax, this.ay)
	 * particle mass = this.m
	 * this.trailx and this.traily for trailing of particle movement
	 * force method takes a particle whose force is applied on this particle
	 * so use p1.force(p2); p2.force(p1);
	 * show method show trail and particle
	 */
	constructor(x,y,vx,vy,m){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.m = m;
		this.trailx = [];
		this.traily = [];
	}
	force(particle){
		/**
		 * distance between particles = square root of rsqr
		 * acc is magnitude of acceleration and dirx and diry tells the direction of acceleration
		 */
		const rsqr = (this.x - particle.x)*(this.x-particle.x) + (this.y-particle.y)*(this.y-particle.y);
		const acc = G*particle.m/(sqrt(rsqr));
		const dirx = (this.x-particle.x)/sqrt(rsqr), diry = (this.y-particle.y)/sqrt(rsqr);
		let ax = -acc*dirx,ay = -acc*diry;
		if(rsqr < 0.001){ ax = 0;ay =0; }
		this.vx += ax;this.vy += ay;
		this.x += this.vx;this.y += this.vy;
	}
	show(){
		let ss;
		if(this.m >1000){ss = 20;}
		else{ss = 5;}
		circle(this.x,this.y,ss);
		stroke(255);
		//trails
		this.trailx.push(this.x);
		this.traily.push(this.y);
		for(let i=this.trailx.length-TRAIL_SIZE;i<this.trailx.length;i++){
			point(this.trailx[i],this.traily[i]);
		}
		if(this.traily.length > TRAIL_SIZE){
			this.trailx.splice(0,1);
			this.traily.splice(0,1);
		}
	}
};


let p = [];//array for other particles
let p1 = new Particle(650,300,0,0,80000);//the star particle
function setup(){
	createCanvas(1300,620);
 	frameRate(60);
 	
	trail_size_slider = createSlider(1,20,0);
	trail_size_slider.position(10,10);
	trail_size_slider.style('width', '80px');
 	/*for(let i=0;i<60;i++){
 		let temp = new Particle(500,500,0,0.3,1);
		p.push(temp);
 	}*/
 	for(let i=0;i<160;i++){
 		let temp = new Particle(500,200,0,-0.2,1);
		p.push(temp);
 	}
}

function draw(){
	background(0);
	fill(100);
	rect(0,0,100,100);
	TRAIL_SIZE = trail_size_slider.value();
	/*forces*/
	for(let i=p.length-PARTICLES;i<p.length;i++){
 		p1.force(p[i]);
 		p[i].force(p1);
	}
	for(let i=p.length-PARTICLES;i<p.length;i++){
 		for(let j=p.length-PARTICLES;j<p.length;j++){
 			if(i != j){
 				p[i].force(p[j]);
 				p[j].force(p[i]);
 			}
		}
	}
	/*show*/
	fill(255,255,0);
	p1.show();
	fill(255);
	const scl = 255/50;
	for(let i=p.length-PARTICLES;i<p.length;i++){
		let tint;
		if(i<25){tint = i*scl;}
		else{tint = (50-i)*scl;}
		fill(scl*i,255-scl*i,tint);
 		p[i].show();
	}
	
}


function mousePressed(){
	if(mouseX > 100 && mouseY>100){
		let speedx,speedy;
		if(mouseX >= p1.x ){ speedx = -2;}
		else{ speedx = 2;}
		let temp = new Particle(mouseX,mouseY,speedx,0,1);
		p.push(temp);
	}
}
