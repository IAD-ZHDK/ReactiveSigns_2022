//

// There are three screens (screen1, screen2, screen3), for which you can access the coordinates with the following variables. width/2 and height/2 can still be used in reference to the combined screen layout.

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

//vh : 1 percent of viewport height

//

// These variables hold the coordinates of a tracker point, based on the camera and blob detection. When no camera is available the information will be replaced by the mouse.

//

// position.x : represents left to right movement of one user

// position.y : represents up and down movement of one user. Use sparingly, as this movement is less intuitive.

// position.z : represents distance from the user to the screen. Use sparingly, as users will be guided left to rignt in the exhibition.

//

// posNormal.x, posNormal.y, posNormal.z : The same as "position" but normalised. i.e values between 0 and 1.

//

//

//let font;

let multiplicator = 1;
let devider = 6;

let tilesX = 405/2;
let tilesY = 240/2;

let tileW = 1; //this defines the width of the tiles. that is, the width of window divided by number of tiles

let tileH = 1;

let img;
let polygonImg;
let imgArray = [];
//let c = color();
function preload() {
  font = loadFont("barlow_condensed.otf");
  img = loadImage("FINAL_2212.png");
}

function polygonImage(radius) {
  let pg = createGraphics(radius*2.5, radius*2.5);
  pg.noStroke();
  let x = radius;
  let y = radius;
  let npoints = 6
  let angle = TWO_PI / npoints;
  pg.fill(0);
  pg.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    pg.vertex(sx, sy);
  }
  pg.endShape(CLOSE);
  let polyImg = createImage(pg.width,pg.height);
  polyImg.copy(pg, 0, 0, pg.width, pg.height, 0, 0, pg.width, pg.height);
  return polyImg
}


function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line.
  img.resize(tilesX, tilesY);
  textFont(font);
  setupOSC(false); // impartant! Don't remove this line. The boolean argument turns the depthstream on and off
  setupImageArray()
  noCursor();
  noStroke();
  fill(0);
  rectMode(CENTER);
  polygonImg = polygonImage(vw*0.25);
  //textAlign(CENTER,CENTER);
  //textSize(10*vw);
}

function  setupImageArray() {
  for (let x = 0; x < img.width; x++) {
    imgArray[x] = [];
    for (let y = 0; y < img.height; y++) {
      c = img.get(x, y);
      let bri = brightness(c);
      if (bri>=100) {
      imgArray[x][y] = 1;
      } else {
      imgArray[x][y] = 0;
      }
    }
  }
  tilesX = img.width;
  tilesy = img.height;

   tileW = width / tilesX; //this defines the width of the tiles. that is, the width of window divided by number of tiles
   tileH = height / tilesY;
}


function draw() {
  background(255);

  let mag = map(posNormal.x, 0.33, 1.0, 0.0, 1.0);
  mag = constrain(mag, 0.0, 1.0);
  mag = mag * 1050; // magnifier

  //let percent = map(position.x, 0, width, 0, 100);

  let mappedVal = constrain(map(position.x, width/6, width / 3, 0, height / 2), 0, height / 2) - height / 2;

  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
     // let X = Math.floor((x/tilesX)*imgArray.length);
     // let Y = Math.floor((y/tilesY)*imgArray[x].length);
      let bri = imgArray[x][y];
      if (bri == 1) {
        //let waveX = sin(radians(frameCount + x));
        let waveX = Math.sin(radians(frameCount*0.1 + x*4 + y*1));
        let waveY = Math.cos(radians(frameCount*0.1 + x*2 + y*1));

      
        let newX = x * tileW + waveX * mag
        let newY = mappedVal + y * tileH + waveY * mag
   
        if (newX>-40 && newX<width+40 && newY>-40 && newY < height+40) {
       image(polygonImg, newX, newY)
      //polygon( newX,newY, vw*0.25, 6);
        /* rect(
          x * tileW + waveX * mag,
          mappedVal + y * tileH + waveY * mag,
          5 + 1,
          5 + 1
        );
        */
      }
      }
  }
}
posterTasks(); // do not remove this last line!
}


function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowScaled() {
  // this is a custom event called whenever the poster is scalled
  textSize(10 * vw);
  tileW = width / tilesX; //this defines the width of the tiles. that is, the width of window divided by number of tiles
  tileH = height / tilesY;
  polygonImg = polygonImage(vw*0.25);
 // img.resize(width, height);
}
