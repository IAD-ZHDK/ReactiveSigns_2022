let myFont;
function preload() {
  myFont = loadFont('barlow_condensed.otf');
}


function setup() {
  createCanvas(getWindowWidth(), getWindowHeight(), WEBGL); // impartant! Don't modify this line. 
 //ortho();
 
  setupOSC(false); // Don't remove this line. 1 argument to turn the depthstream on and off
  textFont(myFont); // impartant! WEBGL has no defualt font
  let cam = createCamera();
  console.log(cam)
}

function draw() {
  background(255,0,100);
 effect()
  posterTasks(); // do not remove this last line!  
}

function effect() {
  normalMaterial();
  push();
  translate(-width/4,0,0);
  rotateZ(frameCount * 0.001);
  rotateX(posNormal.x);
  //rotateY(frameCount * 0.001);
  cylinder(screens[0].w/4, vh*30, 30, 1);
  pop();

  push();
  translate(width/4,0,0);
  rotateZ(frameCount * 0.001);
  rotateX(posNormal.x);
  rotateY(frameCount * 0.001);
  torus(vh*10, vh*5);
  pop();
}

function windowScaled() {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
   // ortho();
    }
}