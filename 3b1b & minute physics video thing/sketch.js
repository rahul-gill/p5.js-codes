let a = 200, b = 200;
let OFFX = 300, OFFY = 300;
let rot = 0;

function setup() {
  createCanvas(1300, 600);
}


function draw() {
  background(0);
  translate(OFFX,OFFY);

  if(rot>=-Math.PI/2){ rot -= 0.02; }

	fill(255,0,0);
	circle(150,0,10);

  for(let i=0; i<200; i+=0.71){
    let pointOnEllipse = ellipse_cords(i);
    let focus = createVector(150,0);
    let midPoint = createVector((pointOnEllipse.x+focus.x)/2, (pointOnEllipse.y+focus.y)/2);

    push();
		
		translate(midPoint.x, midPoint.y);

    rotate(rot);
		stroke(255);
    line((pointOnEllipse.x - midPoint.x), (pointOnEllipse.y - midPoint.y), focus.x - midPoint.x, focus.y - midPoint.y);
    pop();
  }
}

function ellipse_cords(t){
  let vec =  createVector(a*Math.cos(t), b*Math.sin(t));
  return vec;
}