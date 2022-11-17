//
// assetmanager.js
// Ascic_Lukman-Lohmann_Audrey
// 
// Created by Lukman Aščić on 16.12.21.
// Copyright © 2021 Lukman Ascic. All rights reserved.
//

class AssetManager {
    constructor() {
      this.renderImages = [];
      this.leftImages = [];
      this.rightImages = [];
    }
  
    prepare() {
      this.prepareRenderImages();
      this.prepareLeftStateImages();
      this.prepareRightStateImages();
    }
  
    prepareRenderImages() {
      for (let i = 300; i >= 0; i--) {
        let imgNo = nf(i, 5);
        this.renderImages[i] = loadImage('render images/image' + imgNo + '.jpg');
      }
    }
    
    prepareLeftStateImages() {
      for (let i = 21 - 1; i >= 0; i--) {
        let imgNo = nf(i, 5);
        this.leftImages[i] = loadImage('left state images/image' + imgNo + '.png');
      }
    }
  
    prepareRightStateImages() {
      for (let i = 21 - 1; i >= 0; i--) {
        let imgNo = nf(i, 5);
        this.rightImages[i] = loadImage('right state images/image' + imgNo + '.png');
      }
    }
  }