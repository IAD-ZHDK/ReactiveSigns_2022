class VertCreate {
    constructor(x,y,colorState,state, diameter){
        this.diameter = diameter;
        this.x = x;
        this.y = y;
        this.colorState = colorState;
        this.displayColor = colorState;
        this.tileOccu = false;
        this.state = state;
    }

    drawSimple() {
        let tiles;
        if (this.displayColor){
            tiles = tileImagesB
         } else {
            tiles = tileImagesA
         }
   
         switch(this.state) {
            case 0:  
            image(tiles[0], this.x,this.y);
                break;
            case 1:
                image(tiles[1], this.x, this.y);
                break;
            case 2:
                image(tiles[2], this.x,this.y);
                break;
            case 3:
                image(tiles[3], this.x,this.y);
                break;
        }
 
    }
    draw() {
        if (this.displayColor == true){

            fill(0);
        } else {
            fill(0);
            noStroke();
            rect(this.x,this.y ,this.diameter ,this.diameter );
            fill(255);
        }
            switch(this.state) {
                // each case is a quarter circle with a cube in the background
                case 0:  
                    beginShape();
                    vertex(this.x, this.y);
                    vertex(this.x, this.y + this.diameter );
                    bezierVertex(this.x, this.y + this.diameter  * b1, this.x + this.diameter  * b1, this.y, this.x + this.diameter , this.y);
                    endShape();
                    break;
                case 1:
                    beginShape();
                    vertex(this.x + this.diameter , this.y);
                    vertex(this.x, this.y);
                    bezierVertex(this.x + this.diameter  * b0, this.y, this.x + this.diameter , this.y + this.diameter  * b1, this.x + this.diameter , this.y + this.diameter );
                    endShape();
                    break;
                case 2:
                    beginShape();
                    vertex(this.x + this.diameter , this.y + this.diameter );
                    vertex(this.x + this.diameter , this.y);
                    bezierVertex(this.x + this.diameter , this.y + this.diameter  * b0, this.x + this.diameter  * b0, this.y + this.diameter , this.x , this.y + this.diameter );
                    endShape();
                    break;
                case 3:
                    beginShape();
                    vertex(this.x, this.y + this.diameter );
                    vertex(this.x + this.diameter , this.y + this.diameter );
                    bezierVertex(this.x + this.diameter  * b1, this.y + this.diameter , this.x, this.y + this.diameter  * b0, this.x, this.y);
                    endShape();
                    break;
            }
    }
}