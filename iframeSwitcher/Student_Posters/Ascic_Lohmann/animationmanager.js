//
// animationmanager.js
// Ascic_Lukman-Lohmann_Audrey
// 
// Created by Lukman Aščić on 16.12.21.
// Copyright © 2021 Lukman Ascic. All rights reserved.
//

class AnimationManager {
    constructor(dI, lI, rI, flickering = false) {
        this.renderImages = dI, this.leftImages = lI, this.rightImages = rI;
        this.renderImagesCount = 300, this.fadeImagesCount = 21;
        this.isLeft = false;

        this.fade = -180;
        this.fadeAmount = 12.142;
        this.fasterFadeAmount = 255;
        this.timer = 2;

        this.currentImageCount = 0;
        this.halfwayImagesCount = 10;
        this.flickerCount = 0;
        this.maxFlickerCount = 29;
        this.isFlickeringEnabled = flickering;
    }

    ///WE NEED TO PASS IN THE WIDTH AND HEIGHT BECAUSE IF YOU DO IT ONLY IN THE CONSTRUCTOR THE CANVAS WONT GET UPDATED BASED ON THE WINDOW SIZE. W AND H WAS REMOVED FROM THE CONSTRUCTOR
    displayRenderImagesWith(currentPos, wWidth, wHeight) {
        imageMode(CENTER);
        let normal = map(currentPos.x, 0.23, 0.77, 0.0, 1.0);
        let index = floor(this.renderImagesCount * normal);
        index = constrain(index, 0, this.renderImagesCount - 1);
        let centerXAnchor = wWidth / 2; //ASSUMING IMAGE MODE IS SET TO CENTER
        let centerYAnchor = wHeight / 2;
        image(this.renderImages[index], centerXAnchor, centerYAnchor, wWidth, wHeight); //assumed imageMode is set to CENTER
    }

    displayMousePointerWith(position) {
        fill(255, 0, 0);
        circle(position.x, position.y, position.z + 10);
    }

    //WE NEED THIS FOR THE BACKGROUND OF THE TRANSPARENT LEFT-RIGHT-TEXT IMAGES
    animateBackgroundWith(w, h) {
        fill(0, 0, 0, this.fade);
        rect(0, 0, w, h);
    }

    animateImageSequenceWith(index, w, h) {
        //WE'RE DEFINING ALL THE VALUES THAT NEED TO GO IN THE IMAGE METHOD
        let textImage = this.isLeft ? this.leftImages[index] : this.rightImages[index];
        //these numbers all dialed in to match the museum sized screen. it may look off on notebook screens. don't change this
        let imageX = this.isLeft ? (w / 2) - 1 : (w / 2) + 39.5;
        let imageY = this.isLeft ? (h / 2) - 12 : (h / 2) - 13;

        let additional = this.isLeft ? 27 : 158;
        let imageW = this.isLeft ? w + additional : w + additional;
        image(textImage, imageX, imageY + 40, imageW, imageW);
    }

    animateTextInWith(frameCount, w, h) {
        if (frameCount % 60 == 0 && this.timer > 0) {
            this.timer--;
        }
        if (this.timer == 0) {
            if (this.isFlickeringEnabled) {
                this.flickerCount++;

                if (this.flickerCount % 7 === 0) {
                    fill(0, 0, 0, 255);
                    rect(0, 0, w, h);
                } else {
                    fill(0, 0, 0, 44);
                    rect(0, 0, w, h);
                }
                if (this.flickerCount > this.maxFlickerCount) {
                    this.animateFadeIn(w, h);
                }
            } else {
                this.animateFadeIn(w, h);
            }
        }
    }

    animateFadeIn(w, h) {
        this.halfwayImagesCount = 10; //WHEN YOU START THE ANIMATION, YOU WANT TO BEGIN FROM THE BACKWARDSCOUNT OF 10 (IT GETS TO ZERO AFTER FADING OUT, SO WE NEED TO RESET IT)
        //FADE STARTS AT LESS THAN 0, BUT WE ONLY WANT TO START ANIMATING WHEN WE GET TO FADE O SO EVERYTHING GETS UPDATED TOGETHER. WE WANTED TO CREATE A LITTLE DELAY HERE
        if (this.fade > 0) {
            this.animateBackgroundWith(w, h);
            this.animateImageSequenceWith(this.currentImageCount, w, h);
            //ITERATING THROUGH THE LEFT-RIGHT TEXT IMAGES ARRAY
            this.currentImageCount++;
            if (this.currentImageCount > this.fadeImagesCount - 1) {
                this.currentImageCount = this.fadeImagesCount - 1; //WHEN REACHED ENDPOINT, STAY THERE BECAUSE WE WANT IT TO FREEZE IF PERSON IS NOT MOVING
            }
        }
        if (this.fade > 255) {
            this.fade = 255; //KEEP GOING UP WITH THE FADE ADDUP UNTIL WE REACH MORE THAN 255 (MAXIMUM). ADDING FADEAMOUNT DOESN'T HAVE AN EFFECT ANYMORE BECAUSE IT ALWAYS GETS SET TO 255 (THIS FREEZE THING AGAIN)
        }
        this.fade += this.fadeAmount;
    }

    animateTextOutWith(w, h) {
        this.animateBackgroundWith(w, h);
        this.animateImageSequenceWith(this.halfwayImagesCount, w, h);

        //RESETTING VALUES
        this.timer = 2; //WE'VE COUNTED DOWN IN THE 'IN' ANIMATION. NOW WE HAVE TO RESET IT SO WE CAN COUNT DOWN AGAIN
        this.flickerCount = 0; //EXPLAINS IT
        this.currentImageCount = 0; //STARTING TO LOOP FROM MOST TRANSPARENT TO DECKKRAFT 100
        //RESETTING VALUES

        //COUNTING FROM THE MIDDLE OF THE IMAGES ARRAY
        this.halfwayImagesCount--;
        if (this.halfwayImagesCount < 0) {
            this.halfwayImagesCount = 0;
        }
        //COUNTING FROM THE MIDDLE OF THE IMAGES ARRAY

        //FADE OUT AGAIN
        if (this.fade < 0) {
            this.fade = -180;
        }
        this.fade -= this.fasterFadeAmount;
        //FADE OUT AGAIN
    }

    //THIS IS THE FUNCTION WE CALL FROM SKETCH
    checkIfStayingOn(currentPosition, frameCount, wWidth, wHeight) {
        //WHICH DIRECTION AM I HEADING AT? CHANGE FLAG AND ANIMATE ACCORDINGLY. ELSE-IF STATEMENT BECAUSE THEY CAN'T HAPPEN AT THE SAME TIME.
        if (currentPosition.x < 0.2) {
            this.isLeft = true;
            this.animateTextInWith(frameCount, wWidth, wHeight);
        } else if (currentPosition.x > 0.80) {
            this.isLeft = false;
            this.animateTextInWith(frameCount, wWidth, wHeight);
        } else {
            this.animateTextOutWith(wWidth, wHeight);
        }
    }
    //THE MAIN FUNCTION WE CALL FROM SKETCH
}