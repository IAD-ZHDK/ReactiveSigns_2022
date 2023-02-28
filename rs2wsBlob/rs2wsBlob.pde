// realsense 2 websocket //<>// //<>//
// sends depth data from realsense to websockets
// written 2021 by Florian Bruggisser
// modified by Luke Franzke for the Reactive Signs Module, ZHdK
import processing.javafx.*;
import ch.bildspur.realsense.*;
import ch.bildspur.realsense.type.*;
import ch.bildspur.realsense.processing.*;
import controlP5.*;
import websockets.*;
import oscP5.*;
import gab.opencv.*;
import java.awt.Rectangle;
import java.io.*;
import java.util.Calendar;
import java.util.Collections;

ControlP5 cp5;

Range range;

boolean demoAlowed = true;
boolean editable = false;

boolean streamDepth = true;
boolean streamRGB = false;
final int WIDTH = 640;
final int HEIGHT = 480;
final int DECIMATION = 4;
final boolean recording = false; // used for creating demo footage
boolean replaying = false; // replay demo footage
int recordingCount = 0; //frame count for exported images
PImage[] recordingFrames;
int totalFrames = 0;
//
// croping 
//
float cropY =  0.3;// percent
float cropHeight =  0.5;// percent
float cropX =  0.05;// percent
float cropWidth = 0.9;// percent
//
// Websockets 
//
final int PORT = 8025;
WebsocketServer ws;
RealSenseCamera camera = new RealSenseCamera(this);
RSThresholdFilter thresholdFilter;
//
// camera params 
//
boolean cameraFlip = false;
boolean cameraHorizontal = true;
float minDistance = 0.0f;
float maxDistance = 10.0f;
float lowDistance = minDistance;
float highDistance = maxDistance;
float size = 0.5f;

byte[] depthBuffer = null;
byte[] rBuffer = null;
byte[] gBuffer = null;
byte[] bBuffer = null;
boolean cameraRunning = false;
long lastTrackingMillis = 0;
boolean trackingAtive = false;
PImage defualtFrame;
float filterRatio = .95f;

ArrayList<Contour> contours;
private OpenCV opencv;
PVector singlePointAverage = new PVector(0, 0);
ArrayList<PVector> multiPointAveraged;

CSVDataStore CSVData;

void setup() {
  size(640, 480, FX2D);
  frameRate(30);
  CSVData = new CSVDataStore(); // recover settings for distance camera
  setupOSC();
  setupCamera();

  opencv = new OpenCV(this, floor((WIDTH / DECIMATION)*cropWidth), floor((HEIGHT / DECIMATION) *cropHeight));  

  println("Sending data on: ws://localhost:" + PORT + "/");
  // GUI
  cp5 = new ControlP5(this);
  range = cp5.addRange("rangeController")
    // disable broadcasting since setRange and setRangeValues will trigger an event
    .setBroadcast(false)
    .setPosition(20, height-40)
    .setSize(floor(width*0.8), 20)
    .setHandleSize(20)
    .setRange(minDistance, maxDistance)
    .setRangeValues(lowDistance, highDistance)
    // after the initialization we turn broadcast back on again
    .setBroadcast(true);
  cp5.setFont(createFont("Courier", 10));


  // toggle for allowing adjustments with gui
  cp5.addToggle("toggle")
    .setPosition(20, height-90)
    .setSize(50, 20)
    .setValue(false)
    .setMode(ControlP5.SWITCH)
    .setCaptionLabel("Allow Edits")
    ;
    // toggle for rgb stream
   cp5.addToggle("streamRGB")
    .setPosition(100, height-90)
    .setSize(50, 20)
    .setValue(streamRGB)
    .setMode(ControlP5.SWITCH)
    .setCaptionLabel("Stream RGB")
    ;
  // for demo without camera
  defualtFrame = createImage(WIDTH / DECIMATION, HEIGHT / DECIMATION, RGB);
  animationFrame(defualtFrame);

  multiPointAveraged = new ArrayList<PVector>();
  multiPointAveraged.add(new PVector(0, 0, 0));
  println(multiPointAveraged.size());
}

void toggle(boolean theFlag) {
  editable = theFlag;
  setLock(cp5.getController("rangeController"), theFlag);
  println("a toggle event.");
}

void setLock(Controller theController, boolean theValue) {

  if (theValue) {
    theController.setColorBackground(color(255, 40));
    theController.setColorForeground(0xff003652);
  } else {
    theController.setColorBackground(color(100, 100));
    theController.setColorForeground(color(100, 40));
  }

  //theController.setMouseOver(false);
  theController.setLock(!theValue);
}

boolean setupOSC() {

  try {
    // setup websocket
    ws = new WebsocketServer(this, PORT, "/");
    // setup buffer
    depthBuffer = new byte[WIDTH / DECIMATION * HEIGHT / DECIMATION];
    rBuffer = new byte[WIDTH / DECIMATION * HEIGHT / DECIMATION];
    gBuffer = new byte[WIDTH / DECIMATION * HEIGHT / DECIMATION];
    bBuffer = new byte[WIDTH / DECIMATION * HEIGHT / DECIMATION];
  }

  catch (Exception ex) {
    println("Error starting up websocket: " + ex.getMessage(), 30, 30);
    return false;
  }
  return true;
}


boolean setupCamera() {


  try {
    // setup camera
    println("starting up camera...");
    camera.enableDepthStream(WIDTH, HEIGHT);
    camera.enableColorizer(ColorScheme.WhiteToBlack);
    camera.addDecimationFilter(DECIMATION);
    camera.enableColorStream(WIDTH, HEIGHT);
    // filters
    camera.addTemporalFilter();
    camera.addHoleFillingFilter();
    camera.enableAlign();
    // set distance filter (in meters)
    thresholdFilter = camera.addThresholdFilter(lowDistance, highDistance);
    camera.start();
    camera.readFrames();
    cameraRunning = true;
  }
  catch (Exception ex) {
    fill(255);
    textSize(20);
    println("Error starting up realsense: " + ex.getMessage(), 30, 30);
  }

  try {
    println("number devices available: "+RealSenseCamera.isDeviceAvailable());
  }
  catch (Exception ex) {
    println("no camera available");
    if (demoAlowed) {
      cameraRunning = false;
      if (!recording) {
        loadRecording();
      }
    } else {
      return false;
    }
  }

  return true;
}


void loadRecording() {
  for (int i=0; i<1000; i++) {
    File f = dataFile("recordings/outputImage"+i+".jpg");
    String filePath = f.getPath();
    boolean exist = f.length()>100;
    println(filePath, exist);
    if (!exist) {
      break;
    }
    totalFrames = i;
  }
  if (totalFrames >= 20) {
    replaying = true;
    recordingFrames = new PImage[totalFrames];
    for (int i=0; i<recordingFrames.length; i++) {
      try {
        recordingFrames[i] = loadImage("recordings/outputImage"+i+".jpg");
      } 
      catch (Exception ex) {
        totalFrames = i;
        break;
      }
    }
  }
}

void draw() {
  if (cameraRunning || demoAlowed) {
    drawCamara();
  } else {
    drawError();
  }
}

void mousePressed() {
  if (editable && keyPressed) {
    if (key == 'a' || key == 'A') {
      cropY =  float(mouseY)/height;// percent
      cropX =  float(mouseX)/width;// percent
    }
    if (key == 's' || key == 'S') {
      cropHeight =  (float(mouseY)/height)-cropY;// percent
      cropWidth =  (float(mouseX)/width)-cropX;// percent
    }
    /*
    
     float cropY =  0.3;// percent
     float cropHeight =  0.5;// percent
     float cropX =  0.05;// percent
     float cropWidth = 0.9;// percent
     */
  }
}


void drawError() {
  background(255, 0, 0);
  fill(55, 100);
  noStroke();
  rect(0, 0, width, 130);
  fill(255);
  textSize(25);
  text("Error starting camera \n1. Check the connection \n2. Close this window and restart computer", 30, 30);
  surface.setTitle("Realsense 2 WebSocket - " + round(frameRate) + " FPS");
}

void drawCamara() {
  
  PImage depth = getDepthImage();
  PImage rgbImage = camera.getColorImage();
  if (cameraFlip && !replaying) {
    // depth image
    PGraphics g;
    g = createGraphics(depth.width, depth.height);
    g.beginDraw();
    g.pushMatrix();
    g.scale(1, -1);
    g.translate(0, -g.height);
    g.image(depth, 0, 0);
    g.popMatrix();
    g.endDraw();
    depth = g.get();
    //  rgb image
    if (streamRGB) {
    PGraphics rgb;
    rgb = createGraphics(rgbImage.width, rgbImage.height);
    rgb.beginDraw();
    rgb.pushMatrix();
    rgb.scale(1, -1);
    rgb.translate(0, -rgb.height);
    rgb.image(rgbImage, 0, 0);
    rgb.popMatrix();
    rgb.endDraw();
    rgbImage = rgb.get();
    }
  } 
  if (cameraHorizontal && !replaying) {
    // depth image
    PGraphics g;
    g = createGraphics(depth.width, depth.height);
    g.beginDraw();
    g.pushMatrix();
    g.scale(-1, 1);
    g.translate(-g.width, 0);
    g.image(depth, 0, 0);
    g.popMatrix();
    g.endDraw();
    depth = g.get();
    //  rgb image
     if (streamRGB) {
    PGraphics rgb;
    rgb = createGraphics(rgbImage.width, rgbImage.height);
    rgb.beginDraw();
    rgb.pushMatrix();
    rgb.scale(-1, 1);
    rgb.translate(-rgb.height, 0);
    rgb.image(rgbImage, 0, 0);
    rgb.popMatrix();
    rgb.endDraw();
    rgbImage = rgb.get();
     }
  }
  
  
  
  PImage depthCrop = depth.get(floor(depth.width*cropX), floor(depth.height*cropY), floor(depth.width*cropWidth), floor(depth.height*cropHeight));
  
      if (streamRGB) {
  PImage rgbCrop = rgbImage.get(floor(rgbImage.width*cropX), floor(rgbImage.height*cropY), floor(rgbImage.width*cropWidth), floor(rgbImage.height*cropHeight));
    rgbCrop.resize(rgbCrop.width/DECIMATION, rgbCrop.height/DECIMATION);
    sendPImage(depthCrop, rgbCrop, singlePointAverage, trackingAtive, "/depth");
  } else {
      sendPImage(depthCrop, depthCrop, singlePointAverage, trackingAtive, "/depth");
  }
 
 displayInterface(depth, depthCrop.width, depthCrop.height);

  // recording image for usage without camera
  //
  if (cameraRunning || replaying) {
    blobTracking(depthCrop);
    findPositions(depthCrop);
  } else {
    singlePointAverage.y = .5;
    singlePointAverage.x = sin(radians(frameCount))*0.3+0.5;
    singlePointAverage.z = 10.0;
    noStroke();
    fill(0, 255, 0);
    circle(singlePointAverage.x*width, singlePointAverage.y*height, singlePointAverage.z);
  }
  
  // recording
  if (recording) {
    depth.save("data/recordings/outputImage"+recordingCount+".jpg");
    recordingCount++;
  }
  

}

PImage getDepthImage() {
  if (cameraRunning) {
    camera.readFrames();
    return camera.getDepthImage();
  } else {
    if (!replaying) {
      animationFrame(defualtFrame);
    } else {
      int frame = frameCount % totalFrames;
      defualtFrame = recordingFrames[frame];
    }
    return defualtFrame;
  }
}

void findPositions(PImage depthImage) {
  PVector point = new PVector(0.5, 0.5, 0.01);//  set the point to middle of tracking area

  if (contours.size() > 0) {
    trackingAtive = true; 
    float xAverage = 0;
    float yAverage = 0;
    float zAverage = 0;
    int count = 0;
    ArrayList<PVector> multiPointTemp = new ArrayList<PVector>();

    for (int i = 0; i<contours.size(); i++) {
      Contour biggestContour = contours.get(i);
      Rectangle r = biggestContour.getBoundingBox();
      // adjust for image resolution 
      float rx = r.x * DECIMATION;
      float ry = r.y * DECIMATION;
      //ry += cropY*depthImage.height; 
      float rw = r.width * DECIMATION;
      float rh = r.height * DECIMATION;
      float diameter = (float)(rw+rh)/2; // todo: make this scalable 
      if (diameter >= 100) {
        //blob outer
        push();
        translate(floor(width*cropX), floor(height*cropY));
        noFill();
        strokeWeight(4);
        stroke(255, 0, 0);
        rect(rx, ry, rw, rh);
        text("ID: "+i, rx+10, ry+10);
        //blob center
        // single point
        float x = rx + rw/2;
        float y = ry + rh/2;
        float z = (rw / r.width); // somewhat arbitrary division
        pop();
        // normalize all values
        x = x / depthImage.width;
        y = y / depthImage.height;
        xAverage += x / DECIMATION;
        yAverage += y / DECIMATION;
        zAverage += z / DECIMATION;
        multiPointTemp.add(new PVector(x / DECIMATION, y / DECIMATION, z / DECIMATION));
        count++;
      }
    }  
    if (count>0) {
      lastTrackingMillis = millis();
      // there is more than one person! 
      xAverage = xAverage/count;
      yAverage = yAverage/count;
      zAverage = zAverage/count;
      point.set(xAverage, yAverage, zAverage);
      filterRatio = 0.95;

      // find closest match from new blobs to average 
      int[] indexOrder = new int[multiPointTemp.size()];
      for (int i = 0; i<multiPointTemp.size(); i++) {
        int closestIndex = 0;
        float shortestDist = width+height;
        for (int j = 0; j < multiPointAveraged.size(); j++) {
          float distance =  multiPointTemp.get(i).dist(multiPointAveraged.get(j));
          if (distance<shortestDist) {
            shortestDist = distance;
            closestIndex = j;
          }
        }
        indexOrder[i] = closestIndex;
      }

      // TODO: THERE IS A PROBLEM REMOVING POINTS TO THE RIGHT INDEX.

      if (multiPointAveraged.size() > multiPointTemp.size()) {
        int lengthDifference = multiPointAveraged.size()-multiPointTemp.size();
        for (int i = 0; i < lengthDifference; i++) {
          multiPointAveraged.remove(i);
        }
      }

      // sort contours by x pos to maintain location of IDs
      Collections.sort(multiPointAveraged, new XComparator());
      Collections.sort(multiPointTemp, new XComparator());
      //
      // average single points 
      int existingPoints = multiPointAveraged.size();
      for (int i = 0; i<multiPointTemp.size(); i++) {
        PVector temp2 = multiPointTemp.get(i);   
        if (i<existingPoints) {
          // point is already tracked 
          PVector temp1 = multiPointAveraged.get(i);
          temp1.mult(0.9);
          temp2.mult(0.1);
          temp1.add(temp2);
        } else {
          multiPointAveraged.add(temp2.copy());
          // sort again
        }
      }
    } else {
      // no blobs found
      if (millis() > lastTrackingMillis+400) {
        // delay before setting active to false 
        trackingAtive = false;
      }
      filterRatio = 0.98;
    }
  } else {
    // remove all points
    if (multiPointAveraged.size() > 1) {
      for (int i = multiPointAveraged.size() - 1; i > 0; i--) {
        multiPointAveraged.remove(i);
      }
    }
  }

  /* calculate moveing weighted average of blobs */
  singlePointAverage.mult(filterRatio);
  singlePointAverage.add(point.mult(1-filterRatio));
}



void blobTracking(PImage depthImage) {
  try {
    PImage trackImage = depthImage;
    opencv.loadImage(trackImage);
    opencv.contrast(1.3f);
    opencv.dilate();
    opencv.blur(5);
    opencv.erode();
    opencv.erode();
    opencv.erode();
    contours = opencv.findContours(true, true);
  } 
  catch(Throwable ex) {
    System.err.println("Error: " + ex.getMessage());
    ex.printStackTrace();
  }
}

void animationFrame(PImage frame) {
  // simple animation when no camera found
  frame.loadPixels();
  for (int i = 0; i < frame.pixels.length; i++) {
    int x = i % frame.width;
    int y = (i - x) / frame.height;
    float reactorDistance = dist(x, y, width/2, height/2);
    int myStartTime = int(frameCount-reactorDistance);
    float angle = radians(myStartTime)*1.5;
    int fill = floor(sin(angle)*127)+127;  
    fill = constrain(fill, 0, 255);
    frame.pixels[i] = color(fill, fill, fill, 255);
  }
  frame.updatePixels();
}
