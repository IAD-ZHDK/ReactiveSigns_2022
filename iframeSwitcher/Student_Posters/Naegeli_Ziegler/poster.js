let _ease = 0.2;

let _frame;
let _frameAmount = 50;

let _H;
let _E;
let _A;
let _T;

let _bg = 210; // COLOR OF BACKGROUND
let _fg = 0; // COLOR OF FOREGROUND

var counter = 0;

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(false);  // impartant! Don't remove this line. The boolean argument turns the depthstream on and off
  noStroke();
	strokeCap(SQUARE);
	_E = new Letter(screen1.w,_ease, _bg, _fg, "E");
	_T = new Letter(screen1.w,_ease, _bg, _fg, "T");
	_H = new Letter(screen1.w,_ease, _bg, _fg, "H");
	_A = new Letter(screen1.w,_ease, _bg, _fg,"A");

  _triSide = 7 * vh;

  // //setup for letting it play autonomously
  // timer = createP('timer');
  // _frame = 0;
  // setInterval(frameAdjust, 500);

}

function draw() {
  let invertedPosX = (width-position.x)
   // Luke: added larger non-active space at start and end 
  let newPosition = constrain(invertedPosX, 0+(vw*6), width-(vw*6));
  newPosition = map(newPosition, 0+(vw*6), width-(vw*6), 0, width);

  _frame = _frameAmount-int(newPosition/(width/_frameAmount));
  if(tracking==false){
    _frame = _frameAmount;
  }

  background(_bg);
  letterFrame();

  posterTasks(); // do not remove this last line!  

 // print(_frame);
} 

function windowScaled() { // this is a custom event called whenever the poster is scaled
  //height = (vh*33);
}

// //for letting it play autonomously
// function frameAdjust () {
//   timer.html(_frame);
//   if (_frame < _frameAmount){
//     _frame++;
//   } else {
//     _frame = 0;
//   }
// }