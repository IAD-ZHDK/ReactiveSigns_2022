//
// sketch.js
// Ascic_Lukman-Lohmann_Audrey
// 
// Created by Lukman Aščić on 14.12.21.
// Copyright © 2021 Lukman Ascic. All rights reserved.
//

let animationManager;
let assetManager;

function preload() {
  assetManager = new AssetManager();
  assetManager.prepare();
}

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight());
  
  animationManager = new AnimationManager(assetManager.renderImages, assetManager.leftImages, assetManager.rightImages, false);
  setupOSC(false);
  noCursor();
}

function draw() {
  background(0);
  animationManager.displayRenderImagesWith(posNormal, width, height);
  //animationManager.displayMousePointerWith(position);
  animationManager.checkIfStayingOn(posNormal, frameCount, width, height);
  posterTasks();
}

let lastVector;
let DragVector;
let playBackFlag = false;
let velocityAverage = 0;
