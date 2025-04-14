// Globale Variablen
let classifier;
let label = "Warte auf Ton...";
let music;
let isPlaying = false;

// Soundmodell-URL von Teachable Machine
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/CsBmTPCRQ/'; // <<< ERSETZEN!

function preload() {
  // Musik laden
  music = loadSound("https://hbk-bs.github.io/the-archives-ivohartwig/assets/images/L&W - MAKKO.mp3");
}

function setup() {
  noCanvas();

  // Sound-Classifier laden
  classifier = ml5.soundClassifier(soundModelURL + 'model.json', {
    probabilityThreshold: 0.7
  }, modelReady);
}

function modelReady() {
  console.log("Sound Model geladen");
  classifier.classify(gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  let confidence = results[0].confidence;

  // Label anzeigen
  document.getElementById("play-val").innerText = label === "Play" ? Math.round(confidence * 100) + "%" : "0%";
  document.getElementById("stop-val").innerText = label === "Stop" ? Math.round(confidence * 100) + "%" : "0%";

  // Musiklogik
  if (label === "Play" && confidence > 0.8 && !isPlaying) {
    music.play();
    isPlaying = true;
  }

  if (label === "Stop" && confidence > 0.8 && isPlaying) {
    music.stop();
    isPlaying = false;
  }
}
