# Templates for Reactive Signs Module 2022
Sends RealSense data over web socket from Processing to p5js.

The repository contains a number of basic examples in the Poster_Templates, together with a custom library to handle communication between the Realsense-Camera application running in Java, and the poster output running with P5js. 

iframeSwitcher contains the 

![Posters](/Raw/JT_Poster.gif?raw=true)| ![Posters](/Raw/RC_DS_Gif_Animation.gif?raw=true)         
:-------------------------------------:|:---------------------------------:

For running the poster, there are two lines needed in the setup function and one in the draw function.  

 ```javascript
function setup() {
   /*important!*/ createCanvas(getWindowWidth(), getWindowHeight()); // Don't remove this line. You may change the render to WEBGL if you wish 
   /*important!*/ setupOSC(false);  // Don't remove this line. The optional boolean argument turns the depthstream on and off. A 2nd boolean parameter enables an RGB stream. 
 
}

function draw() {
/*important!*/ posterTasks(); // Don't remove this line  
} 
 
```

 These variables hold the coordinates of a tracker point, based on the camera and blob detection. When no camera is available the data will be controled by the mouse.

 ```javascript
 position.x  // represents left to right movement of one user 
 position.y  // represents up and down movement of one user. Use sparingly, as this movement is less intuitive. 
 position.z  // represents distance from the user to the screen. 
 tracking  // boolean: true if someone is infront of the camera 

 posNormal.x, posNormal.y, posNormal.z  //The same as "position" but normalised. i.e values between 0 and 1. 
```

There are two screens (0 and 1) for which you can access the coordinates with the following variables. 

 ```javascript
 screens[i].x // x position of screen
 screens[i].y // y position of screen. Tip: this will always be 0! 
 screens[i].w // width of screen
 screens[i].h // height of screen
 screens[i].cntX // x position of screen center
 screens[i].cntY // y position of screen center
```

These variables act as units of measurement, which are safer than using pixel coordinates. 
 ```javascript
vw // 1 percent of viewport width
vh // 1  percent of viewport height
```

# Processesing Sketch
The Processing (JAVA) application connects to the realsense camera, and provides all the data over OSC.

Currently ia requires version [3.5.4 of Processing]( https://processing.org/download) to run.   

It also requires the following libraries to run. 

- bildspur.realsense
- controlP5
- oscP5
- opencv

*Realsense websockets based on work by Florian Bruggisser*