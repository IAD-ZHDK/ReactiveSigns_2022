class Letter {
	// CONSTRUCT THE LETTER
	constructor(wdth, ease, bg, fg, lttr) {
		this.posX = 0;
		this.posY = 0;
		this.wdth = wdth;
		this.hght = 0;
		this.ease = ease;
		this.fg = fg;
		this.bg = bg;
		this.lttr = lttr;
		this.angle = 12 * vh;
		this.border = 2 * vh;
		this.tria = 0.8 * vh;
		
	}

	draw(TposX, TposY, Thgt) {
		
		this.dist = 0.5*sin(frameCount*0.03)*vh;

		// EASING
		this.posX += (TposX - this.posX+this.border - this.dist) * this.ease;
		this.posY += (TposY - this.posY+this.border - this.dist) * this.ease;
		this.hght += (Thgt - this.hght-+this.border*2 + this.dist) * this.ease;
		this.wdth = screen1.w-this.border*2 + this.dist;

		fill(this.fg);

		if (this.lttr == "E") {

			beginShape();
			vertex(this.posX, this.posY + this.angle);
			vertex(this.posX + this.wdth / 2, this.posY);
			vertex(this.posX + this.wdth, this.posY);
			vertex(this.posX + this.wdth, this.posY + this.hght - this.angle);
			vertex(this.posX + this.wdth / 2, this.posY + this.hght);
			vertex(this.posX, this.posY + this.hght);
			endShape();

			fill(this.bg);

			triangle(
				this.posX + this.wdth / 2, this.posY + 2 * ((this.hght)/5),
				this.posX + this.wdth+1, this.posY + 2 * ((this.hght)/5) - this.angle-this.tria+5,
				this.posX + this.wdth+1, this.posY + 2 * ((this.hght)/5) - this.angle+this.tria+5
			);

			triangle(
				this.posX + this.wdth / 2, this.posY + 3 * (this.hght/5),
				this.posX + this.wdth+1, this.posY + 3 * ((this.hght)/5) - this.angle-this.tria,
				this.posX + this.wdth+1, this.posY + 3 * ((this.hght)/5) - this.angle+this.tria
			);
		} else if (this.lttr == "T") {

			beginShape();
				vertex(this.posX, this.posY + this.angle);
				vertex(this.posX + this.wdth / 2, this.posY);
				vertex(this.posX + this.wdth / 2, this.posY + this.angle);
				vertex(this.posX + this.wdth, this.posY);
				vertex(this.posX + this.wdth, this.posY + this.hght - this.angle);
				vertex(this.posX + this.wdth / 2, this.posY + this.hght);
				vertex(this.posX, this.posY + this.hght);
			endShape();
			fill(this.bg);

			beginShape();
				vertex(this.posX + this.wdth / 2, this.posY + 2*this.angle); // top-left
				if(this.hght > 0.4*height){
					vertex(this.posX + this.wdth / 2, this.posY + 3* (this.hght/4)); // bottom-left
					vertex(this.posX + this.wdth+1, this.posY + 3 * (this.hght/4) - this.angle-this.tria); // bottom-right
				}else{
					vertex(this.posX + this.wdth / 2, this.posY + 2*this.angle); // bottom-left
					vertex(this.posX + this.wdth+1, this.posY + this.hght - 1.6*this.angle); // bottom-right
				}
				vertex(this.posX + this.wdth+1, this.posY + this.angle); // top-right
				
			endShape();

		} else if (this.lttr == "H") {

			beginShape();
				vertex(this.posX, this.posY + this.angle);
				vertex(this.posX + this.wdth / 2, this.posY);
				vertex(this.posX + this.wdth / 2, this.posY + this.angle);
				vertex(this.posX + this.wdth, this.posY);
				vertex(this.posX + this.wdth, this.posY + this.hght - this.angle);
				vertex(this.posX + this.wdth / 2, this.posY + this.hght);
				vertex(this.posX + this.wdth / 2, this.posY + this.hght - this.angle);
			vertex(this.posX, this.posY + this.hght);
			endShape();
			fill(this.bg);

			triangle(
				this.posX + this.wdth / 2 + this.tria, this.posY,
				this.posX + this.wdth / 2 - this.tria, this.posY,
				this.posX + this.wdth / 2, this.posY + this.hght/2.2
			);

			triangle(
				this.posX + this.wdth / 2+this.tria*1.5, this.posY + this.hght,
				this.posX + this.wdth / 2-this.tria*1.5, this.posY + this.hght,
				this.posX + this.wdth / 2, this.posY + this.hght - this.hght/2.2
			);

		} else if (this.lttr == "A") {

			beginShape();
			vertex(this.posX, this.posY + this.angle);
			vertex(this.posX + this.wdth / 2, this.posY);
			vertex(this.posX + this.wdth, this.posY);
			vertex(this.posX + this.wdth, this.posY + this.hght - this.angle);
			vertex(this.posX + this.wdth / 2, this.posY + this.hght);
			vertex(this.posX + this.wdth / 2, this.posY + this.hght - this.angle);
			vertex(this.posX, this.posY + this.hght);
			endShape();
			fill(this.bg);

			triangle(
				this.posX + this.wdth / 2+this.tria, this.posY+this.hght/4,
				this.posX + this.wdth / 2-this.tria, this.posY+this.hght/4,
				this.posX + this.wdth / 2, this.posY + this.hght/2.2
			);

			triangle(
				this.posX + this.wdth / 2+this.tria*2, this.posY + this.hght,
				this.posX + this.wdth / 2-this.tria*2, this.posY + this.hght,
				this.posX + this.wdth / 2, this.posY + this.hght - this.hght/2.2
			);

		} 
	}
}