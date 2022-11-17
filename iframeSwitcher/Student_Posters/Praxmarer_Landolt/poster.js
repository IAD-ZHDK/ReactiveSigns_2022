
// dataFiltered : represents an array of depth data. Only available with setupOSC(true)
// depthW: The horizontal resolution of the dataFiltered aray
// depthH: The vertical resolution of the dataFiltered aray

let cylinderRadius;
let cylinderHeight; 
let cylinderRes = 2048;
let hcylinderspacing;
let wcylinderspacing;
let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let textTexture;
let CylinderOne;
let CylinderTwo;

let myFont;
function preload() {
  myFont = loadFont('barlow_condensed.otf');

  img1 = loadImage('Images/First_Test_Texture_Condor_Image_1.png');
  img2 = loadImage('Images/First_Test_Texture_Condor_Image_2.png');
  img3 = loadImage('Images/First_Test_Texture_Condor_Image_3.png'); 
  img4 = loadImage('Images/First_Test_Texture_Condor_Image_4.png'); 
  img5 = loadImage('Images/First_Test_Texture_Condor_Image_5.png'); 
  img6 = loadImage('Images/First_Test_Texture_Condor_Image_6.png');

}

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight(), WEBGL); // impartant! Don't modify this line. 
  setupOSC(false); // Don't remove this line. 1 argument to turn the depthstream on and off
  textFont(myFont); // impartant! WEBGL has no defualt font
  windowScaled();
  angleMode(DEGREES);
}

function setupCylenders() {
  Cylinder1 = new cylinderStack(screen3.cntX + cylinderRadius+hcylinderspacing, screen3.cntY, textTexture6, screen3.x*2.5);
  Cylinder2 = new cylinderStack(screen3.cntX - cylinderRadius-hcylinderspacing, screen3.cntY, textTexture5, screen3.x*1.5);
  
  Cylinder3 = new cylinderStack(screen2.cntX + cylinderRadius+hcylinderspacing, screen2.cntY, textTexture4, screen2.x + (screen3.x*1.5));
  Cylinder4 = new cylinderStack(screen2.cntX - cylinderRadius-hcylinderspacing, screen2.cntY, textTexture3, screen2.x/2);
  
  Cylinder5 = new cylinderStack(screen1.cntX + cylinderRadius+hcylinderspacing, screen1.cntY, textTexture2, screen1.x/2);
  Cylinder6 = new cylinderStack(screen1.cntX - cylinderRadius-hcylinderspacing, screen1.cntY, textTexture1, screen1.x*0.62);
  //0.833333333333334
}

let newPosition

function draw() {
  background(0);
  newPosition = constrain(position.x, -(width/2)+(vw*10), width/2-(vw*10));
  newPosition = map(newPosition, -(width/2)+(vw*10), width/2-(vw*10), -width/2, width/2);
  fill(255,0,0)
  //circle(newPosition,position.y,10, -400);
  Cylinder1.show();
  Cylinder2.show();
  Cylinder3.show();
  Cylinder4.show();
  Cylinder5.show();
  Cylinder6.show();
 posterTasks(); // do not remove this last line!
}

class cylinderStack {
  constructor(X, Y, Texture, R) {
    this.T = Texture;
    this.X = X;
    this.Y = Y;
    this.ry = 270; // start angle for animatino
    this.R = this.X ; // center point X for start and end of user activation
    this.angle = 90;
    this.range = vw*3;
    this.inputContol = 0;
    this.rotationEased = [0, 0,0];
    this.newRotation = [0, 0, 0];
    this.randomFactor = round(random(-1,1));
    this.trackingFlag = true;
  }
    show() {
      texture(this.T);
    noStroke();
      if (tracking) {
        this.inputContol = newPosition;
        let inputX = constrain(this.inputContol,this.R-(this.range/2),this.R+(this.range/2));
        inputX = map(inputX,this.R-(this.range/2),this.R+(this.range/2),0,100);
        let easedValue = easeInOutBack(inputX, this.ry, this.angle-this.ry, 100);
        this.newRotation = [easedValue,easedValue,easedValue];
        //
        this.rotationEased = this.rotationEased.map(x => x * 0.9); 
        this.newRotation = this.newRotation.map(x => x * 0.1); 
        // would be good to have a library for matrix math here. 
        this.rotationEased[0] += this.newRotation[0];
        this.rotationEased[1] += this.newRotation[1]
        this.rotationEased[2] += this.newRotation[2]
        this.trackingFlag = tracking;
      } else {
        if (this.trackingFlag != tracking) {
          this.trackingFlag = tracking;
          this.newRotation = [Math.random()*360,Math.random()*360,Math.random()*360];  
        }
         //
        this.newRotation[0] += 0.5;
        this.newRotation[1] += 0.5;
        this.newRotation[2] += 0.5;

        this.rotationEased = this.rotationEased.map(x => x * 0.99); 
        let goalRotation = this.newRotation.map(x => x * 0.01); 
        // would be good to have a library for matrix math here. 
        this.rotationEased[0] += goalRotation[0];
        this.rotationEased[1] += goalRotation[1]
        this.rotationEased[2] += goalRotation[2]

        for(let i=0;i<this.rotationEased.length;i++) {
          if (this.rotationEased[i]>360) {
            this.newRotation[i] = abs(this.rotationEased[i]-this.newRotation[i]) // maintain velocity after 360 wrap around
            this.rotationEased[i] = 0;
          }
        }
     
      }
    
      push();
      translate(this.X, this.Y - cylinderHeight - wcylinderspacing, 0);
      rotateY(this.rotationEased[0]);
      cylinder(cylinderRadius, cylinderHeight, cylinderRes,1);
      pop();
      //
      push();
      translate(this.X, this.Y , 0);
      rotateY(this.rotationEased[1]);
      cylinder(cylinderRadius, cylinderHeight, cylinderRes, 1);
      pop();
      //
      push();
      translate(this.X, this.Y + cylinderHeight + wcylinderspacing , 0);
      rotateY(this.rotationEased[2]);
      cylinder(cylinderRadius, cylinderHeight, cylinderRes, 1);
      pop();
    }
}
/*
t: This parameter holds the specified time when animation will start. For example, if value of t is 0, it means animation is just started.
b: This parameter holds the specified starting position of the object on x-axis. For example, if value of b is 10, it means the starting position of the objects on x-coordinate is 10.
c: This parameter holds the specified change in value for the object. For example, if value of c is 30, it means, the object has to move 30 to the right, ending at 40.
d: This parameter holds the specified duration of the whole process. For example, if the value of d is 2, it means, the object has 2 second to perform this motion from 10 to 40.
*/
function easeInOutBack (t, b, c, d) {
  let s = ((1.70158)*1.6);
  if ((t /= d / 2) < 1) 
    return c / 2 * 
      (t * t * (((s *= ((1.525)*2)) + 1)
                * t - s)) + b;
  return c / 2 * 
    ((t -= 2) * t * 
     (((s *= (1.525)) + 1) * t
                + s) + 2) + b;
}


function windowScaled() {
  ortho();
  hcylinderspacing = vh;
  wcylinderspacing = vw;
  cylinderHeight = height*0.31; // Originaly: height/3.5;
  cylinderRadius = (screen1.w/4)-hcylinderspacing;
  textTexture1 = createGraphics((PI*cylinderRadius*2),cylinderHeight);
  textTexture1.background(200);
  textTexture1.image(img1, 0, 0, textTexture1.width, cylinderHeight);
  textTexture2 = createGraphics((PI*cylinderRadius*2),cylinderHeight);
  textTexture2.background(200);
  textTexture2.image(img2, 0, 0, textTexture2.width, cylinderHeight);
  textTexture3 = createGraphics((PI*cylinderRadius*2),cylinderHeight);
  textTexture3.background(200);
  textTexture3.image(img3, 0, 0, textTexture3.width, cylinderHeight);
  textTexture4 = createGraphics((PI*cylinderRadius*2),cylinderHeight);
  textTexture4.background(200);
  textTexture4.image(img4, 0, 0, textTexture4.width, cylinderHeight);
  textTexture5 = createGraphics((PI*cylinderRadius*2),cylinderHeight);
  textTexture5.background(200);
  textTexture5.image(img5, 0, 0, textTexture5.width, cylinderHeight);
  textTexture6 = createGraphics((PI*cylinderRadius*2),cylinderHeight);
  textTexture6.background(200);
  textTexture6.image(img6, 0, 0, textTexture6.width, cylinderHeight);  
  setupCylenders();
}