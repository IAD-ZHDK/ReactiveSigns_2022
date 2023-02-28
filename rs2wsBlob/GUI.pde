
void displayInterface(PImage depth, float depthWidth, float depthHeight) {
  background(55);
  stroke(0, 255, 0);
  image(depth, 0, 0, width, height); 

  if (editable) {
    stroke(0xff08a2cf);
  } else {
    stroke(0xff003652);
  }
  line(0, floor(height*cropY), width, floor(height*cropY));
  line(0, floor(height*cropY)+floor(height*cropHeight), width, floor(height*cropY)+floor(height*cropHeight)); // not working
  line(floor(width*cropX), 0, floor(width*cropX), height);
  line(floor(width*cropX)+floor(width*cropWidth), 0, floor(width*cropX)+floor(width*cropWidth), height);  // not working
  //
  push();
  translate(floor(width*cropX), floor(height*cropY));
  fill(0xff08a2cf);
  circle(singlePointAverage.x*depthWidth*DECIMATION, singlePointAverage.y*depthHeight*DECIMATION, singlePointAverage.z*10);
  for (int i = 0; i<multiPointAveraged.size(); i++) {
    PVector temp = multiPointAveraged.get(i);
    fill(255, 100, 0);
    circle(temp.x*depthWidth*DECIMATION, temp.y*depthHeight*DECIMATION, temp.z*10);
  }
  pop();
  // display information
  fill(55, 100);
  noStroke();
  rect(0, 0, width, 130);
  fill(255);
  textSize(15);
  text("Image Size: " +depthWidth + " x " + depthHeight, 30, 30);
  text("Serving: ws://localhost:" + PORT + "/", 30, 60);
  text("trackingAtive: " + trackingAtive + "", 30, 90);
  text("cameraFlip: " + cameraFlip + "", 30, 120);
  surface.setTitle("Realsense 2 WebSocket - " + round(frameRate) + " FPS");
  if (editable) {
    fill(0xff08a2cf);
    text("'a' + click to set top-left", 300, 30);
    text("'s' + click to set btm-right", 300, 50);
    text("restart required after edit", 300, 80);
  }
}
void controlEvent(ControlEvent theControlEvent) {
  if (theControlEvent.isFrom("rangeController") ) {
    lowDistance = (theControlEvent.getController().getArrayValue(0));
    highDistance = (theControlEvent.getController().getArrayValue(1));
    if (lowDistance>=highDistance) {
      highDistance =lowDistance + 0.01;
    }
  }
  if (cameraRunning) {
    thresholdFilter.setMinDistance(lowDistance);
    thresholdFilter.setMaxDistance(highDistance);
  }
  CSVData.saveData();
}
