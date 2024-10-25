let myShader;
let myFont;

function preload() {
    myShader = loadShader('shader.vert', 'shader.frag');
    myFont = loadFont('../../../fonts/Arial.otf');
}

function setup() {
    createCanvas(600, 600, WEBGL);
}
function draw() {
    clear();
    shader(myShader);
    noStroke();

    myShader.setUniform('time', millis());

    circle(0,0,300);

    textFont(myFont);
    textSize(25);
    fill(0);
    text(Math.trunc(millis() / 10) / 100, -295, -275);
}