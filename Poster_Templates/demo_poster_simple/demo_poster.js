
//
//There are three screens (screen1, screen2, screen3), for which you can access the coordinates with the following variables. width/2 and height/2 can still be used in reference to the combined screen layout. 
//
//screen1.x : x position of 1st screen
//screen1.y : y position of 1st screen. Tip: this will always be 0! 
//screen1.w : width of 1st screen
//screen1.h : height of 1st screen
//screen1.cntX : x position of screen center
//screen1.cntY : y position of screen center

//
// These variables act as units of measurement, which are safer than using pixel coordinates. 
//
//vw : 1 percent of viewport width
//vh : 1  percent of viewport height

//
// These variables hold the coordinates of a tracker point, based on the camera and blob detection. When no camera is available the information will be replaced by the mouse.
// 
// position.x  : represents left to right movement of one user 
// position.y  : represents up and down movement of one user. Use sparingly, as this movement is less intuitive. 
// position.z  : represents distance from the user to the screen. Use sparingly, as users will be guided left to rignt in the exhibition. 
//
// posNormal.x, posNormal.y, posNormal.z : The same as "position" but normalised. i.e values between 0 and 1. 
//
//
let font;
function preload() {
  font = loadFont('barlow_condensed.otf')
}

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(false);  // impartant! Don't remove this line. The boolean argument turns the depthstream on and off
  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(10*vw);
}

function draw() {
  background(0,0,0,30);
	fill(255);
  wordEffect("FUTURE", screens[0].cntX, screens[0].cntY);
  wordEffect("NOW", screens[1].cntX, screens[1].cntY);
  ////////////////
  posterTasks(); // do not remove this last line!  
} 

function windowScaled() { // this is a custom event called whenever the poster is scalled
  textSize(10*vw);
}

function wordEffect(word,x,y) {
  // text bounds can be helpful for exact positioning of text. 
  let textBounds = font.textBounds(word, 0, 0, textSize());

  push()
    translate(x, y);
    //rect(textBounds.x, textBounds.y, textBounds.w, textBounds.h);
    rotate(posNormal.x*3*PI);
    text(word,0,-textBounds.h/3)
  pop();
}






