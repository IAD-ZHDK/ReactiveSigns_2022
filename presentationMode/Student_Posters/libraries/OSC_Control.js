// osc
const port = 8025;
const osc = new OSC();
let enableDepthStream = true;
let enableRGBStream = false;
let lastOSC = 0;
let data; // array of depth data
let rData // array of red data
let gData // array of red data
let bData // array of red data
let dataFiltered;
let depthW = 140; // width of data array
let depthH = 160; // width of height array
let position;// blob center 
let posNormal// blob center normalised
let tracking = false; // if someone is infront of the camera 
let mouseOverC;
function setupOSC(depthEnabled, rgbEnabled) {
  noCursor();
  enableDepthStream = depthEnabled;
  enableRGBStream = rgbEnabled;
  lastOSC = millis();
  position = createVector(0, 0, 0);
  posNormal = createVector(0, 0, 0); // normalised
  //
  //const myCanvas = document.getElementById('defaultCanvas0');
  try {
    select('canvas').mouseOut(out);
    select('canvas').mouseOver(over);
  } catch(e){
    
  }

  // init buffer
  // setup OSC receiver
  osc.on('/depth', msg => {
    updateDepthImage(msg);
  }
  );

  try {
    osc.open({
      port:
        port
    }
    );
  }
  catch (e) {
    console.log("Could not connect: " + e);
  }
  correctAspectRatio();
  if (enableRGBStream) {
    let depthH = 140 ;
    let depthW = 160 ;
    let depthLength = depthH * depthW;
    rData = [];
    gData = [];
    bData = [];
    for (let i = 0; i < depthLength; i++) {
      rData[i] = 100;
      gData[i] = 100;
      bData[i] = 100;
    }
  }
}
function out() {
  if (oscSignal == false) {
    tracking = false;
  }
}
function over() {
  if (oscSignal == false) {
    tracking = true;
  }
}

function updateOSC() {
  // reconnect osc
  console.log("tryosc")
  if (osc.status() === OSC.STATUS.IS_CLOSED) {
    console.log("reconnecting...");
    osc.open({
      port:
        port
    }
    );
  }
}

function updatePosition(x, y, z) {
  // position data and smoothing
  let factor = 0.6;
  posNormal.mult(factor)
  posNormal.x += x * (1 - factor);
  posNormal.y += y * (1 - factor);
  posNormal.z += z * (1 - factor);

  position.set(posNormal);
  position.x = position.x * width;
  position.y = position.y * height;
}

function updateDepthImage(msg) {
  lastOSC = millis();
  updatePosition(msg.args[3], msg.args[4], msg.args[5]);
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
        let datasplit = data[i];
        dataFiltered[i] = int(dataFiltered[i] * 0.9);
        dataFiltered[i] += int(datasplit * 0.1);
      }
    } catch (e) {
      console.log("data not defined yet");
      dataFiltered = Array.from(msg.args[2]);
    }

    try {
      if (enableRGBStream) {
        rData = msg.args[7];
        gData = msg.args[8];
        bData = msg.args[9];
      }
    } catch (e) {
      console.log("rgb data not defined yet");
 
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
