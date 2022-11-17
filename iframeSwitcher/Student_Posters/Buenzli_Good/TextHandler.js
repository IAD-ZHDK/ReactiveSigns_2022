class TextHandler {
  constructor() {
    this.grases = [];
    this.textPoints = [];
    this.grassfont = loadFont("fonts/UniSansHeavyItalic.otf");
    this.messageImage = loadImage("images/Poster_1_small.png");
    this.pointsImage = loadImage("images/screenshot.png");
  }

  drawImage(x, y, w, h) {
    image(this.messageImage, x, y, w, h);
  }

  write() {
    this.pushTextPoints(
      "CAME FROM",
      screen1.x + vw * 6,
      screen3.cntY + screen3.cntY / 1.2
    );

    this.pushTextPoints(
      "WHERE YOU",
      screen1.x + vw * 5,
      screen2.cntY + screen3.cntY / 5
    );

    this.pushTextPoints(
      "GO BACK TO",
      screen1.x + vw * 6,
      screen1.cntY - screen1.cntY / 2.2
    );
    /*
    for (let j = 0; j < this.textPoints.length; j++) {
      for (let i = 0; i < this.textPoints[j].length; i++) {
          this.textPoints[j][i].alpha = 0;
          console.log(this.textPoints[j][i])
      }
    }
*/
  }

  pushTextPoints(word, x, y) {
    this.textPoints.push(
      this.grassfont.textToPoints(word, x, y, 16 * vw, {
        sampleFactor: 0.04, // 0.01
        simplifyThreshold: 0,
      })
    );
  }

  drawTextPoints() {
    for (let i = 0; i < this.textPoints.length; i++) {
      for (let j = 0; j < this.textPoints[i].length; j++) {
        push();
        noStroke();
        fill(200, 0, 0);
        circle(this.textPoints[i][j].x, this.textPoints[i][j].y, vh * 12);
        pop();
      }
    }
  }

  getTextPoints() {
    return this.textPoints;
  }
}
