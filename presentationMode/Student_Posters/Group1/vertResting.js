class VertCreate {
    constructor(x,y,colorState, state, diameter){
        this.diameter = diameter;
        this.x = x;
        this.y = y;
        this.colorState = colorState;
        this.displayColor = colorState;
        this.flipedFlag = false; 
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
       // if(this.flipedFlag) {
          //  fill(255,0,0)
           // rect(this.x, this.y,5,5)
     //      }
    }
}