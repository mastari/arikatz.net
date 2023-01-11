

let time = 0;
let points = []
let evo = 0;
let x = 0;
let y = 2;
let z = 0;
let mX = 0;
let mY = 0;
let frame = 0;

let rand_seed = Math.random()

let min_scale = 6;
let max_scale = 15;

let transY = 10;
let transZ = 0;
let transX = 0;

let rand_color;
let satch;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scale = map(windowWidth, 0, screen.width, min_scale, max_scale)
  console.log(scale)
}

function setup() {

  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.class('background_animation')
  // cnv.mousePressed(playOscillator);

  colorMode(HSB)


  initConditions()

  switch (Math.trunc(rand_seed * 10 / 3)) {
    // case 0:
    //   rand_color = 100;
    //   satch = 100;
    //   break;
    // case 1:
    //   rand_color = 200;
    //   break;
    // case 2:
    //   rand_color = 250;
    //   break;
    default:
      rand_color = 250;
      break;
  }
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
  scale = map(windowWidth, 0, screen.width, min_scale, max_scale)
  console.log(scale)


  points = []
  time = 0;

  x = 5;
  y = Math.random() * 10 + 1;
  z = 0;

  mX = mouseX;
  mY = mouseY;

  for (let i = 0; i < 500; i++) {
    attract(a, b, c, false)
    points.splice(0, 1)
  }
  for (let i = 0; i < 500; i++) {
    attract(a, b, c, false)
  }
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
  points.push({ x: x + transX, y: y + transY, z: z + transZ })

  if (points.length > 1000) {
    // points.shift()
  }
}

function display() {

  background(255)

  noFill()
  strokeWeight(1.5)

  rotateY(20)

  push()
  let hu = 0;
  let check = 0;
  beginShape()
  for (let p = 0; p < points.length; p++) {
    check += 1;
    // stroke(hu, 255, 255)
    console.log(rand_color)
    stroke(color(30 * p / points.length + rand_color, 255 || satch, 100, 0.5))

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
  frame++;

  attract(a, b, c, false)

  if (points.length > 500) {
    points.splice(0, 1)
  }


  display()


  // points = []

  // for (let i = 0; i < time * 20; i++) {
  //   attract(a, b, c)
  // 



}