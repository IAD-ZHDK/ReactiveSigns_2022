class Brick{
    constructor(length){
        this.length = length;
        this.height = this.length/2;
        this.deep = this.height*2 /* /2*/ ;
        this.frontRGB = 240;
        this.sideRGB = 68;
        this.topRGB = 150;
    }

    place(){
        
        noStroke();

        //ABCD
        /*
        fill(this.frontRGB);
        beginShape();
        vertex(0,0,0); 
        vertex(this.length,0,0);
        vertex(this.length,this.height,0);
        vertex(0,this.height,0);
        endShape();
        */

        //BCEF
        
        beginShape();
        fill(this.sideRGB);
        vertex(this.length, 0, 0);
        vertex(this.length, 0, this.deep);
        vertex(this.length, this.height, this.deep);
        vertex(this.length, this.height, 0);
        endShape();
        

        //ABHE
        
        beginShape();
        fill(this.topRGB);
        vertex(0,0,0);
        vertex(this.length,0,0);
        vertex(this.length,0,this.deep);
        vertex(0,0,this.deep);
        endShape();
        

        // ADGH
        
        beginShape();
        fill(this.sideRGB);
        vertex(0,0,0);
        vertex(0,this.height,0);
        vertex(0,this.height,this.deep);
        vertex(0,0,this.deep);
        endShape();
        

        //CDFG
        
        beginShape();
        fill(this.topRGB);
        vertex(0,this.height,0);
        vertex(0,this.height,this.deep);
        vertex(this.length,this.height,this.deep);
        vertex(this.length,this.height,0);
        endShape();
        

        //EFGH
        beginShape();
        fill(this.frontRGB);
        vertex(0,0,this.deep);
        vertex(this.length,0,this.deep);
        vertex(this.length,this.height,this.deep);
        vertex(0,this.height,this.deep);
        endShape();

        
    }
    
}