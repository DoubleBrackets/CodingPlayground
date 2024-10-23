let flower = { 
  x: 200, 
  y: 100,
  emoji: '🌸' 
};

// Function that creates a random flower object.
function createFlower() {
  // Define a flower object.
  let flower = {
    x: random(20, 380),
    y: random(20, 380),
    size: random(20, 75),
    lifespan: random(255, 300),
    color: color(random(255), random(255), random(255)),
  };
  // Return the flower object.
  return flower;
}

function drawFlower(flower) {
  noStroke(); 
  fill(flower.color);

  // Draw petals.
  ellipse(flower.x, flower.y, flower.size / 2, flower.size); 
  ellipse(flower.x, flower.y, flower.size, flower.size / 2);

  // Draw a yellow center.
  fill(255, 204, 0);
  circle(flower.x, flower.y, flower.size / 2);
}

let flowers = [];

function flowerPower() {
  for(let i = 0; i < 35; i += 1) {
    // Create a flower in a random location.
    let flower = createFlower();
    // Add the flower to the flowers array.
    flowers.push(flower);
  }
}

function setup() {
  createCanvas(600, 600);
  flowerPower();
}

function draw() {
  background("lightblue");
  for (let flower of flowers) {
    drawFlower(flower);
    flower.size *= 0.99;

    // Reduce lifespan.
    flower.lifespan -= 1; 
  }

  if(mouseIsPressed) {
    mouse();
  }
}

function mouse() {
  let flower = createFlower();

  // reassign x to be mouseX
  flower.x = mouseX; 
  
  // reassign y to be mouseY
  flower.y = mouseY;

  // add the flower to the flowers array
  flowers.push(flower);
}