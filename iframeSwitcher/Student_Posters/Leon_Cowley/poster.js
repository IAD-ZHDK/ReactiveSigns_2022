
let buffer;
let buffer2;
let imagePixels = [];
let Birds = [];

function preload() {
  buffer = loadImage('pixel_final_2.jpg') 
  buffer2 = loadImage('pixel_final.jpg') 
}

function setup() {
  createCanvas(getWindowWidth(), getWindowHeight()); // impartant! Don't modify this line. 
  setupOSC(true);  // impartant! Don't remove this line. The boolean argument turns the depthstream on and off
  setupBirds();
  rectMode(CENTER) //////// Luke: added for drawing birds
  noStroke(); //////// Luke: added for drawing birds
  // print(imagePixels)
}


function setupBirds() {
  Birds = []; 
// loop through all the pixels in the buffer and save them to an array
for (let x = 0; x < buffer.width; x++) {
  for (let y = 0; y < buffer.height; y++) {
    let pixelColor = buffer.get(x, y);
    let r = pixelColor[1] // red(pixelColor); //lets just take the first color chanel //numero sulkeiden sisällä kertoo mitä värikanavaa koodi etsii. Ei pitäisi olla väliä onko se 1, 2 vai 3, jos kuvien värit ovat valkoinen ja musta.
    if (r > 110) { // Tämä oli alunperin 0. Nyt kun arvo on 100, niin ei haittaa vaikka taustan värit eivät oo täysin mustia (tai toisin sanoen valittu värikanava tasan 0). Tämän voi muuttaa takaisin nollaksi, jos tausta on varmasti täysin musta tai vähintäänkin pixelColorissa valittu värikanava saa arvon 0.
      let startX = x / buffer.width;
      let startY = y / buffer.height;
      Birds.push(new Bird(startX, startY));
    }
  }
}
console.log("birds count: "+ Birds.length)

let index = 0;
for (let x = 0; x < buffer2.width; x++) {
  for (let y = 0; y < buffer2.height; y++) {
    let pixelColor = buffer2.get(x, y);
    let r = pixelColor[1] // red(pixelColor); //lets just take the first color chanel //numero sulkeiden sisällä kertoo mitä värikanavaa koodi etsii. Ei pitäisi olla väliä onko se 1, 2 vai 3, jos kuvien värit ovat valkoinen ja musta.
    if (r > 30) { // Tämä oli alunperin 0. Nyt kun arvo on 100, niin ei haittaa vaikka taustan värit eivät oo täysin mustia (tai toisin sanoen valittu värikanava tasan 0). Tämän voi muuttaa takaisin nollaksi, jos tausta on varmasti täysin musta tai vähintäänkin pixelColorissa valittu värikanava saa arvon 0.
      let endX = x / buffer2.width;
      let endY = y / buffer2.height;
      if (index < Birds.length) {
        Birds[index].setEnd(endX, endY);
      } else {
         //add new bird
      console.log("extra bird")
      let randomIndex = floor(random(index-1));
      let tempBird = new Bird(Birds[randomIndex].startX, Birds[randomIndex].startY)
      tempBird.setEnd(endX, endY); 
      //tempBird.extra = true;
      Birds.push(tempBird);
     // Birds[index].extra = true;
     // Birds[index].setEnd(endX, endY); 
      }
      index++;
    }
  }
}
while (index < Birds.length) {
  console.log("add random end coordinate")
  let randomIndex = floor(random(index-1));
   Birds[index].setEnd(Birds[randomIndex].endX,  Birds[randomIndex].endY);
  index++;
}
console.log("birds count: "+ Birds.length +"2nd inded: "+index)
}


function draw() {
  background(0, 0, 0);
for (let i = 0; i < Birds.length; i++) {
    Birds[i].draw();
  }
  posterTasks(); // do not remove this last line!  
}

function windowScaled() { // this is a custom event called whenever the poster is scalled
 // textSize(10 * vw);
  setupBirds()
}
