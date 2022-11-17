let parent = 'Student_Posters/'
let indexFile ='/index.html'
let posters = ['Janthasom_Hommel' , 'Muniz_Eggstein2D', 'Buenzli_Good','Ascic_Lohmann','Leon_Cowley','Naegeli_Ziegler','Praxmarer_Landolt','Walther_Bischoff']
let testPoster = "demo_poster_simple/index.html"
// not used: 
let posterCount = 0
let intervalTime = 120000; //2 minutes
let trackingActive = false;
let startedFlag = false;
let streaming = false;
let demoMode = false

function trackingCallback(tracking, OSCstreaming) {
  trackingActive = tracking
  streaming = OSCstreaming
}

function changePoster() {
  let newPosterURL = parent+''+posters[posterCount]+''+indexFile
  console.log(newPosterURL);
  document.getElementById('posterFrame').src = newPosterURL;
  if (posterCount < posters.length-1) {
    posterCount++
  } else {
    posterCount = 0;
  }
  let fader = document.getElementById('fader');
  fader.classList.toggle('fadein');
}

function loadTestPoster() {
  let newPosterURL = testPoster
  console.log(newPosterURL);
  document.getElementById('posterFrame').src = newPosterURL;
  let fader = document.getElementById('fader');
  fader.classList.toggle('fadein');
}

function pickPoster(number) {
  // for keyboard selection during testing
  console.log("poster no: "+number)
  if (number-1 < posters.length && number-1 >= 0) {
    clearInterval(myInterval);
    posterCount = number-1;
    //changePoster() 
    transition()
  }
}

function transition() {
  try {
    let iframe = document.getElementById('posterFrame');
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    let fader = iframeDocument.getElementById('loader');
    fader.classList.toggle('fadeout');
  }   catch(e) {
  }
 setTimeout(changePoster, 2000);
}

function intervalHandler(){
  console.log("streaming"+streaming+", trackingActive"+trackingActive+", startedFlag"+startedFlag)
   if (demoMode || (streaming && (!trackingActive || !startedFlag)) ) {
    startedFlag = true;
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, intervalTime)
    //changePoster()
    transition()
   } else if (!streaming) {
     //reload demo poster to try connecting via osc again  
     clearInterval(myInterval);
     myInterval = setInterval(intervalHandler, 6000); 
     loadTestPoster();
   } else {
    // skip change if someone is in front of poster, try again after delay 
    clearInterval(myInterval);
    myInterval = setInterval(intervalHandler, 1000);
    //console.log("tracking: "+ trackingActive);
   } 
}

let myInterval = setInterval(intervalHandler, 6000); 



document.addEventListener('keypress', pickPoster, true);
