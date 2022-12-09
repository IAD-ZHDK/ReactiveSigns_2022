let font;
function preload() {
  font = loadFont('barlow_condensed.otf')
}

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(false);  // impartant! Don't remove this line. The boolean argument turns the depthstream on and off
  textFont(font);
  textAlign(CENTER,CENTER);
  textSize(5*vw);
}

function draw() {
  background(0,0,0,70);
	fill(255);
 // wordEffect("", screen1.cntX, screen1.cntY);
 if (!oscSignal) {
  wordEffect("Check \n camera \n connection \n and restart",  screens[0].cntX, screens[0].cntY);
  wordEffect("Check \n camera \n connection \n and restart",  screens[0].cntX, screens[0].cntY);
 } else {
  wordEffect("loading..", screens[0].cntX, screens[0].cntY);
  wordEffect("loading..", screens[1].cntX, screens[1].cntY);
 }
  //wordEffect("", screen3.cntX, screen3.cntY);
  ////////////////
  posterTasks(); // do not remove this last line!  
} 

function windowScaled() { // this is a custom event called whenever the poster is scalled
  textSize(5*vw);
}

function wordEffect(word,x,y) {
  // text bounds can be helpful for exact positioning of text. 
  // let textBounds = font.textBounds(word, 0, 0, textSize());
  // rect(textBounds.x, textBounds.y, textBounds.w, textBounds.h);
  push()
    translate(x, y);
    //rotate(posNormal.x*3*PI);
    text(word,0,0)
  pop();
}






