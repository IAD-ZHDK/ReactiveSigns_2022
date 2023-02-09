class Metaball {

  constructor() {
    this.vel = this.initVel();
    this.pos = new p5.Vector(width / 2, height / 2);
    this.targetPos = createVector(width / 2, height / 2);
    this.gotoTarget = false;
    this.shrink = false;
    this.grow = false;
    this.frameOff = Math.floor(random(50));
    this.diagonalSize = 1400;
    this.state = "none";
  }

  update() {
    this.radius = this.diagonalSize * (0.009 + sin(frameCount / 10 + this.frameOff) * 0.003);
    if (this.gotoTarget == true) {
		 this.vel = p5.Vector.sub(this.targetPos, this.pos).mult(0.03);
    } else {
      if ((this.pos.x < this.radius * 8 && this.vel.x < 0) || (this.pos.x > width - this.radius * 8 && this.vel.x > 0))
        this.vel.x *= -1;
      if ( (this.pos.y < this.radius * 8 && this.vel.y < 0) || (this.pos.y > height - this.radius * 8 && this.vel.y > 0) )
        this.vel.y *= -1;
    }
    this.pos.add(this.vel);
  }

  setTarget(x, y) {
    this.targetPos = createVector(x, y);
  }

  vanish() {
    this.grow = false;
    this.shrink = true;
  }

  appear() {
    this.grow = true;
    this.shrink = false;
  }

  changeState(isGo) {
    if (this.gotoTarget && isGo == false) this.vel = this.initVel();
    this.gotoTarget = isGo;
  }

  initVel() {
    const size = Math.pow(Math.random(), 2);
    return p5.Vector.random2D().mult(1 - size + 2);
  }
}
