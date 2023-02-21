let oscSignal = false;// osc signal
let fullscreenMode = false;
// helper variables for scalable positioning
const screens = [{x:0, y:0, w:100, h:100, cntX: 50, cntY: 50}, {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50}]
let fpsAverage = 0;
let vw = 1; // 1 percent of viewport width;
let vh = 1; // 1 percent of viewport height;
/*  aspect ratio control */
const pageWidth = 1080 * screens.length; // resolution 
const pageHeight = 1920; //

function correctAspectRatio() {
  let offsetX = 0;
  let offsetY = 0;
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    offsetX = - Math.floor(width/2)
    offsetY = - Math.floor(height/2)
  }
  for (let i = 0; i<screens.length; i++) {
    screens[i].w = floor(width/screens.length);
    screens[i].h = height;
    screens[i].x = screens[i].w * i;
    screens[i].y = 0;
    screens[i].cntX = screens[i].x + screens[i].w/2;
    screens[i].cntY = screens[i].h/2; 
  }
  vw = width*0.01; // 1 percent of viewport width;
  vh = height*0.01;// 1 percent of viewport height;  
}


function getWindowWidth() {

  let displayWidth = window.innerWidth;
  let displayHeight = window.innerHeight;
  //const body = document.getElementsByTagName('body'); // 
  let body = select('body');

  if (body.style('transform') == 'matrix(0, 1, -1, 0, 0, 0)' || body.style('transform') == 'matrix(0, -1, 1, 0, 0, 0)') {
   // console.log("rotated display")
       // workaround for rotated display
     displayWidth = window.innerHeight;
     displayHeight = window.innerWidth;
  }

  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width

  let currentRatio = displayWidth/displayHeight;

  if (displayWidth < displayHeight*aspectRatioWH) {
    // for portrait mode
    posterWidth = displayWidth;
  } else {
    // for landscape mode
    posterWidth = Math.floor(displayHeight*aspectRatioWH);
  }
  return posterWidth;
}

function getWindowHeight() {
 
  let displayWidth = window.innerWidth;
  let displayHeight = window.innerHeight;
  let body = select('body');
  if (body.style('transform') == 'matrix(0, 1, -1, 0, 0, 0)' || body.style('transform') == 'matrix(0, -1, 1, 0, 0, 0)') {
    //  console.log("rotated display")
      // workaround for rotated display
    displayWidth = window.innerHeight;
    displayHeight = window.innerWidth;
  }
  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width
  if (displayWidth < displayHeight*aspectRatioWH) {
    // for portrait mode
    posterHeight = Math.floor(displayWidth*aspectRatioHW);
  } else {
    // for landscape mode
    posterHeight = displayHeight;
  }
  if (displayHeight == screen.height || displayWidth == screen.height) {
    fullscreenMode = true;
  } else {
    fullscreenMode = false;
  }

  return posterHeight;
}

document.addEventListener('fullscreenchange', (event) => {
  // document.fullscreenElement will point to the element that
  // is in fullscreen mode if there is one. If there isn't one,
  // the value of the property is null.
  if (document.fullscreenElement) {
    console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
    fullscreenMode = true;
    resized();  
  } else {
    console.log('Leaving full-screen mode.');
    fullscreenMode = false;
    resized();  
  }
});

function resized() {
  cameraSave(); // work around for play.js
  resizeCanvas(getWindowWidth(), getWindowHeight());
  cameraRestore(); // work around for play.js
  correctAspectRatio();
  try {
    windowScaled();
  }   catch(e) {
  }
}

window.onresize = resized;


let percentX;
let percentY;
function cameraSave(){
  try {
    percentX = camera.position.x/width;
    percentY = camera.position.y/height;
  }   catch(e) {
  }

}

function cameraRestore(){
  try {
    camera.position.x = percentX * width;
    camera.position.y = percentY * height;
  }   catch(e) {
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
   this.openFullscreen();
  }
}

function keyPressed() {
  try {
    parent.pickPoster(key)
  }   catch(e) {
  }
  /*
  if (keyCode >65 && keyCode <90) {
    let body = select('body');
    console.log(body.style('transform')) 
    if (body.style('transform') === 'none') {
     body.style('transform', 'rotate(90deg)');
     resized();
    } else {
      body.style('transform', 'none');
      resized();  
    }
    try {
      windowScaled();
    }   catch(e) {
    }
  }
  */
}
function showPoint(pos) {
  push();
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    translate(-width/2,-height/2,0);
  }
  fill(0, 180, 180);
  noStroke();
  circle(pos.x, pos.y, pos.z*10);
  pop();
}

function posterTasks() {

  if (millis()-lastOSC>=2000) {
     // if there is no osc connection, then use mouse for position
    updatePosition(mouseX/width,mouseY/height,1.0)
    oscSignal = false;
    placeHolderAnimation();
  } else {
    oscSignal = true;
  }
  
  try {
    window.parent.trackingCallback(tracking, oscSignal);
  }   catch(e) {
  }

  // show helplines when outside of fullscreen mode
  let debug = true;
  if (!fullscreenMode && debug) {
      push();
      if (_renderer.drawingContext instanceof WebGLRenderingContext) {
        translate(-width/2,-height/2,0);
      }
      fill(0, 180, 180);
      noStroke();
      fpsAverage = fpsAverage * 0.9;
      fpsAverage += frameRate() * 0.1;
      textSize(1.2*vw);
      textAlign(LEFT, TOP);
      text("fps: " + Math.floor(fpsAverage), screens[0].x+vw, screens[0].y+vh);
      text("Streaming: " + oscSignal, screens[0].x+vw, screens[0].y+vh+vh+vh);
      text("tracking: " + tracking, screens[0].x+vw, screens[0].y+vh+vh+vh+vh+vh);
      text("resolution "+width+" x "+ height, screens[0].x+vw, screens[0].y+vh+vh+vh+vh+vh+vh+vh);
		  text("aspect Ratio: 1 to "+(height/width), screens[0].x+vw, screens[0].y+vh+vh+vh+vh+vh+vh+vh+vh+vh);
		
      noFill();
      stroke(0, 180, 180);  
      strokeWeight(1);
      rectMode(CORNER);
      rect(screens[0].x, screens[0].y, width, height);
      // line between screens
      for (let i = 1; i<screens.length; i++) {
        screens[i].w = floor(width/screens.length);
        line(screens[i].x, screens[i].y, screens[i].x, screens[i].y+screens[i].h); // line between 1st and 2nd screen
      }
      pop();
      showPoint(position);
  }
}

function placeHolderAnimation() {
  if (enableDepthStream) {
    // placeholder patern
      try {
        depthH = 140 ;
        depthW = 160 ;
        let depthLength = depthH * depthW;
        let reactorX = depthW/2 + sin(frameCount*0.015)*depthW*0.3;
        let reactorY = depthH/2 + cos(frameCount*0.015)*depthH*0.2;
  
        for (let i = 0; i < depthLength; i++) {
          let x = i%depthW;
          let y = i/depthW;
          let dis = dist(x,y,reactorX,reactorY);
          let scaler = bellCurve(dis, 255, 10);
          scale = constrain(scale,0,255)
          dataFiltered[i] = scaler;
          rData[i] = scaler;
          gData[i] = 255-scaler;
          bData[i] = scaler;
        }
      } catch(e) {
        console.log("data not defined yet");
        dataFiltered = [];
        rData =[];
        gData = [];
        bData = [];
      }

    }

}

function bellCurve(t, b, c) {
  // see https://en.wikipedia.org/wiki/Gaussian_function
    // t = time
    // b = amplitude
    // c = wavelength 
    var scaler = 1+(c/sqrt((c*c)+(t*t)))*b; //bell curve
    return scaler;
  }

function openFullscreen () {
  let elem = document.documentElement
    if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen()
  }
}
// this can be used to interlac images to increase image count for smoother animation
function interlaceImageSet(imageArray) {
  let i = 1;
  while(i<imageArray.length) {
    let newImage = interlaceTwoImages(images[i-1], images[i]); 
    imageArray.splice(i, 0, newImage);
    i+=2;
  }
  return imageArray
}

function interlaceTwoImages(image1, image2){
  let img = createImage(image1.width, image1.height);
  img.loadPixels();
  image1.loadPixels();
  image2.loadPixels();
  let d = pixelDensity();
  let imageLength = 4 * img.width*image1.height;
  console.log(imageLength);
  for (let i = 0; i < imageLength; i ++) {
   let x = i % (4 * img.width)
    let y = (i - x) / (4 * img.width)
    y  = y  % 2;
    if (y  == 0) {
      img.pixels[i] = image1.pixels[i]; 
    } else {
      img.pixels[i] = image2.pixels[i]; 
    }
  }
  img.updatePixels();
  return img;
}

