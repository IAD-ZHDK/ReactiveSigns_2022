let images = [];
let imagCount = 270; //119;
let state = 0;
const startState = 0;
const loopState = 1;
const trackingState = 2;
const endTrackingState = 3;

let index = 0;
let loopIndex = 0;
let inversion = false;


let startIndex = 128; // first index of tracking series
let endIndex = 245; // last index of tracking series
let lastIndex = startIndex; // the last frame shown

function preload() {
  for (let i = 0; i < imagCount; i++) {
    let seriesNo = nf(i, 3); // this formats the index nummger into a string with 3 digits total. 
    images[i] = loadImage('images/image' + seriesNo + '.png'); // load up all images 
  }

}
function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(false); // impartant! Don't modify this line. 
  state = startState; //0
}

function draw() {
  push();
  let remapedX = map(posNormal.x,0.15, 0.85, 0.0, 1.0,); // LUKE: this corects for the fact that the tracking point never gets to the very end or start of screens
   remapedX = constrain(remapedX,0.0,1.0)
   // inversion is for the situation where the user arrives on the left instead of the right. 
   if (inversion) {
    remapedX = 1.0 - remapedX;
   }
  if (startState == state) {
    image(images[index], screen1.x, 0, width, screen1.h);
    if (frameCount % 3 == 0) {
      index++;
    }
    if (index > 78) {
      state = loopState;
      loopIndex = 79;
    }
  } else if (loopState == state) {
    loopAnimation();
    if (tracking == true && (posNormal.x<0.20 || posNormal.x>0.80) ) {
      checkDirection(posNormal.x);
      state = trackingState;
    }
  } else if (trackingState == state) {
    loopAnimation();
    if (remapedX<0.5 && tracking==false) {
      state=loopState;
    }
    index = startIndex + floor((endIndex - startIndex) * remapedX); // find index position of image based on normal of position x
    if (index > lastIndex) {    // avoid moving too fast through the frames 
      index = lastIndex+1;
    } else if (index< lastIndex) {
      index = lastIndex-1;
    }
    lastIndex = index 
    index = constrain(index, startIndex, endIndex);
    if (index<200 && !inversion) { // flip direction to follow user 
    translate(width,0);
    scale(-1,1);
    }
    image(images[index], screen1.x, 0, width, screen1.h);

    if (index>=endIndex-1) {
     // if (remapedX>0.5 || tracking == false) {
      state = endTrackingState;
    }
  } else if (endTrackingState == state) {
    background(255);
    image(images[index], screen1.x, 0, width, screen1.h);
    if (frameCount % 3 == 0) {
      index++;
    }

    if (index >= 270) {
      state = startState;
      index=0;
    }
  }
  pop();
  //fill(255, 0, 0);
  //circle(position.x, position.y, position.z * 10);
  ///////////////
  posterTasks(); // do not remove this last line!  
}


function checkDirection(xPosition) {
  if (xPosition > 0.5) {
  inversion = true;
  } else {
    inversion = false;
  }
  lastIndex = startIndex; // the last frame shown
  console.log("inversion: "+inversion);
}

function loopAnimation() {
   // endless loop
  // console.log(loopIndex);

   if (frameCount % 3 == 0) {
     loopIndex++;
   }
   if (loopIndex == 127) {
     loopIndex = 79;
   }
   image(images[loopIndex], screen1.x, 0, width, screen1.h);
}

