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
let transY = 5;
let transZ = 0;
let transX = 0;
let rand_color;
let satch;
let a = 10;
let b = 28;
let c = 8 / 3;
function windowResized() {
  resizeCanvas($('.project_text').width() / 1.3, $('.project_text').width() / 1.3)
}
function setup() {
  let cnv = createCanvas($('.project_text').width() / 1.3, $('.project_text').width() / 1.3, WEBGL);
  cnv.class('background_animatio')
  cnv.parent('ex1_container')
  colorMode(HSB)
}
let scale = 10;
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
  pop()
}
function draw() {
  frame++;
  attract(a, b, c, false)
  if (points.length > 500) {
    points.splice(0, 1)
  }
  display()
}