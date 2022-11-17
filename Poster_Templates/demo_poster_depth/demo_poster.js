
// dataFiltered : represents an array of depth data. Only available with setupOSC(true)
// depthW: The horizontal resolution of the dataFiltered aray
// depthH: The vertical resolution of the dataFiltered aray


function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(true); // Don't remove this line. 1 argument to turn the depthstream on and off
}

function draw() {
  background(0);
  lineEffect()
  //pixelEffect()
  //circle(width-position.x,position.y,100);
  ///////////////
  posterTasks(); // do not remove this last line!  
}

function pixelEffect() {
  fill(255);
  noStroke();
  let spaceX = width/depthW;
  let spaceY = height/depthH;
  	// loop through all the pixels in the depth image
  for (let i = 0; i<depthH; i+=2) {
    for (let j = 0; j<depthW; j+=2) {
      let index = (i*depthW)+j;
      if (dataFiltered[index] > 0.0) {
        rect(spaceX*j, spaceY*i, 5, 5);
      }
    }
  }
}


function lineEffect() {
  push();
  let spaceX = width/depthW;
  let spaceY = height/depthH;
  spaceX += vw*0.1;
  spaceY += vh*0.1;
  stroke(255);
	strokeWeight(2);
  noFill();
	// loop through all the pixels in the depth image
  translate(-vw*3,0)
  for (let y = 0; y<depthH; y+=4) {
		beginShape();
		for (let x = 0; x < depthW; x+=4) {
      let index = (y*depthW)+x;
			let h = dataFiltered[index]*vh*0.05; 
			curveVertex(x*spaceX, (y*spaceY)-h);
		}
		endShape();
	}
  pop();
}





