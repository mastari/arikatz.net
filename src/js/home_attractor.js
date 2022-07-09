

let time = 0;
let points = []
let evo = 0;
let x = 0;
let y = 2;
let z = 0;
let mX = 0;
let mY = 0;

let transY = 10;


function setup() {

  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.class('background_animation')
  // cnv.mousePressed(playOscillator);

  colorMode(HSB)

  initConditions()
}
// function mouseReleased() {
//   // ramp amplitude to 0 over 0.5 seconds
//   osc.amp(0, 0.5);
//   playing = false;
// }

let scale = 10;

function initConditions() {
  // if (windowWidth < 1500) {
  //   scale = 6;
  // }


  // if (windowWidth < 1000) {
  //   scale = 5;
  // }
  // if (windowWidth < 600) {
  //   scale = 3;
  // }


  points = []
  time = 0;

  x = 0;
  y = 2;
  z = 0;

  mX = mouseX;
  mY = mouseY;
}


function attract(a, b, c, catchup) {
  if (!catchup) {
    evo++;
  }
  let dt = 0.017;
  let dx = (a * (y - x)) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;

  x += dx;
  y += dy;
  z += dz;
  time += dt;
  points.push({ x: x, y: y + transY, z: z })

  if (points.length > 1000) {
    // points.shift()
  }
}

function display() {

  background(255)

  noFill()
  strokeWeight(1.5)

  rotateY(time / 100 + 20)

  push()
  let hu = 0;
  let check = 0;
  beginShape()
  for (let p = 0; p < points.length; p++) {
    check += 1;
    // stroke(hu, 255, 255)
    stroke(color(70 * p / points.length + 165, 255, 100, 0.5))

    vertex(points[p].x * scale, points[p].y * scale, points[p].z * scale)
    hu += 0.5;
    if (hu > 255) {
      hu = 0;
    }
    if (check == 2) {
      endShape()
      check = 0;
      beginShape()
      vertex(points[p].x * scale, points[p].y * scale, points[p].z * scale)
    }
  }
  stroke(255)
  strokeWeight(2)
  noStroke()
  fill(0)
  translate(x * scale, y * scale, z * scale)
  // sphere(2)
  pop()
}

function bound(z) {
  return map(z, 0, windowWidth, 1, 11)
}



let a = 10;
let b = 28;
let c = 8 / 3;

function draw() {

      attract(a, b, c, false)

      if(points.length > 500) {
        points.splice(0, 1)
      }


    display()


  // points = []

  // for (let i = 0; i < time * 20; i++) {
  //   attract(a, b, c)
  // 



}