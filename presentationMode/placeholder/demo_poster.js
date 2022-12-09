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

 if (!oscSignal) {
  wordEffect("Check \n camera \n connection \n and restart",  screens[0].cntX, screens[0].cntY);
  wordEffect("Check \n camera \n connection \n and restart",  screens[0].cntX, screens[0].cntY);
 } else {
  wordEffect("loading..", screens[0].cntX, screens[0].cntY);
  wordEffect("loading..", screens[1].cntX, screens[1].cntY);
 }
  posterTasks(); // do not remove this last line!  
} 

function windowScaled() { // this is a custom event called whenever the poster is scalled
  textSize(5*vw);
}

function wordEffect(word,x,y) {
  // text bounds can be helpful for exact positioning of text. 
  push()
    translate(x, y);
    text(word,0,0)
  pop();
}






