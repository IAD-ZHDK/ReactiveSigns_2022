
// dataFiltered : represents an array of depth data. Only available with setupOSC(true)
// depthW: The horizontal resolution of the dataFiltered aray
// depthH: The vertical resolution of the dataFiltered aray


function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(true); // Don't remove this line. 1 argument to turn the depthstream on and off
}

function draw() {
  background(0);
  //lineEffect()
  pixelEffect()

  ///////////////
  posterTasks(); // do not remove this last line!  
}

function pixelEffect() {
 
  //fill(rgbData);
  noStroke();
  let spaceX = width/depthW;
  let spaceY = height/depthH;
  	// loop through all the pixels in the depth image
  for (let i = 0; i<depthH; i+=2) {
    for (let j = 0; j<depthW; j+=2) {
      let index = (i*depthW)+j;
        if (dataFiltered[index] > 0.0) {
        fill(rData[index],gData[index],bData[index])
        rect(spaceX*j+dataFiltered[index]*0.2, spaceY*i+dataFiltered[index]*0.2, 5, 5);
      }
    }
  }
}







