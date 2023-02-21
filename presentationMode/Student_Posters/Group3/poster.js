
// dataFiltered : represents an array of depth data. Only available with setupOSC(true)
// depthW: The horizontal resolution of the dataFiltered aray
// depthH: The vertical resolution of the dataFiltered aray

let metaballShader;
let ballAmount = 440.0, metaballs = [];
let gra;
let kpFrame = 0;
let isConverted = false;
let offset = 0;
let minFrag = 0.9;
let maxFrag = 1.1;
let defaultBallSize = 500;
let mouseLocation;
let mouseLocation2 = 1.0;

//Time function
let time = 0;
let duration = 60;

let w;
let h;

let outlineBool = 1.0;

function preload() {
	//metaballShader = getShader(this._renderer);
	metaballShader = loadShader('shader/uniform.vert', 'shader/uniform.frag');
  	font = loadFont('assets/suisse.otf');
	state1 = loadImage('assets/final22.png');
}

function setup() {
  /*important!*/createCanvas(getWindowWidth(), getWindowHeight(), WEBGL); // impartant! Don't modify this line. 
  /*important!*/setupOSC(true); // Don't remove this line. 1 argument to turn the depthstream on and off
  pixelDensity(1);
  debugScreen = createGraphics(getWindowWidth(), getWindowHeight());
  for (let i = 0; i < ballAmount; i ++) metaballs.push(new Metaball());

  buffer1 = createGraphics(200, 175);
  buffer1.background(0, 0, 0);
  buffer1.image(state1, 0, 0)

  noCursor();
  textFont(font);
}

function draw() {
background(255,0,0)

	w = width;
	h = height;
	
	
	shader(metaballShader);
  	if(frameCount == kpFrame + 20 && kpFrame != 0)for(let i = 0; i < metaballs.length; i++)metaballs[i].changeState(true);
	
	var data = [];
  
	for (const ball of metaballs) {
		ball.update();
		data.push(ball.pos.x+offset, ball.pos.y, ball.radius);
	}
	

	metaballShader.setUniform('metaballs', data);
	metaballShader.setUniform('boolF', outlineBool);
	metaballShader.setUniform('balls', ballAmount);
	metaballShader.setUniform("winWidth", w);
	metaballShader.setUniform("winHeight", h);
	metaballShader.setUniform('minF', minFrag);
	metaballShader.setUniform('maxF', maxFrag);
	metaballShader.setUniform('mouseLoc', mouseLocation);
	metaballShader.setUniform('mouseLoc2', mouseLocation2);


	push()
	rect(0, 0, w, h);
	pop()
	if(position.x < vw*20){
		outlineBool = 1,0;
		for(let i = 0; i < metaballs.length; i++)metaballs[i].changeState(false);
 
		if(position.x > 15*vw) {
			mouseLocation2 = map(position.x, 15*vw, 20*vw, 1, 0);
		}

	} else if (position.x > vw*20 && position.x < vw*80){

		outlineBool = 0,0;
		let targetPos = getBlPxPos(buffer1);
		setTargetPos(targetPos);
		kpFrame = frameCount;
		for(let i = 0; i < metaballs.length; i++)metaballs[i].changeState(true);

		if(position.x > 15*vw && position.x < 30*vw) {
			mouseLocation = map(position.x, 15*vw, 28*vw, 0, 1);
			//console.log(mouseLocation);

		} else if (position.x > 70*vw && position.x < 85*vw) {
			mouseLocation = map(position.x, 70*vw, 83*vw, 1, 0);
			//console.log(mouseLocation);
		}

	} else {
		outlineBool = 1,0;
		for(let i = 0; i < metaballs.length; i++)metaballs[i].changeState(false);

		if(position.x > 80*vw && position.x < 85*vw) {
			mouseLocation2 = map(position.x, 80*vw, 85*vw, 0, 1);
		}
	}


	if(position.x > 50*vw && position.x < 100*vw){
		time += 1;
		offset = lerp(offset, map(position.x, 50*vw, 100*vw, 0, 150), time / duration);
	} else if (position.x > 0 && position.x < 50*vw){
		time += 1;
		offset = lerp(offset, map(position.x, 0*vw, 50*vw, -150, 0), time / duration);
	} else {
		time = 0;
		offset -= offset  * 0.1;
	}


  	for(ball of metaballs) {
		if(ball.grow == true){
				if(ball.diagonalSize < 1200){
					ball.diagonalSize += 15;
				} 
		} else if(ball.shrink == true){
			if(ball.diagonalSize > 0){
				ball.diagonalSize -= 15;
			} 
		}
		if(ball.gotoTarget == true){
			
				if(ball.diagonalSize > 1200){
					ball.diagonalSize -= 15;
				} 
		} else if (ball.gotoTarget == false){
			if(ball.diagonalSize < 1400){
				ball.diagonalSize += 15;
			} 
		}
	} 
  
	  // Increment the time
	//  console.log(time);

	  // Reset the time if it exceeds the duration
	  if (time > duration) {
		time = 0;
	  }

  ///////////////// do not remove this last line!  
  
  //posterTasksDebug(); 
  resetShader();
    /*important!*/posterTasks(); // do not remove this last line!
}

function easeInOutQuad(t, b, c, d) {
	t /= d / 2;
	if (t < 1) return c / 2 * t * t + b;
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
  }


function destiny(){
	let targetPos = getBlPxPos(buffer1);
	setTargetPos(targetPos);
	kpFrame = frameCount;
	for(ball of metaballs) {
		ball.destiny();
	}
}


function setTargetPos(pos) {
	for(let i =0; i < metaballs.length; i++)
	{
		metaballs[i].appear();
		if(i < pos.length)metaballs[i].setTarget(pos[i].x,pos[i].y);
		else
		{
			let d;
			if(random() > 0.5)d = random() > 0.5 ? createVector(-metaballs[i].radius*5,random(height)) : createVector(width + metaballs[i].radius*5,random(height));
			else d = random() > 0.5 ? createVector(random(w),-metaballs[i].radius*5) : createVector(random(width),height + metaballs[i].radius*5);
			metaballs[i].setTarget(d.x,d.y);
			metaballs[i].vanish();
		}
	}
}

function getBlPxPos(g)
{
	let ratio = 5.5;
	
	let pos = [];
	for(let x = 0 ; x < g.width; x += 4.1)
	{
		for(let y = 0; y < g.height; y += 4.1)
		{
			let col = g.get(x,y);
			if(brightness(col) == 0)pos.push(createVector((x-g.width/2)*ratio + width/2,((g.height-y)-g.height/2)*ratio + height/2));
		}
	}
	return pos;
}

function mouseWheel() { 
	return false;
}


function posterTasksDebug() {
	debugScreen.rect(0, 0, getWindowWidth(), getWindowHeight());
	if (millis()-lastOSC>=2000) {
	   // if there is no osc connection, then use mouse for position
	  updatePosition(mouseX/width,mouseY/height,1.0)
	  oscSignal = false;
	  placeHolderAnimation();
	} else {
	  oscSignal = true;
	}
	
	try {
	  window.parent.trackingCallback(tracking, oscSignal);
	}   catch(e) {
	  
	} 
   
	// show helplines when outside of fullscreen mode
	let debug = true;
	if (!fullscreenMode && debug) {
  
		debugScreen.push();
		
		if (_renderer.drawingContext instanceof WebGLRenderingContext) {
		//debugScreen.translate(-width/2,-height/2,0);
		}
  
		debugScreen.fill(0, 180, 180);
		debugScreen.noStroke();
		fpsAverage = fpsAverage * 0.9;
		fpsAverage += frameRate() * 0.1;
		debugScreen.textSize(1.2*vw);
		debugScreen.textAlign(LEFT, TOP);
		debugScreen.text("fps: "+Math.floor(fpsAverage), screens[0].x+vw, screens[0].y+vh);
		debugScreen.text("Streaming: "+oscSignal, screens[0].x+vw, screens[0].y+vh+vh+vh);
		debugScreen.text("tracking: "+tracking, screens[0].x+vw, screens[0].y+vh+vh+vh+vh+vh);
		debugScreen.text("resolution "+width+" x "+ height, screens[0].x+vw, screens[0].y+vh+vh+vh+vh+vh);
		debugScreen.text("aspect Ratio: 1 to "+(height/width), screens[0].x+vw, screens[0].y+vh+vh+vh+vh+vh);
		debugScreen.noFill();
		debugScreen.stroke(0, 180, 180);  
		debugScreen.rectMode(CORNER);
		debugScreen.rect(screens[0].x, screens[0].y, width, height);
		// line between screens
		for (let i = 1; i<screens.length; i++) {
		  screens[i].w = floor(width/screens.length);
		  debugScreen.line(screens[i].x, screens[i].y, screens[i].x, screens[i].y+screens[i].h); // line between 1st and 2nd screen
		}
  
		debugScreen.pop();
		showPoint(position);
	}
	image(debugScreen,0,0)
  }