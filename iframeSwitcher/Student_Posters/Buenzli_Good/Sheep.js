class Sheep {
  constructor(x, y, id) {
    this.id = id;
    this.sprite = createSprite(x, y, 1000, 1000);
    this.sprite.scale = 0.004 * vh;
    this.sprite.maxSpeed = 3;
    this.sprite.setCollider("circle", 0, 0, vh * 40);
    this.animation = "walking";
    this.eatingTimer = 0;
    this.addSheepAnimation();

   // let l = pointsNotEaten[this.id % 3].length;
  //  let rando = random(l - l / 3, l);
    //let goal = pointsNotEaten[this.id % 3][floor(rando)];
    //this.arrayPosition = { i: this.id % 3, j: floor(rando) };
    //this.goalX = goal.x;
    //this.goalY = goal.y;

//this.arrayPosition = getNextPoint(this.id);
//let goal = pointsNotEaten[this.arrayPosition.i][this.arrayPosition.j];
let goal = getNextPoint(this.id, true);
this.goalX = goal.x;
this.goalY = goal.y;

    if (id % 2 == 0) {
      this.ethnic = "b";
    } else {
      this.ethnic = "w";
    }
  }

  draw() {
    this.sprite.depth = this.sprite.position.y*10;
    if (this.animation == "walking") {
      this.walking();
    } else if (this.animation == "eating") {
      this.eating();
    } else if (this.animation == "follow") {
      this.folowing();
    } 
    this.updateAnimation();
    // textSize(40);
    //text(this.animation, this.sprite.position.x, this.sprite.position.y)
  }

  walking() {
    this.sprite.mass = 1;
    this.mirrorDirection();
    this.sprite.attractionPoint(0.9, this.goalX, this.goalY);
    if (this.distance(this.goalX, this.goalY) <= vh * 4) {
      this.eat();
    }
  }

  folowing() {
    this.sprite.mass = 1;
    this.mirrorDirection();
    this.sprite.attractionPoint(0.05, position.x, position.y);
    if (this.distance(this.goalX, this.goalY) <= vh * 0.5) {
      this.sprite.velocity.x = 0;
      this.sprite.velocity.y = 0;
    } 
  }

  eating() {
    this.sprite.mass = 0.5;
    this.eatingTimer++;

    if (this.eatingTimer >= 120) { //200
      this.eatenPointsHandler();
      this.sprite.immovable = false;
    }
  }

  eatenPointsHandler() {
     //pushing eaten point in to points eaten array
   // if (this.arrayPosition.i != null) {
      pointsEaten.push({ x: this.goalX , y: this.goalY });
    //}
    // getting the next point to walk to
    //if (pointsNotEaten[this.id % 3].length > 0) {
      let goal = getNextPoint(this.id);
      //this.arrayPosition = getNextPoint(this.id);
      //let goal = pointsNotEaten[this.arrayPosition.i][this.arrayPosition.j];
     // let point = pointsNotEaten[this.arrayPosition.i][this.arrayPosition.j];
      if (goal.x == 0 && goal.y == 0) {
        this.follow()
      } else {
        this.walk(goal);
      }
   // }
  }

  goToPoint(x, y) {
    this.goalX = x;
    this.goalY = y;
  }

  eat() {
    this.animation = "eating";
    this.sprite.immovable = true;
    this.sprite.velocity.x = 0;
    this.sprite.velocity.y = 0;
    this.updateAnimation();
    this.eatingTimer = 0;
  }

  walk(goal) {
    if (typeof goal != "undefined") {
      this.animation = "walking";
      this.goToPoint(goal.x, goal.y);
    }
  }

  mirrorDirection() {
    if (this.sprite.getDirection() > 90 || this.sprite.getDirection() < -90) {
      this.sprite.mirrorX(1);
    } else {
      this.sprite.mirrorX(-1);
    }
  }

  getSprite() {
    return this.sprite;
  }

  updateAnimation() {
    this.sprite.changeAnimation(this.animation + this.ethnic);
  }

  distance(x, y) {
    return dist(x, y, this.sprite.position.x, this.sprite.position.y);
  }

  // End of grass eating
  follow() {
    this.sprite.setCollider("circle", 0, 0, vh * 60);
    this.sprite.depth = this.sprite.position.y*10;
    this.animation = "follow";
    this.sprite.maxSpeed = 1;
    this.updateAnimation();
    this.mirrorDirection();
    this.sprite.attractionPoint(0.05, position.x, position.y);
  }

  addSheepAnimation() {
    this.sprite.addAnimation("eatingw",eatingw);

    this.sprite.addAnimation(
      "eatingb",eatingb);

    this.sprite.addAnimation(
      "walkingw",walkingw);

    this.sprite.addAnimation(
      "walkingb",walkingb);

    this.sprite.addAnimation(
        "followw",walkingw);
  
      this.sprite.addAnimation(
        "followb",walkingb);
  }
}
