let dotGridWidth = 16;
let dotDiam = 28;
let k = 2;
let fric = 0.75;

let light;
let dark;
let middle;
let bg;
let shadow;

let shadowOffsetX = -8;
let shadowOffsetY = 8;

let thickness = 8;

function createDot() {
  light = color("#f7edf0")
  middle = color("#f4cbc6")
  dark = color("#f4afab")
  bg = color("#62929E")
  shadow = color("#2C1320")
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
  let cosAngle = Math.cos(dot.currentRotation);
  let sineAngle = Math.sin(dot.currentRotation);
  let flipped = Math.sin(dot.currentRotation - Math.PI / 2) > 0;

  drawThickDot(cosAngle, sineAngle, thickness, light, dark, middle, flipped);

  pop();
}

function drawDotShadow(dot) {
  push();
  translate(dot.pos);
  rectMode(CENTER);

  // scale of main circle
  let cosAngle = Math.cos(dot.currentRotation);
  let sineAngle = Math.sin(dot.currentRotation);

  // Shadow
  fill(0);
  push()
  translate(shadowOffsetX, shadowOffsetY);
  drawThickDot(cosAngle, sineAngle, thickness, shadow, shadow, shadow, false);
  pop();

  pop();
}

function drawThickDot(cosAngle, sineAngle, thickness, topColor, bottomColor, middleColor, flipped) {
  // Swap colors and position instead of changing draw order to show a "flip"
  if (flipped) {
    let temp = topColor;
    topColor = bottomColor;
    bottomColor = temp;
  }

  let sign = flipped ? -1 : 1;
  
  // Bottom side
  push();
  fill(middleColor);
  translate(sign * -sineAngle * thickness / 2, 0);
  scale(cosAngle, 1);
  circle(0, 0, dotDiam);
  pop();

  // Middle rectangle
  push();
  fill(middleColor)
  rect(0, 0, sineAngle * thickness, dotDiam);
  pop();
  
  // Top side
  push();
  fill(topColor);
  translate(sign * sineAngle * thickness / 2, 0);
  scale(cosAngle, 1);
  circle(0, 0, dotDiam);
  pop();
}

function draw() {
  background(bg);
  let mouse = createVector(mouseX, mouseY);
  let delta = deltaTime / 1000;
  let scroll = millis() / 1000;

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
  }

  // Shadow first
  for (let dot of dots) {
    drawDotShadow(dot);
  }

  // vertical "strings" connecting dots
  strokeWeight(1);
  for (let i = 0; i < dotGridWidth; i++) {
    let x = (i + 0.5) * width / dotGridWidth;
    stroke(shadow);
    line(x + shadowOffsetX, 0, x + shadowOffsetX, height);
    stroke(middle);
    line(x, 0, x, height);
  }
  strokeWeight(0);

  // Main body last
  for (let dot of dots) {
    drawDot(dot);
  }

  // text(frameRate(), 5, 20);
}