let wfactor;
let hfactor;
let imageL;
let imageI1;
let imageI2;
let imageF;
let imageE;
let imageT;
let imageM;
let imageS;

function preload() {
  imageL = loadImage('images/l.png');
  imageI1 = loadImage('images/i1.png');
  imageI2 = loadImage('images/i2.png');
  imageF = loadImage('images/f.png');
  imageE = loadImage('images/e.png');
  imageT = loadImage('images/t.png');
  imageM = loadImage('images/m.png');
  imageS = loadImage('images/s.png');
}

function setup() {
  /*important!*/createCanvas(getWindowWidth(), getWindowHeight()); // important! Don't modify this line. 
  /*important!*/setupOSC(false); // Don't remove this line. 1 argument to turn the depthstream on and off
}

function windowResized() {
  resizeCanvas(getWindowWidth(), getWindowHeight());
}

function draw() {
  let xPos = posNormal.x;
  xPos = snap(xPos, 0.2);
  xPos = snap(xPos, 0.8);
  const viewportWidth = width / 1.25;

    // Faktoren mit, denen die Höhe und Breite des aktuellen Screens berechnet wird
    wfactor = 2160 / width;
    hfactor = 1920 / height;
  
    
  // position.x wird auf die Buchstabenpositionen gemappt
  console.log(xPos)
  const mappedXPosL = map(xPos, 0.2, .8, 0, 432 / wfactor);
  const mappedYPosL = map(xPos, 0.2, .8,  0, 960 / hfactor);
  const mappedXPosI1 = map(xPos,  0.2, .8,  432 / wfactor, 864 / wfactor);
  const mappedYPosI1 = map(xPos,  0.2, .8,  0, 960 / hfactor);
  const mappedXPosF = map(xPos, 0.2, .8,  864 / wfactor, 0);
  const mappedYPosF = map(xPos,  0.2, .8,  0, 960 / hfactor);
  const mappedYPos = map(xPos,  0.2, .8,  960 / hfactor, 0);
  const mappedYPosE1 = map(xPos,  0.2, .8,  0, 960 / hfactor);
 
  background(0);
  stroke(255);
  strokeWeight(6);

  // Linien werden erstellt
  for (let lineX = 0; lineX <= windowWidth - width / 5; lineX += width / 5) {
    line(lineX, 0, lineX, height);
  }

  for (let lineY = height / 2; lineY <= windowHeight - height / 2; lineY += height / 2) {
    line(0, lineY, width, lineY);
  }

  // gemappte position.x wird auf die Buchstaben gepusht
  push();
  translate(mappedXPosL, mappedYPosL);
  image(imageL, 0, 0, imageL.width / wfactor, imageL.height / hfactor);
  pop();

  push();
  translate(mappedXPosI1, mappedYPosI1);
  image(imageI1, 0, 0, imageI1.width / wfactor, imageI1.height / hfactor);
  pop();

  push();
  translate(mappedXPosF, mappedYPosF);
  image(imageF, 0, 0, imageF.width / wfactor, imageF.height / hfactor);
  pop();

  push();
  translate(1296 / wfactor, mappedYPosE1);
  image(imageE, 0, 0, imageE.width / wfactor, imageE.height / hfactor);
  pop()

  push();
  translate(0, mappedYPos)
  image(imageT, 0, 0, imageT.width / wfactor, imageT.height / hfactor);
  image(imageI2, 432 / wfactor, 0, imageI2.width / wfactor, imageI2.height / hfactor);
  image(imageM, 864 / wfactor, 0, imageM.width / wfactor, imageM.height / hfactor);
  image(imageE, 1296 / wfactor, 0, imageE.width / wfactor, imageE.height / hfactor);
  pop();

  if (xPos > .5) {
    mappedYPosS = map(xPos*width, 432 / wfactor, width/ 2, 960 / hfactor, 500 / hfactor);
  } else {
    mappedYPosS = map(xPos*width, width/ 2, viewportWidth, 500 / hfactor, 960 / hfactor);
  }

  push();
  translate(1728 / wfactor, mappedYPosS);
  image(imageS, 0, 960 / hfactor, imageS.width / wfactor, imageS.height / hfactor);
  pop();
  /*important!*/posterTasks(); // do not remove this last line!  
}
function snap(pos, target) {
	const snapDistance = 0.07;
		const snapIntensity = 1.5;
		let result = pos;
		let distance = abs(pos-target);
		if (distance<snapDistance) {
			//result -= difference*0.3;
			let lerpFactor = map(distance,snapDistance,0,0,snapIntensity);
			lerpFactor = constrain(lerpFactor,0,1);
			result = lerp(pos, target, lerpFactor)
		} 
	return result;
}