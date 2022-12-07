// osc
const port = 8025;
const osc = new OSC();
let enableDepthStream = true;
let lastOSC = 0;
let data; // array of depth data
let dataFiltered; 
let depthW; // width of data array
let depthH; // width of height array
let position;// blob center 
let posNormal// blob center normalised
let tracking = false; // if someone is infront of the camera 
let mouseOverC;
function setupOSC(depthEnabled) {
  //noCursor(); 
  fadIn()
  enableDepthStream = depthEnabled;
  lastOSC = window.performance.now();
  position = createVector(0, 0, 0); 
  posNormal = createVector(0, 0, 0); // normalised
  // workaround for mouse outside of canvas
  select('canvas').mouseOut(out);
  select('canvas').mouseOver(over);
  // init buffer
  // depthImage = createImage(160, 120);
  // setup OSC receiver
  osc.on('/depth', msg => {
    updateDepthImage(msg);
  }
  );
// <div class="loader"></div>
  try {
    osc.open( {
    port:
      port
    }
    );
  }
  catch (e) {
    console.log("Could not connect: " + e);
  }
  correctAspectRatio();
}


function out() {
  if (oscSignal == false)  {
    tracking = false;
  }
}
function over() {
  if (oscSignal == false)  {
    tracking = true;
  }
}

function fadIn(){
  try {
    let fader = document.getElementById('loader');
    fader.classList.toggle('fadeIn');
    removeElementsByClass("dot");
  }   catch(e) {
  }
}
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}
function updateOSC() {
  // reconnect osc
  console.log("tryosc")
  if (osc.status() === OSC.STATUS.IS_CLOSED) {
    console.log("reconnecting...");
    osc.open( {
    port:
      port
    }
    );
  }
}

function updatePosition(x,y,z) {
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    x -=.5;
    y -=.5; 
    }
    // position data and smoothing
    let factor = 0.6;
    posNormal.mult(factor)
    posNormal.x += x*(1-factor);
    posNormal.y += y*(1-factor);
    posNormal.z += z*(1-factor);
    position.set(posNormal);
    position.x = position.x*width;
    position.y = position.y*height;
}

function updateDepthImage(msg) {
  lastOSC = millis();
  updatePosition(msg.args[3],msg.args[4],msg.args[5]);
  // depth data
  tracking = boolean(msg.args[6]);
  if (enableDepthStream) {
    depthW = msg.args[0];
    depthH = msg.args[1];
    data = msg.args[2];
 
  /* weighted moving average on every point*/
  try {
    let depthLength = depthW * depthH;
    for (let i = 0; i < depthLength; i++) {
      //let index = (i*w)+j;
       dataFiltered[i] = int(dataFiltered[i]*0.99);
       dataFiltered[i] += int(data[i]*0.01);
    }
  } catch(e) {
    console.log("data not defined yet");
    dataFiltered = Array.from(msg.args[2]);
  }
  }
  //
  // uncomment to recreate image
  //
  //// check if buffer size is valid
  //if (depthImage.width !== w || depthImage.height !== h) {
  //  console.log("buffer has been reinitialized");
  //  depthImage = createImage(w, h);
  //}

  //// copy data
  //depthImage.loadPixels();

  //for (let i = 0; i < depthImage.pixels.length / 4; i++) {
  //  let di = i * 4;
  //  depthImage.pixels[di] = data[i];
  //  depthImage.pixels[di+1] = data[i];
  //  depthImage.pixels[di+2] = data[i];
  //  depthImage.pixels[di+3] = data[i];
  //}
  //depthImage.updatePixels();
}
