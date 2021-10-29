class fourierValues {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }
}

function integral(f, a, b, n){   
    //mid-ordinate rule
    dt = ( b - a ) / n;
    sum = 0;
    for(let i=1; i<=n; i++) sum += f(a + (i-0.5) * dt) * dt;
    return sum;
}

let period, omega;
let max_harmonic = 20;
let fourier_vals_array = new Array(100)
function compute_coeffs(f){
    let Ndt = (10*max_harmonic > 100) ? 10*max_harmonic : 100;
    if(Ndt > 3000){ Ndt = 3000 }
    let factor = 2.0 / period;
    for(let i=1; i<=100 ;i++){
        let c = (t) =>  f( t ) * cos( i * omega * t ) ;
        let s = (t) => f( t ) * sin( i * omega * t );
        let cos_coeff = factor * integral( c, 0.0, period, Ndt );
        let sin_coeff = factor * integral( s, 0.0, period, Ndt );
        let mod = 300*Math.sqrt(cos_coeff*cos_coeff + sin_coeff*sin_coeff) 
        fourier_vals_array[i] = mod
    }
}
function get_coeffs(i){
    return new fourierValues(
        fourier_vals_array[i]*cos(i*time),
        fourier_vals_array[i]*sin(i*time),
        fourier_vals_array[i]
    )
}


let time = 0
let wave = [] // stores points that we've drawn
let slider
let drawWaveSwitch = 1, circleSwitch = 255

function setup() {
    createCanvas(1360, 600)
    slider = createSlider(1, 100,100)
    slider.position(150,2)
    slider.style('width','400px')
    button = createButton("sawtooth/square")
    button.position(1,1);
    button.mousePressed(changeWave)
    button = createButton("show/hide circles")
    button.position(590,1);
    button.mousePressed(changeCircleSwitch)
    period = 1;
    omega = 2.0 * PI/period;
    changeWave()
}
function changeWave(){
    drawWaveSwitch = 1 - drawWaveSwitch
    compute_coeffs(drawWaveSwitch ? sawTooth : squareWave)
}
function changeCircleSwitch(){
    if(circleSwitch == 0) circleSwitch = 255
    else circleSwitch = 0
}

function squareWave(t){
    t -= Math.floor(t)
    return t < 0.5 ? 1 : 0;
}
function sawTooth(t){
    t = t - floor( t );
    return t;
}

function draw() {
    max_harmonic = slider.value()
    background(0)
    translate(width/3, height/2)
    stroke(255)
    noFill()

    let x = 0, y = 0, prevPos

    for (let i=1; i<=slider.value(); i++) {
        prevPos = new p5.Vector(x, y)
        let fourier_vals = get_coeffs(i)
        x += fourier_vals.x
        y += fourier_vals.y
        stroke(255,255,0)
        line(prevPos.x, prevPos.y, x, y)
        stroke(255, circleSwitch)
        circle(prevPos.x, prevPos.y, fourier_vals.r*2)

    }

    wave.unshift(y)
    let offsetX = 500
    translate(offsetX, 0)
    stroke(255)
    line(x-offsetX, y, 0, wave[0])
    strokeWeight(10)
    stroke(255,100);
    point(0, wave[0])

    stroke(255,0,0)
    strokeWeight(1)
    beginShape()
    noFill()
    for (let i=0; i<wave.length; i++)
        vertex(i*1.7, wave[i])
    endShape()

    if (wave.length > 300)
        wave.pop()

    time +=0.02
}


