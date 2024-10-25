let light;
let dark;
let startWeight = 10;
let angle = 0;

function setup() {
  light = color("#b8c2b9")
  dark = color("#382b26")
  canvas = createCanvas(800, 800);
  stroke(dark);
}
function draw() {
  background(light);
  angle = (mouseY / height) * PI / 10;
  translate(0, 100);
  rotate(PI / 2);
  recurse(1);
}

function recurse(depth) {

  if (startWeight <= depth) {
    return;
  }

  let len = 100 - depth;

  let weight = startWeight - depth;
  strokeWeight(weight);

  push();

  line(0, 0, 0, -len);
  translate(0, -len);
  rotate(angle);
  recurse(depth + 1);
  rotate(angle);
  recurse(depth + 1);
  pop();
}