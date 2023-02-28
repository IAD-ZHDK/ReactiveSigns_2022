
let tileWidth;
let gridResolutionW = 25;
let gridResolutionH = 25; // updated after setup
let imagePixels = [];
let b0 = 0.55342686;
let b1 = 1 - b0;
let flickerFlag = false;
let flickerSpeed = 199;
let centerTextFlag = true;
let tileImagesA = [];
let tileImagesB = [];
let typoBuffer; // storing image for 2nd typography

let GridArray = [];
//let GridArray2 = [];
let ShadowVertsArray = [];
let BackgroundTextArray = [];
let midText;

function preload() {
  midText = loadImage("assets/FindOutNew.png");
  bgText = loadImage("assets/Green_06.9.png");
}

function setup() {

  /*important!*/createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line.
  /*important!*/setupOSC(true); // important! Don't remove this line. The boolean argument turns the depthstream on and off
  frameRate(20)
  setupGrid(gridResolutionW);
  createTileImages(tileWidth)
  createTypo2Array();
}
function windowScaled() {
  setupGrid(gridResolutionW);
  createTileImages(tileWidth)
  createTypo2Array();
}

function createTileImages(w) {
  // create a set of black and white 1/4 circles in 4 orentiations
  tileImagesA[0] = createTile(0, 0, w, 0, 255)
  tileImagesA[1] = createTile(w, 0, w, HALF_PI, 255)
  tileImagesA[2] = createTile(w, w, w, PI, 255)
  tileImagesA[3] = createTile(0, w, w, HALF_PI + PI, 255)
  tileImagesB[0] = createTile(0, 0, w, 0, 0)
  tileImagesB[1] = createTile(w, 0, w, HALF_PI, 0)
  tileImagesB[2] = createTile(w, w, w, PI, 0)
  tileImagesB[3] = createTile(0, w, w, HALF_PI + PI, 0)

}

function createTile(x, y, diameter, angle, _color) {
  let img = createGraphics(diameter, diameter);
  img.background(_color)
  img.fill(255 - _color)
  img.arc(x, y, diameter * 2, diameter * 2, 0 + angle, HALF_PI + angle);
  return img;
}

//get background greenscreen image and convert to array for tiles
function createTypo2Array() {
  imagePixels = new Array();
  typoBuffer = createGraphics(gridResolutionW * 2, gridResolutionH);
  typoBuffer.image(bgText, 0, 0, gridResolutionW * 2, gridResolutionH);
  typoBuffer.loadPixels();
 // imagePixels.push()
  //let d = pixelDensity();
  //check all pixels and add the white ones to an array with coordinates
  
  for (let x = 0; x < gridResolutionW * 2; x++) {
    for (let y = 0; y < gridResolutionH; y++) {
			let pixelColor = typoBuffer.get(x, y); 
			let r = (red(pixelColor) > 200 ); //lets just take the first color channel
			imagePixels.push(r);
    }
  }
  
 //image(typoBuffer,0,0);
}
//based on imageCreate() take array and print tiles with VertCreate class

function backgoundText() {
  for (let i = 0; i < GridArray.length; i++) {
   if (imagePixels[i] == true) {
    GridArray[i].displayColor = !GridArray[i].colorState;
   }
  } 
}




function draw() {
  background(100)
  flickerGrid(); // need to optimise this 
//  backgoundText();
  shadowFollow();
  drawGrid();
  centerText();
 // imageBackground();
  /*important!*/posterTasks(); // do not remove this last line!
}

//placing and sizing text on canvas with a png
function centerText() {
  if (centerTextFlag == true) {
    let lightLastRow = int(gridResolutionW / 2) - 6;
    let lightHalfHeight = int(gridResolutionH / 2);
    let xPos = lightLastRow * tileWidth;
    let yPos = lightHalfHeight * tileWidth;
    image(midText, xPos, yPos, 37 * tileWidth, 5 * tileWidth);
  }
}

//get image form camera and draw shadow in screen
function shadowFollow() {
  if (typeof dataFiltered !== 'undefined' && dataFiltered.length > 0) {
    for (let i = 0; i < GridArray.length; i++) {
      let depthX = floor((GridArray[i].x / width) * depthW)
      let depthY = floor((GridArray[i].y / height) * depthH)
      let index = ((depthY * depthW) + depthX);
      if (dataFiltered[index] > 40.0) {
        GridArray[i].flipedFlag = true;
        GridArray[i].displayColor = !GridArray[i].colorState;
      }  else {
        GridArray[i].displayColor = GridArray[i].colorState;
      }
      if (GridArray[i].flipedFlag == true && imagePixels[i] == true) {
        // show typo if tyle has been activated one time
        GridArray[i].displayColor = !GridArray[i].colorState;
      } 

    }
  }
}
//get coordinates & draw from first screen for grid
function setupGrid(gridRes) {
  tileWidth = screens[0].w / gridRes;
  gridResolutionH = Math.ceil(screens[0].h / tileWidth);
  for (let i = 0; i < gridResolutionW * 2; i++) { // it was missing the < here, making big performance problems!
    let leftside = (i * tileWidth < screens[0].w);
    for (let j = 0; j < gridResolutionH; j++) { // it was missing the < here, making big performance problems!
      GridArray.push(
        new VertCreate(
          i * tileWidth,
          j * tileWidth,
          leftside,
          int(random(4)),
          tileWidth
        )
      );
    }
  }
 // console.log(GridArray.length)
}


function flickerGrid() {
  //check where the person is to reset the screen
  if (tracking == true) {
    flickerSpeed = 199;
    flickerFlag = false;
    centerTextFlag = false;
  } else if (tracking == false && flickerFlag === false) {
    flickerSpeed = 50;
    flickerFlag = true;
  } else if (tracking == false && flickerFlag === true) {
    if (int(random(5)) == 1) {
      centerTextFlag = true;
    }
    if (flickerSpeed < 195) {
      flickerSpeed += 2;
    } else {
      flickerSpeed = 199;
    }
  }

  for (let i = 0; i < 210-flickerSpeed; i++) {
    let flickerGrid = int(random(GridArray.length));
      GridArray[flickerGrid].state = int(random(4));
      GridArray[flickerGrid].flipedFlag = false;
  }
}



//redraws background grid with same info every frame + flicker
function drawGrid() {
  for (let i = 0; i < GridArray.length; i++) {
    GridArray[i].drawSimple();
    // GridArray2[i].draw();
  }
}
