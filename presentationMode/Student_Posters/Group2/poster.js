//init store for svg objects
let letters = []
let animatedLetters = []
let ornaments = []
let animatedOrnaments = []
let horizon, pendulum

//pendulum config
let pendulumSpeed = 0.8
let pendulumCounter = 0
let pendulumAngle = 0

//object detection and interaction related config
let lettersAreTicking = true
let objectInsideRange = true
let trackedX = 500

//time related values
let d, h, h12, m, s, hAngle, mAngle, sAngle

function setup() {
	//noCanvas() //@paulina & luke: poster switching logics should be changed accordingly. our sketch basically takes places in a svg with id "svg" with aspect ratio of 18:16 instead of default canvas
	createCanvas(getWindowWidth(), getWindowHeight());
	setupOSC(false) // impartant! Don't modify this line.

	frameRate(60)
	angleMode(DEGREES)

	//load svg letters and ornaments
	letters.push(SVG.find("#t1")[0])
	letters.push(SVG.find("#i")[0])
	letters.push(SVG.find("#k1")[0])
	letters.push(SVG.find("#t2")[0])
	letters.push(SVG.find("#a")[0])
	letters.push(SVG.find("#k2")[0])
	ornaments.push(SVG.find("#top-ornaments")[0])
	ornaments.push(SVG.find("#bottom-ornaments")[0])
	horizon = SVG.find("#horizon")[0]
	pendulum = SVG.find("#pendulum")[0]

	//add ticking animations to letters and ornaments
	letters.forEach((item, index) => {
		animatedLetters[index] = []
		item.each(function (i, children) {
			let animated = this.animate(new SVG.Spring(400, 15))
			animatedLetters[index].push(animated)
		})
	})
	ornaments.forEach((item, index) => {
		animatedOrnaments[index] = []
		item.each(function (i, children) {
			let animated = this.animate(new SVG.Spring(400, 15))
			animatedOrnaments[index].push(animated)
		})
	})

	//continuosly animate ticking elements
	setInterval(updateOrnaments, 1000)
	setInterval(updateHorizon, 1000 * 60)
	updateOrnaments()
	updateHorizon()
}

function draw() {
	clear();
	//get tracking data
	trackedX = map(posNormal.x, 0, 1.26, 0, windowWidth) //should be normalized between 0 -1
	//trackedX = mouseX
	if (trackedX < 50 || trackedX < windowWidth - 10) objectInsideRange = true
	else objectInsideRange = false

	// animate letters according tracker or let it tick continously
	if (objectInsideRange) {
		lettersAreTicking = false
		letters.forEach((item, index) => {
			item.each(function (i, children) {
				let x = this.attr("x") ?? 0
				let y = this.attr("y") ?? 0

				let mappedXhour = trackedX < windowWidth / 2 ? map(trackedX, 0, windowWidth / 2, hAngle, 360) : map(trackedX, windowWidth / 2, windowWidth, 0, hAngle)
				let mappedXmin = trackedX < windowWidth / 2 ? map(trackedX, 0, windowWidth / 2, mAngle, 720) : map(trackedX, windowWidth / 2, windowWidth, 0, 720)
				let mappedXsec = trackedX < windowWidth / 2 ? map(trackedX, 0, windowWidth / 2, sAngle, 1440) : map(trackedX, windowWidth / 2, windowWidth, 0, 1440)

				if (this.attr("width") == 10 || this.attr("height") == 10) {
					animatedLetters[index][i].transform({ rotate: floor(mappedXsec), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 80 || this.attr("height") == 80) {
					animatedLetters[index][i].transform({ rotate: floor(mappedXmin), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 160 || this.attr("height") == 160) {
					this.transform({ rotate: floor(mappedXhour), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				}
			})
		})
	} else {
		lettersAreTicking = true
	}

	//move the pendle
	pendulum.transform({ rotate: map(pendulumAngle, 0, 114 / pendulumSpeed, -100, 100), origin: [1080, -300] })
	pendulumAngle += sin(frameCount * pendulumSpeed)

	posterTasks() // do not remove this last line!
}

const updateOrnaments = () => {
	d = new Date()
	h = d.getHours()
	h12 = d.getHours() > 12 ? d.getHours() - 12 : d.getHours()
	m = d.getMinutes()
	s = d.getSeconds()
	h12 += m / 60
	hAngle = h12 * 30
	mAngle = (m / 60) * 360 + 90
	sAngle = (s / 60) * 360 + 90

	ornaments.forEach((item, index) => {
		item.each(function (i, children) {
			let x = this.attr("x") ?? 0
			let y = this.attr("y") ?? 0
			if (this.attr("width") == 10 || this.attr("height") == 10) {
				animatedOrnaments[index][i].transform({ rotate: floor(sAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
			} else if (this.attr("width") == 80 || this.attr("height") == 80) {
				animatedOrnaments[index][i].transform({ rotate: floor(mAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
			} else if (this.attr("width") == 160 || this.attr("height") == 160) {
				this.transform({ rotate: floor(hAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
			}
		})
	})

	if (lettersAreTicking) {
		letters.forEach((item, index) => {
			item.each(function (i, children) {
				let x = this.attr("x") ?? 0
				let y = this.attr("y") ?? 0
				if (this.attr("width") == 10 || this.attr("height") == 10) {
					animatedLetters[index][i].transform({ rotate: floor(sAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 80 || this.attr("height") == 80) {
					animatedLetters[index][i].transform({ rotate: floor(mAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				} else if (this.attr("width") == 160 || this.attr("height") == 160) {
					this.transform({ rotate: floor(hAngle), origin: [x + this.attr("width") / 2, y + this.attr("height") / 2] })
				}
			})
		})
	}
}

const updateHorizon = () => {
	if (h < 12) horizon.attr({ cy: 10000 + floor(map(h, 0, 12, 0, 1920)) })
	else horizon.attr({ cy: 10000 + floor(map(h, 12, 24, 1920, 0)) })
}
