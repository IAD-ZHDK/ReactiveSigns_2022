
let mY = 10
let mX = 10
let dirX = 0
let dirY = 0
let goalX = 0
let goalY = 0
var img1;
var img2;
var img3;
var img4;
var img5;
var img6;
var img7;
var img8;
let balls = []
let sBalls = []
var imgs = []
let ballSize = 0
let theShader;
let MAX_TRAIL_COUNT = 1000
let trails = []
let trail = []
let sBallsPos = []



let vertShader = `
	precision highp float;

	attribute vec3 aPosition;

	void main() {
		vec4 positionVec4 = vec4(aPosition, 1.0);
		positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
		gl_Position = positionVec4;
	}
`;

let fragShader = `
	precision highp float;
	
	uniform vec2 resolution;
	uniform int trailCount;
	uniform vec2 trail[${MAX_TRAIL_COUNT}];

	void main() {
			vec2 st = gl_FragCoord.xy / resolution.xy;  // Warning! This is causing non-uniform scaling.

			float r = 0.0;
			float g = 0.0;
			float b = 0.0;

			for (int i = 0; i < ${MAX_TRAIL_COUNT}; i++) {
				if (i < trailCount) {
					vec2 trailPos = trail[i];
					float value = float(i) / distance(st, trailPos.xy) * 0.0004;  // Multiplier may need to be adjusted if max trail count is tweaked.
					r += value * 0.75;
					g += value * 0.75;
					b += value * 0.8;

				}
			}
			gl_FragColor = vec4(r, g, b, 255.0);
	}
`;



function preload() {
	//Images
	img1 = loadImage('assets/img1.png');
	img2 = loadImage('assets/img2.png');
	img3 = loadImage('assets/img3.png');
	img4 = loadImage('assets/img4.png');
	img5 = loadImage('assets/img5.png');
	img6 = loadImage('assets/img6.png');
	img7 = loadImage('assets/img7.png');
	img8 = loadImage('assets/img8.png');
	imgEmpty = loadImage('assets/imgEmpty.png');

	//Font
	myFont = loadFont('assets/barlow_condensed.otf');

	//Shader
	theShader = new p5.Shader(this.renderer, vertShader, fragShader);
}



function setup() {
   /*important!*/ createCanvas(getWindowWidth(), getWindowHeight(), WEBGL); // Don't remove this line. 
   /*important!*/ setupOSC(false);  // Don't remove this line. The boolean argument turns the depthstream on and off
	textFont(myFont);
	pixelDensity(1)
	angleMode(DEGREES)

	//Shader init
	shaderTexture = createGraphics(width, height, WEBGL);
	shaderTexture.noStroke();

	//Store Images
	imgs.push(img1)
	imgs.push(img2)
	imgs.push(img3)
	imgs.push(img4)
	imgs.push(img5)
	imgs.push(img6)
	imgs.push(img7)
	imgs.push(img8)

	let sBallsPos = [200, 50, 3, 500, 300, 3, 600, 200, 3, 400, 150, 4, 100, 700, 4, 200, 600, 3, 400, 700, 3, 200, 1150, 4, 500, 800, 5, 600, 900, 3, 600, 700, 3, 1000, 200, 3, 900, 100, 3, 1170, 650, 5, 1000, 680, 3, 900, 600, 3, 1100, 500, 2, 1300, 500, 3, 1350, 700, 4, 1200, 1200, 3, 1300, 1100, 3,]


	//Creating Large Disco Balls
	translate(-width / 2, -height / 2)
	let x = vw * 15
	let y = vh * 25
	let z = vw * 10
	let i = 0
	let ins = new Ball(x, y, z, i)
	balls.push(ins)

	x = vw * 34
	y = vh * 40
	z = vw * 9
	i = 1
	ins = new Ball(x, y, z, i)
	balls.push(ins)

	x = vw * 17
	y = vh * 70
	z = vw * 10
	i = 4
	ins = new Ball(x, y, z, i)
	balls.push(ins)

	x = vw * 35
	y = vh * 85
	z = vw * 9
	i = 5
	ins = new Ball(x, y, z, i)
	balls.push(ins)

	x = vw * 60
	y = vh * 31
	z = vw * 9
	i = 2
	ins = new Ball(x, y, z, i)
	balls.push(ins)

	x = vw * 83
	y = vh * 19
	z = vw * 10
	i = 3
	ins = new Ball(x, y, z, i)
	balls.push(ins)

	x = vw * 65
	y = vh * 74
	z = vw * 13
	i = 6
	ins = new Ball(x, y, z, i)
	balls.push(ins)

	x = vw * 87
	y = vh * 68
	z = vw * 8
	i = 7
	ins = new Ball(x, y, z, i)
	balls.push(ins)

	//Creating small disco balls
	for (let i = 0; i < sBallsPos.length; i += 3) {
		let a = sBallsPos[i]
		let b = sBallsPos[i + 1]
		let c = sBallsPos[i + 2]
		let d = random(0, -1000)
		let inst = new sBall(a, b, c, d)
		sBalls.push(inst)
	}

	//Creating new Trails
	for (let i = 0; i < 20; i++) {
		let x = random(0, getWindowWidth())
		let y = random(0, getWindowHeight())
		let ins = new Trail(x, y, i)
		trail.push(ins)
	}
}




function draw() {
	background(0)

	if (position.x > 0 && position.x < screens[0].w * 2) {
		goalX = (position.x / getWindowWidth() - 0.5)
		goalY = (position.y / getWindowHeight() - 0.5)
		// goalY = 0

	} else {
		goalX = 0
		goalY = 0
	}

	dirX = (goalX - dirX) * -0.9
	dirY = (goalY - dirY) * -0.9
	directionalLight(250, 250, 250, dirX, dirY, -1)
	ambientLight(40)

	shaderTexture.shader(theShader);
	let data = serializeSketch();
	theShader.setUniform("resolution", [width, height]);
	theShader.setUniform("trailCount", trails.length);
	theShader.setUniform("trail", data.trailsArr);


	push()
	translate(-width / 2, -height / 2);
	shaderTexture.rect(0, 0, width, height);
	texture(shaderTexture);
	rect(0, 0, width, height);
	pop()
	push()
	translate(-width / 2, -height / 2)
	for (let i = 0; i < balls.length; i++) {
		balls[i].display()
		balls[i].beat()
	}

	for (let i = 0; i < sBalls.length; i++) {
		sBalls[i].display()
	}

	for (let i = 0; i < trail.length; i++) {
		trail[i].move()
	}
	pop()
	posterTasks();
}



function windowScaled() { // this is a custom event called whenever the poster is scalled
	textSize(10 * vw);
}




function serializeSketch() {
	data = {
		"trailsArr": [],
	};

	for (let i = 0; i < trails.length; i++) {
		data.trailsArr.push(
			map(trails[i][0], 0, width, 0.0, 1.0),
			map(trails[i][1], 0, height, 1.0, 0.0));
	}
	return data;
}




class Ball {
	constructor(_x, _y, _z, _i) {
		this.x = _x
		this.y = _y
		this.dia = _z
		this.dia2 = _z * 1.1
		this.dia3 = _z + 20
		this.img = _i
		this.state = 1
		this.random = random(-3, 3)
		this.randomImg = 0
		this.randomFrame = round(random(2, 4))
		this.xMouse = 0
		this.xAngle = 0
		this.yAngle = 0
		this.zAngle = 0
		this.easing = 0.07
	}

	display() {
		if (position.x > 0 && position.x < screens[0].w * 2) {
			this.xMouse = map(position.x, 0, width, 0, 360)
			this.yAngle += (this.xMouse - this.yAngle) * this.easing
			this.xAngle += (map(position.y, 0, height, -45, 45) - this.xAngle) * this.easing
			texture(imgs[this.img])

		} else {
			this.yAngle += this.random
			if (this.yAngle > 360 || this.yAngle < -360) {
				this.yAngle = 0

				if (frameCount % this.randomFrame == 0) {
					this.randomImg = round(random(0, 7))
				}
			}
			texture(imgs[this.img])
		}

		push()
		translate(this.x, this.y)
		noStroke()
		rotateY(this.yAngle);
		rotateX(this.xAngle);

		sphere(this.dia2);
		pop()
	}

	beat() {
		if (this.dia2 < this.dia + 2.8) {
			this.dia3 += 20
			this.state = 1
		}

		if (this.state == 0) {
			this.dia2 += (this.dia3 - this.dia2) * 0.07
		}

		if (this.state == 1) {
			this.dia2 += (this.dia3 - this.dia2) * 0.5
		}

		if (this.dia2 > this.dia + 17.2) {
			this.dia3 -= 20
			this.state = 0
		}
	}
}




class sBall {
	constructor(_x, _y, _d, _z) {
		this.x = (_x / 15) * vw
		this.y = (_y / 13) * vh
		this.dia = vw * _d
		this.z = _z
	}

	display() {
		push()
		translate(this.x, this.y)
		noStroke()
		rotateY(frameCount);
		texture(imgEmpty)
		sphere(this.dia);
		pop()
	}
}



class Trail {
	constructor(_x, _y, _i) {
		this.x = _x
		this.y = _y
		this.index = _i
		this.randomX = random(-5, 5)
		this.randomY = random(-5, 5)
		trails.push([this.x, this.y]);
	}

	move() {
		this.x += this.randomX
		this.y += this.randomY

		if (this.x > getWindowWidth()) {
			this.x = 0
		}

		if (this.x < 0) {
			this.x = getWindowWidth()
		}

		if (this.y > getWindowHeight()) {
			this.y = 0
		}

		if (this.y < 0) {
			this.y = getWindowHeight()
		}

		trails[this.index][0] = this.x
		trails[this.index][1] = this.y
	}
}





