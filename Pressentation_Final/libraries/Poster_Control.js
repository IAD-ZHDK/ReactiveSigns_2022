let oscSignal = false;// osc signal
let fullscreenMode = false;
// helper variables for scalable positioning
const screen1 = {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50};
const screen2 = {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50};
const screen3 = {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50};
let fpsAverage = 0;
let vw = 1; // 1 percent of viewport width;
let vh = 1; // 1 percent of viewport height;
/*  aspect ratio control */

const pageWidth = 2160 * 3; // samsang QM85 resolution (two screens)
const pageHeight = 3840; // samsang QM85 resolution


function correctAspectRatio() {
  let offsetX = 0;
  let offsetY = 0;
  if (_renderer.drawingContext instanceof WebGLRenderingContext) {
    offsetX = - Math.floor(width/2)
    offsetY = - Math.floor(height/2)
  }
  screen1.w = Math.floor(width/3);
  screen1.h = height;
  screen1.x = offsetX;
  screen1.y = offsetY;
  screen1.cntX = screen1.x + screen1.w/2;
  screen1.cntY = screen1.y + screen1.h/2; 
  //
  screen2.w = Math.floor(width/3);
  screen2.h = height;
  screen2.x = offsetX + Math.floor(width/3);
  screen2.y = offsetY;
  screen2.cntX = (screen2.w/2)+screen2.x;
  screen2.cntY = (screen2.h/2)+screen2.y; 
  //
  screen3.w = Math.floor(width/3);
  screen3.h = height;
  screen3.x = offsetX+(floor(width/3)*2);
  screen3.y = offsetY;
  screen3.cntX = screen3.w/2+screen3.x;
  screen3.cntY = screen3.h/2+screen3.y;
//

  // 
  vw = width*0.01; // 1 percent of viewport width;
  vh = height*0.01;// 1 percent of viewport height;  
}


function getWindowWidth() {
  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width

  let currentRatio = window.innerWidth/window.innerHeight;

  if (window.innerWidth < window.innerHeight*aspectRatioWH) {
    // for portrait mode
    posterWidth = window.innerWidth;
  } else {
    // for landscape mode
    posterWidth = Math.floor(window.innerHeight*aspectRatioWH);
  }
  return posterWidth;
}

function getWindowHeight() {
  
  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width
  if (window.innerWidth < window.innerHeight*aspectRatioWH) {
    // for portrait mode
    posterHeight = Math.floor(window.innerWidth*aspectRatioHW);
  } else {
    // for landscape mode
    posterHeight = window.innerHeight;
  }
  //console.log("windowWidth = "+window.innerWidth+" displaywidth = "+displayWidth);
  //console.log("windowHeight = "+window.innerHeight+" displayHeight = "+displayHeight);

  if (window.innerHeight == screen.height) {
    fullscreenMode = true;
  } else {
    fullscreenMode = false;
  }
  //console.log(_renderer._curCamera);
  console.log("fullscreenMode = "+fullscreenMode);
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
}

function showPoint(pos) {
  push();
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
  } else {
    oscSignal = true;
  }
  
  try {
    window.parent.trackingCallback(tracking, oscSignal);
  }   catch(e) {
  }


  // show helplines when outside of fullscreen mode
  //(window.innerWidth == screen.width && window.innerHeight == screen.height)
  let debug = false;
  if (!fullscreenMode && debug) {
      if (_renderer.drawingContext instanceof WebGLRenderingContext) {
        translate(0,0,200);
      }
      push();
      fill(0, 180, 180);
      noStroke();
      fpsAverage = fpsAverage * 0.9;
      fpsAverage += frameRate() * 0.1;
      textSize(1.2*vw);
      textAlign(LEFT, TOP);
      text("fps: "+Math.floor(fpsAverage), screen1.x+vw, screen1.y+vh);
      text("Streaming: "+oscSignal, screen1.x+vw, screen1.y+vh+vh+vh);
      text("tracking: "+tracking, screen1.x+vw, screen1.y+vh+vh+vh+vh+vh);
      noFill();
      stroke(0, 180, 180);  
      rectMode(CORNER);
      rect(screen1.x, screen1.y, width, height);
      line(screen2.x, screen2.y, screen2.x, screen2.y+screen2.h); // line between 1st and 2nd screen
      line(screen3.x, screen3.y, screen3.x, screen3.y+screen3.h);  // line between 2nd and 3rd screen
      pop();
      showPoint(position);
  }
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

