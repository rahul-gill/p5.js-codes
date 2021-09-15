
function setup(){
	createCanvas(600,600);
	background(0);
}
let t = 0;

function draw(){
	background(0);
	translate(100,100);
	rotate(0.02*t);
	t += 1;	
	rect(0,0,100,50);
}