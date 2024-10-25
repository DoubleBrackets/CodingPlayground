let dotGridWidth = 20;
let dotDiam = 25;
let k = 2;
let fric = 0.75;

let light;
let dark;

function createDot() {
  light = color("#b8c2b9")
  dark = color("#382b26")
  return {
    pos: createVector(),
    targetRotation: 0,
    currentRotation: 0,
    rotVel: 0
  }
}

let dots = [];

function setup() {
  createCanvas(600, 600);
  strokeWeight(0);
  for (let i = 0; i < dotGridWidth; i++) {
    for (let j = 0; j < dotGridWidth; j++) {
      let dot = createDot();
      dot.pos = createVector((i + 0.5) * width / dotGridWidth, (j + 0.5) * height / dotGridWidth);
      dot.targetRotation = 0;
      dot.currentRotation = 0;
      dots.push(dot);
    }
  }
  frameRate(30);
}

function drawDot(dot) {
  push();
  translate(dot.pos);
  rectMode(CENTER);

  // scale of main circle
  let mainScale = Math.cos(dot.currentRotation);
  // scale of "thickness" circle
  let scaleThick = Math.cos(dot.currentRotation + 0.1);
  // offset of "thickness" circle
  let offset = Math.sin(dot.currentRotation);

  // Shadow
  fill(0);
  push()
  translate(-5, 5);
  drawThickDot(mainScale, scaleThick, offset);
  pop();

  // Dot
  if (Math.sin(dot.currentRotation - Math.PI / 2) > 0) {
    fill(dark);
  }
  else {
    fill(255);
  }
  drawThickDot(mainScale, scaleThick, offset);

  pop();
}

function drawThickDot(mainScale, scaleThick, offset) {
  push();
  scale(scaleThick, 1);
  circle(offset, 0, dotDiam);
  pop();
  push();
  scale(mainScale, 1);
  circle(0, 0, dotDiam);
  pop();
}

function draw() {
  background(light);
  let mouse = createVector(mouseX, mouseY);
  let delta = deltaTime / 1000;
  let scroll = millis() / 1000;

  // vertical "strings" connecting dots
  strokeWeight(2);
  for (let i = 0; i < dotGridWidth; i++) {
    let x = (i + 0.5) * width / dotGridWidth;
    line(x, 0, x, height);
  }
  strokeWeight(0);

  // Dot update
  for (let dot of dots) {
    // Spring physics
    dot.rotVel += delta * k * (dot.targetRotation - dot.currentRotation);
    dot.currentRotation += dot.rotVel * delta;

    // Rotational friction
    let sign = Math.sign(dot.rotVel);
    let fricF = sign * dot.rotVel * fric;
    fricF = Math.min(Math.abs(fricF), Math.abs(dot.rotVel));
    dot.rotVel -= sign * fricF * delta;

    // Mouse interaction
    let dist = p5.Vector.sub(mouse, dot.pos).mag();
    if (dist < 100  && mouseIsPressed) {
      dot.targetRotation = 0;
    }
    else
    {
      dot.targetRotation = noise(dot.pos.x / 200 + scroll, dot.pos.y / 200 + scroll) * Math.PI;
    }

    // Draw
    drawDot(dot);
  }

  // text(frameRate(), 5, 20);
}