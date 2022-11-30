let images = [];
let imagCount = 119; //119;


function preload() {
  for(let i=0;i<imagCount;i++) {
    let seriesNo = nf(i, 3); // this formats the index nummger into a string with 3 digits total. 
    images[i] = loadImage('images/image'+seriesNo+'.jpg'); // load up all images 
  }
}
function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(false); // impartant! Don't modify this line. 
}

function draw() {
  background(0);
  newVectorNormal = getSmoothPlayBackVector(position)
  let i = getindex(tempVector)
  // draw the same images on all three screens: 

  image(images[i],screens[0].x,0,screens[0].w,screens[0].h);   
  image(images[i],screens[1].x,0,screens[1].w,screens[1].h);
  fill(255,0,0);
  //circle(position.x,position.y,position.z*10);
  //line(position.x,position.y,newVectorNormal.x*width,newVectorNormal.y*height)
  //circle(newVectorNormal.x*width,newVectorNormal.y*height,5);
  ///////////////
  posterTasks(); // do not remove this last line!  
}

let lastIndex = 0;
let lastChange = 0;

function getindex(vector) {
  let normal = map(vector.x, 0.2, 0.8,0.0,1.0) // make sure we really get to the first and last frame 
  let max = imagCount-1
  let GoalIndex= round(imagCount*normal); // find index position of image based on normal of position x
      GoalIndex = constrain(GoalIndex,0,max);
  return GoalIndex 
}


let lastVector;
let DragVector;
let playBackFlag = false;
// let velocityAverage = 0;

function getSmoothPlayBackVector(vector) {
// This function attempts to make the animation look smoother, when the controller is moving very slowly. 
  if (typeof DragVector === 'undefined') {
    DragVector = createVector(0,0);
    lastVector = createVector(0,0);
  }
 
      let velocity = abs(lastVector.x-vector.x);
       let difference = abs(DragVector.x-vector.x);

        let delta = map(velocity,1.8,15.0,1.0,0.75, true);

        if (difference >= width/20) {
          playBackFlag = true;
        }
        if (difference <= width/400) {
          playBackFlag = false;
        }
        if (playBackFlag) {
          delta = 0.91
        }
        DragVector.y = vector.y;
        DragVector.x = DragVector.x*delta;
        DragVector.x += vector.x*(1.0-delta);
        lastVector.x = vector.x
        lastVector.y = vector.y
        tempVector = createVector(DragVector.x/width,DragVector.y/height)
        return tempVector;
}
