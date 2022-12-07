
let font;
function preload() {
  font = loadFont('barlow_condensed.otf')
}

function setup() {
   /*important!*/ createCanvas(getWindowWidth(), getWindowHeight()); // Don't remove this line. 
   /*important!*/ setupOSC(false);  // Don't remove this line. The boolean argument turns the depthstream on and off
 
  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(10*vw);
}

function draw() {
  background(0,0,0,30);
	fill(255);
  wordEffect("FUTURE", screens[0].cntX, screens[0].cntY);
  wordEffect("NOW", screens[1].cntX, screens[1].cntY);

 /*important!*/ posterTasks(); // do not remove this last line!  
} 

function windowScaled() { // this is a custom event called whenever the poster is scalled
  textSize(10*vw);
}

function wordEffect(word,x,y) {
let textBounds = font.textBounds(word, 0, 0, textSize());
  push()
    translate(x, y);
    rotate(posNormal.x*3*PI);
    text(word,0,-textBounds.h/3)
  pop();
}






