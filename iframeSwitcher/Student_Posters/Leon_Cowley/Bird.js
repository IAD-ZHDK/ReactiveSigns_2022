
class Bird {

  constructor(startX, startY) {
    this.startX = startX;
    this.startY = startY;
    this.posX = this.startX;
    this.posY = this.startY;
    this.posX = this.startX * screen1.w
    this.posY = this.startY * screen1.h
    this.animationPos = 0;
    this.flying = false;
    this.animationSpeed = .003; //this can still be adjusted (look quite good on big screen)
    this.angle = random(PI);
    this.extra = false
  }

  setEnd(endX, endY) {
    this.endX = endX;
    this.endY = endY;
  }
  
  //the vanish method sets the current location to off-screen and stores the location it would have (to use it again when the pixel reappears)
  vanish() {
    fill(0);
  }
  //the reappear method sets the location back to where it should be to form the letters
  reappear() {
    //fill(map(sin(this.flap), -1, 1, 100, 150));
    fill(255);
  }

  fly() {
    if (this.animationPos<1 && this.animationSpeed>0) {
      this.animationPos+= this.animationSpeed;
    } else if (this.animationPos>0 && this.animationSpeed<0) {
      this.animationPos+=this.animationSpeed;
    } else {
      this.flying = false;
      this.animationSpeed = -this.animationSpeed;
    }
    this.posX = map(this.animationPos, 0, 1, this.startX * screen1.w, screen3.x + (this.endX * screen1.w))
    this.posY = map(this.animationPos, 0, 1, this.startY * screen1.h, screen3.y + (this.endY * screen1.h))
  }


  draw(i) {

    if(this.flying == true) {
    this.fly()
    this.animateFly(this.posX, this.posY);
    } else {
        let activeated = false;
         if (oscSignal) {
             try {
             //use depth camera 
                let depthX = floor((this.posX/width) * depthW)
                let depthY = floor((this.posY/height) * depthH)
                let index = (depthY*depthW)+depthX;
                   if (dataFiltered[index] > 0.0) {
                     activeated = true
                   }
                }   catch (e) {
                }
         } else {
           // use pointer 
            if (dist(position.x,position.y, this.posX, this.posY) <= vh*20) { 
                activeated = true
            }
         }

        if (activeated) { // adjust the tolerance when birds are leaving
            if (floor(random(5)) == 0) {
              this.flying = true;
            }
          }
     this.animateStanding(this.posX, this.posY);
    }
    
  }

animateStanding(posX, posY) {
    push();
    translate(posX, posY-(vh*0.25))
   // triangle(p0x, p0y, p2x, p2y, p1x, p1y);
    rotate(PI/4);

    
    rect(0,0, vh*0.4, vh*0.4);
    pop();
}
 
animateFly(posX, posY) {
//  triangle points
//   P0 ------ P1
//     \      /
//      \    /
//        P2 
// 

this.flap = Math.sin(this.angle+frameCount);
let p0x = -vh*0.5;
let p0y = 0;
let p1x = vh*0.5;
let p1y = 0;
let p2x = 0;
let p2y = this.flap*(vh*0.4);

    // fill of bird is dependent on flap cycle
    push()
    translate(posX, posY-(vh*0.25))
  
    fill(map(sin(this.flap), -1, 1, 180, 240));
    
    // wings 
    triangle(p0x, p0y, p1x, p1y, p2x, p2y);
    // body 
    //rotate(PI/4);
    //rect(0,0, vh*0.2, vh*0.2);
    pop()
   // triangle(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y);
  }
  //to make the birds fly away from the screen where the person is standing at 
}
