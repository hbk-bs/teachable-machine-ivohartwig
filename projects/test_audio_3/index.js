// Globale Variablen
let classifier;
let label = "Warte auf Ton...";
let music;
let isPlaying = false;

// Soundmodell-URL von Teachable Machine
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/QPmRhgoqk/'; 

function preload() {
  // Musik laden
  music = loadSound("https://hbk-bs.github.io/the-archives-ivohartwig/assets/images/L&W - MAKKO.mp3");
  // Sound-Classifier laden
  classifier = ml5.soundClassifier(soundModelURL + 'model.json', {
    probabilityThreshold: 0.7
  }, modelReady);
}

function setup() {
  noCanvas();
  classifier.classifyStart(gotResult);

}

function modelReady() {
  console.log("Sound Model geladen");
}

function gotResult(results) {
  console.log(results); // Hier siehst du die genaue Struktur und die Labels

  // Reset-Werte
  let play = 0;
  let stop = 0;


  // Alle Vorhersagen durchgehen
  results.forEach(result => {
    let label = result.label.toUpperCase();  // Labels in Großbuchstaben (optional, je nach Bedarf)
    let confidence = result.confidence;

    // Überprüfen, ob das Label übereinstimmt
    if (label === "PLAY") play = confidence;
    if (label === "STOP") stop = confidence;
  });

  // Update der HTML-Anzeige
  document.getElementById("play-val").innerText = Math.round(play * 100) + "%";
  document.getElementById("stop-val").innerText = Math.round(stop * 100) + "%";

  // Musiksteuerung
  if (play > 0.3 && !isPlaying) {
    music.play();
    isPlaying = true;
  }

  // if (stop > 0.3 && isPlaying) {
  //   music.stop();
  //   isPlaying = false;
  // }

}

