// dataFiltered : represents an array of depth data. Only available with setupOSC(true)

// depthW: The horizontal resolution of the dataFiltered aray

// depthH: The vertical resolution of the dataFiltered aray

// stolenlaw



let brickLength;
let brickLengthWithSpace;
let brickHeightWithSpace;
let brickRows;
let brickColumns;
let brickHeight;
let brickDeep;
let totalWidth;
let totalHeight;

let bricks = [];
isLetter = false;
let shiftValue =0;
let canvas;
let onlyLetters = []
let brickTextTexture;
let brickLetters =[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,0,0,0,0,0,1,1,1,1,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,1],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,1],
  [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
  [0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1],
  [0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,1],
  [0,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1],
  [0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1],
  [0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1],
  [0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,1],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1],
  [0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,0,1,0,0,0,1,0,1,1,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,1,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,0,1,0,0,1,0,0,1,0,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,1,0,0,1,0,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]


let myFont;
function preload() {
    myFont = loadFont('barlow_condensed.otf');
}

function setup() {
  canvas = createCanvas(getWindowWidth(),getWindowHeight(), WEBGL); // impartant! Don't modify this line.
  setupOSC(true); // Don't remove this line. 1 argument to turn the depthstream on and off
  textFont(myFont); // impartant! WEBGL has no defualt font  //
  //brick = new Brick(brickLength);
  //brick1 = new Brick(25);
  //brickLength = 2.7*vw;

 //brickLengthWithSpace =brickLength/10+brickLength;
  //brickHeightWithSpace = (brickLength/2)/10+(brickLength/2);

  brickRows = brickLetters.length;
  brickColumns = brickLetters[0].length; // use 64
  brickLengthWithSpace = width/brickColumns;
  brickLength = brickLengthWithSpace-(brickLengthWithSpace/10);
  brickHeightWithSpace = height/brickRows;
  brickHeight = brickHeightWithSpace-(brickHeightWithSpace/10);
  //brickHeight = brickLength/2;
  brickDeep = brickHeight/2;
  totalWidth = brickColumns*brickLengthWithSpace;
  totalHeight = (brickRows+1)*(brickHeightWithSpace);
  noStroke();
  fill(255);
  for(let k = 0; k < brickRows; k++){
    for(let i = 0; i < brickColumns; i++){
      if(brickLetters[k][i] == 1){
        let x = brickLengthWithSpace*i + (k%2 * -brickLengthWithSpace/2)
        let y = brickHeightWithSpace*k 
        let cordinates = [x,y]; // x, y, offset
        onlyLetters.push(cordinates)
      }
    }
  }
  console.log(brickRows);
  ortho();


 //brickTextTexture.image(img1, 0, 0, textTexture1.width, cylinderHeight);
  // createBrickImage()
 setBackgroundCSS() 
}


function setBackgroundCSS()  {
  //const canvas =  document.getElementsByClassName("p5Canvas");
 // cnv.id('mycanvas');
  console.log("canvas"+canvas.id());
  document.getElementById(canvas.id()).style.backgroundImage = "url('background.png')";
  document.getElementById(canvas.id()).style.backgroundSize = "100% 100%";
}

function createBrickImage() {
 // crate 2d texture of non moving bricks
 brickTextTexture = createGraphics(width*5,height*5);
 brickTextTexture.background(0);

 let W_Spaced = brickTextTexture.width/brickColumns;
 let W = W_Spaced-(W_Spaced/10);
 let H_Spaced = brickTextTexture.height/brickRows;
 let H = H_Spaced-(H_Spaced/10);

 for(let k = 0; k < brickRows; k++){
  for(let i = 0; i < brickColumns; i++){
      let x = W_Spaced*i +(k%2 * -W_Spaced/2)
      let y = H_Spaced*k 
     // fill(255,0,0)
      brickTextTexture.rect(x,y,W,H)
    }
}
brickTextTexture.save('background.png');
}

function draw() {
  clear();
  //push()
  // image(brickTextTexture);
  //plane(brickTextTexture.width, brickTextTexture.height);
  //pop();
  pointLight(255, 255, 255,  0, 200, 0)
  directionalLight(255, 255, 255,  40, 40, -100)
  push()
  translate(-totalWidth/2, -totalHeight/2);
  for(let i = 0; i < onlyLetters.length; i++){
    push()
    let x = onlyLetters[i][0];
    let y = onlyLetters[i][1];
    let depth = getDepth(x,y);
    translate(x, y, depth);
    //plane(brickLength, brickHeight);
    box(brickLength, brickHeight, brickDeep)
    pop();
  }
pop();

  posterTasks(); // do not remove this last line!  
}

function getDepth(x, y) {
  let depth = 0
  if (oscSignal)  {
    try {
    //newPosition = width - position.x; ////////// LUKE: added to invert when using the
       let depthX = floor((x/width) * depthW)
       let depthY = floor((y/height) * depthH)
       let index = (depthY*depthW)+depthX;
          if (dataFiltered[index] > 0.0) {
              depth = dataFiltered[index] * 1.4;           
          }
    } catch (e) {
    }
  } else {
      depth = dist(position.x,position.y,x,y)*0.10 
    }
  return depth;
}

function drawOld() {
  //shiftValue = position.x;
  // background(255,0,100);
  pointLight(255, 255, 255,  0, 200, 0)
  //directionalLight(255, 255, 255,  40, 40, -100)
  //directionalLight(255, 255, 255,  40, 40, -100)
  //circle(position.x,position.y,10);
  background(0);
  push();
  translate(-115.5*vw, -109*vh, -120*vh);
  push();
  // platziert bricks
  for(let k = 0; k < brickColumns; k++){
    for(let i = 0; i < brickRows; i++){
      let letter = false;
      push();
      if(i < 55 && k < 63){ //use 55 and 63
        if(brickLetters[k][i] == 1){
        //  translate(0,0,-(shiftValue));
        letter = true;
        }
      }
      if (oscSignal)  {
        try {
        //newPosition = width - position.x; ////////// LUKE: added to invert when using the
           let depthX = depthW-floor((i/brickRows) * depthW)
           let depthY = floor((k/brickColumns) * depthH)
           let index = (depthY*depthW)+depthX;
              if (dataFiltered[index] > 0.0) {
               // newPosition
                if (letter == true) {
                  //fill(0)
                  translate(0,0,-dataFiltered[index]);              // change factor to 2000 for the bricks to disappear
                } else{
                }
              }
        }catch (e) {
        }
      } else {
        if (letter == true) {
          let brickX = i*brickLengthWithSpace;
          let brickY = k*brickHeightWithSpace;
          let distance = dist(position.x,position.y,brickX,brickY)*0.01
          translate(0,0,-distance);    
        }
      }
  
      //brick.place();
      box(brickLength, brickHeight, brickDeep)
      pop();
 
      translate(brickLengthWithSpace, 0);
    }
    // macht, dass alle brickRows am gleichen Ort beginnen
    translate(-brickRows*brickLengthWithSpace,0);

    // versetzte brick reihen
    if(k%2 == 0){
      translate(-brickLengthWithSpace/2,0);
    }else{
      translate(brickLengthWithSpace/2,0);
    }
    translate(0,brickHeightWithSpace);
  }

  pop();
  pop();

  posterTasks(); // do not remove this last line!  
}