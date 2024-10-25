

function createVehicle() {
  return {
    position : createVector(random(width), random(height)),
    velocity : createVector(),
    acceleration : 0.1,
    maxSpeed : 5
  }
}

let accelField;
let maxSpeedField;

let vehicle;

let fieldY = 0;
function createNumField(label, placeholder, callback) {
  let field = createInput(placeholder, 'number');
  field.position(0, fieldY);
  field.size(50);
  
  let labelP = createSpan(label);
  labelP.position(55, fieldY);

  fieldY += 22;

  field.input(callback);
  return field;
}

function setup() {
  createCanvas(800, 800);
  vehicle = createVehicle();

  accelField = createNumField('acceleration', vehicle.acceleration, () => vehicle.acceleration = parseFloat(accelField.value()));
  maxSpeedField = createNumField('max speed', vehicle.maxSpeed, () => vehicle.maxSpeed = parseFloat(maxSpeedField.value()));
}

function draw() {
  // Chasing
  let mouse = createVector(mouseX, mouseY);
  let desiredVel = p5.Vector.sub(mouse, vehicle.position);
  desiredVel.setMag(vehicle.maxSpeed);
  let steerVec = p5.Vector.sub(desiredVel, vehicle.velocity);
  steerVec.limit(vehicle.acceleration);

  vehicle.velocity.add(steerVec);
  vehicle.position.add(vehicle.velocity);

  // Borders
  if (vehicle.position.x > width) {
    vehicle.position.x = width;
    vehicle.velocity.x = 0;
  }
  else if (vehicle.position.x < 0) {
    vehicle.position.x = 0;
    vehicle.velocity.x = 0;
  }
  if (vehicle.position.y > height) {
    vehicle.position.y = height;
    vehicle.velocity.y = 0;
  }
  else if (vehicle.position.y < 0) {
    vehicle.position.y = 0;
    vehicle.velocity.y = 0;
  }


  background(255);
  fill(0);

  drawVehicle(vehicle);
  drawVectors(vehicle, desiredVel, steerVec);

  circle(mouse.x, mouse.y, 10);
}

function drawVehicle(vehicle) {
  let angle = Math.atan2(vehicle.velocity.y, vehicle.velocity.x);

  push();
  translate(vehicle.position);
  rotate(angle);
  triangle(-10, -5, -10, 5, 10, 0);
  pop();
}

function drawVectors(vehicle, desiredVel, steerVec)
{
  strokeWeight(1);
  let scale = 10;

  let normalizedSteerVec = steerVec.copy();
  normalizedSteerVec.normalize().mult(vehicle.acceleration) * 60;

  stroke(255,0,0);
  line(
    vehicle.position.x, 
    vehicle.position.y, 
    vehicle.position.x + vehicle.velocity.x * scale, 
    vehicle.position.y + vehicle.velocity.y * scale);

  stroke(0,255,0);
  line(vehicle.position.x, 
    vehicle.position.y,
    vehicle.position.x + desiredVel.x * scale, 
    vehicle.position.y + desiredVel.y * scale);

  stroke(0,0,255);
  line(vehicle.position.x, 
    vehicle.position.y,
    vehicle.position.x + normalizedSteerVec.x * scale, 
    vehicle.position.y + normalizedSteerVec.y * scale);

  strokeWeight(0);
}