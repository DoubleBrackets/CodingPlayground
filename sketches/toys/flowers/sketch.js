let mousePos;

function createFlower() {
  // Define a flower object.
  let flower = {
    pos: createVector(0, 0),
    size: random(25, 100),
    color: color(random(255), random(255), random(255)),
    vel: createVector(random(-5, 5), random(-5, 5)),
    rotVel: random(-0.2, 0.2),
    rotation: 0,
    decay: random(0.92, 0.99)
  };
  // Return the flower object.
  return flower;
}

function drawFlower(flower) {
  noStroke();
  fill(flower.color);

  push()
  translate(flower.pos);
  rotate(flower.rotation);

  // Draw petals.
  ellipse(0, 0, flower.size / 2, flower.size);
  ellipse(0, 0, flower.size, flower.size / 2);

  push()
  rotate(Math.PI / 4);
  ellipse(0, 0, flower.size / 2, flower.size);
  ellipse(0, 0, flower.size, flower.size / 2);
  pop()
  // Draw a yellow center.
  fill(255, 204, 0);
  circle(0, 0, flower.size / 2);

  pop()
}

let flowers = [];

function setup() {
  createCanvas(600, 600);
  mousePos = createVector(mouseX, mouseY);
}

function draw() {
  background("lightblue");
  for (let flower of flowers) {
    drawFlower(flower);
    flower.size *= flower.decay;
    flower.pos.add(flower.vel);
    flower.vel.y += 0.25;

    flower.rotation += flower.rotVel;

    if (flower.size < 1) {
      let i = flowers.indexOf(flower);
      flowers.splice(i, 1);
    }
  }

  // mouse velocity
  let cMousePos = createVector(mouseX, mouseY);
  let mouseVel = p5.Vector.sub(cMousePos, mousePos);
  mousePos = cMousePos;

  if (mouseIsPressed) {
    spawn(mouseVel);
  }

  textAlign(LEFT);
  fill(0);
  textSize(20);
  text(round(frameRate(), 2) + " fps", 5, 20);
  text(flowers.length + " flowers", 5, 45);
  textAlign(CENTER);
  text("Click to plant a flower", width / 2, 25);
}

function spawn(mouseVel) {
  let flower = createFlower();
  flower.pos = createVector(mouseX, mouseY);
  flower.vel.add(mouseVel.div(2));
  flowers.push(flower);
}