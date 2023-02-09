let row1
let row2
let row3

let walkingDist

let infoText = "The wafer-thin membrane of the NORM is dancing through time. Finding new steps adapting like a mime — How does the NORM of TOMORROW look like? — Foreign today normal TOMORROW. So better be mindful or else you’ll feel sorrow — How will you shape the NORM of TOMORROW? — The wafer-thin membrane of the NORM is dancing through time. Finding new steps adapting like a mime — How does the NORM of TOMORROW look like? — Foreign today normal TOMORROW. So better be mindful or else you’ll feel sorrow — How will you shape the NORM of TOMORROW? — "

let font
let lineHeight
let rowHeight
let lineAdjust = 1

let textBox
let textWidth
let speed = 0.7

let textMove = 0
let lastPos = []
let walkSpeed = 0.7

function preload() {
  row1 = loadImage("rows/SVG/row1.png")
  row2 = loadImage("rows/SVG/row2.png")
  row3 = loadImage("rows/SVG/row3.png")
  font = loadFont('fonts/Futura-Boo.otf')
}

function setup() {
   /*important!*/ createCanvas(getWindowWidth(), getWindowHeight()); // Don't remove this line. 
   /*important!*/ setupOSC(false);  // Don't remove this line. The boolean argument turns the depthstream on and off
  
   textFont(font)
   fontSize = 1.33*vw
   textSize(fontSize);
   textAlign(LEFT, TOP)
   lineHeight = 0.2*vw
   rowHeight = height/3 
   
   textBox = font.textBounds(infoText, 0, 0, fontSize, LEFT, TOP)
   textWidth = textBox.w
}

function draw() {
  blendMode(BLEND)
  background(0)

  let row1X = constrain(map(posNormal.x, 0.1, 0.9, -width, 0), -width, 0)
  let row2X = constrain(map(posNormal.x, 0.1, 0.9, -2*width, 0), -2*width, 0)
  let row3X = constrain(map(posNormal.x, 0.1, 0.9, -3*width, 0), -3*width, 0)
 
 
  image(row1, row1X, 0, width*2, rowHeight)
  image(row2, row2X, rowHeight, width*3, rowHeight)
  image(row3, row3X, rowHeight*2, width*4, rowHeight)

  fill(255)
  if(tracking == true){
    if(lastPos.length >= 5)
    {
      lastPos.splice(0,1)
    }
    lastPos.push(position.x)
    textMove += Math.sqrt(sq(lastPos[lastPos.length-1] - lastPos[0]))*walkSpeed
  
  }else{
    textMove += 1*deltaTime/10
  }

  text(infoText, -(textMove*speed%textWidth/2), rowHeight-lineAdjust*vw)
  text(infoText, -((textMove+textWidth/4)*speed%textWidth/2), 2*rowHeight+0.58*vw-lineAdjust*vw)
  
  blendMode(EXCLUSION)

  let yI = easeInOutQuint(constrain(posNormal.x, 0, 1))
  rect(0, (1-yI)*height, width,  yI*height) 
  
  /*important!*/ posterTasks(); // do not remove this last line! 
} 

function windowScaled() { // this is a custom event called whenever the poster is scalled
  fontSize = 1.33*vw
  textSize(fontSize); 
  lineHeight = 0.2*vw
  rowHeight = (height-(2*(fontSize+lineHeight*2-vw)))/3
  textBox = font.textBounds(infoText, 0, 0, fontSize, LEFT, TOP)
  textWidth = textBox.w
}

function easeInOutQuint(x) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

/* function keyPressed(){
  print(lastPos[0])
  print(position)
} */