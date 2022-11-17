let oscSignal = false;// osc signal
// helper variables for scalable positioning
const screens = [{x:0, y:0, w:100, h:100, cntX: 50, cntY: 50}, {x:0, y:0, w:100, h:100, cntX: 50, cntY: 50}]
let vw = 1; // 1 percent of viewport width;
let vh = 1; // 1 percent of viewport height;
/*  aspect ratio control */

const pageWidth = 2160 * screens.length; //  
const pageHeight = 3840; // 


function correctAspectRatio() {
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
  // 
  vw = width*0.01; // 1 percent of viewport width;
  vh = height*0.01;// 1 percent of viewport height;  
}


function getWindowWidth() {
  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width
  let currentRatio = windowWidth/windowHeight;

  if (windowWidth < windowHeight*aspectRatioWH) {
    // for portrait mode
    posterWidth = windowWidth;
  } else {
    // for landscape mode
    posterWidth = floor(windowHeight*aspectRatioWH);
  }

  return posterWidth;
}

function getWindowHeight() {
  let aspectRatioWH = pageWidth/pageHeight; // width to height
  let aspectRatioHW = pageHeight/pageWidth; // height to width
  if (windowWidth < windowHeight*aspectRatioWH) {
    // for portrait mode
    posterHeight = floor(windowWidth*aspectRatioHW);
  } else {
    // for landscape mode
    
    posterHeight = windowHeight;
  }
  return posterHeight;
}

document.addEventListener('fullscreenchange', (event) => {
  // document.fullscreenElement will point to the element that
  // is in fullscreen mode if there is one. If there isn't one,
  // the value of the property is null.
  if (document.fullscreenElement) {
    console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
    resized();  
  } else {
    console.log('Leaving full-screen mode.');
    resized();  
  }
});

function resized() {
  resizeCanvas(getWindowWidth(), getWindowHeight());
  correctAspectRatio();
  try {
    windowScaled();
  }   catch(e) {
  }
}
window.onresize = resized;


function mousePressed() {
  if (mouseButton === LEFT) {
    this.openFullscreen();
  }
}

function showPoint(pos) {
  push();
  fill(0, 180, 180);
  noStroke();
  circle(pos.x, pos.y, pos.z*10);
  pop();
}

function screenchange() {
  if (document.fullscreenElement) {
    console.log('Entering full-screen mode.');
  } else {
    console.log('Leaving full-screen mode.');
  }
}

let fpsAverage = 0;

function posterTasks() {
  if (millis()-lastOSC>=2000) {
     // if there is no osc connection, then use mouse for position
     updatePosition(mouseX/width,mouseY/height,1.0)
     oscSignal = false;
  } else {
    oscSignal = true;
  }
  mouseOverC = false;
  // show helplines when outside of fullscreenmode
  if (!fullscreen()) {
    push();
    fill(0, 180, 180);
    noStroke();
    fpsAverage = fpsAverage * 0.9;
    fpsAverage += frameRate() * 0.1;
    textSize(0.8*vw);
    textAlign(LEFT, TOP);
    text("fps: "+Math.floor(fpsAverage), width*0.02, height*0.04);
    text("Streaming: "+oscSignal, width*0.02, height*0.07);
    text("tracking: "+tracking, width*0.02, height*0.010);
    
    noFill();
    stroke(0, 180, 180);
    rectMode(CORNER);
    rect(0, 0, width, height);
    line(width/2, 0, width/2, height); // line between 1st and 2nd screen
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

