let classifier;
let label = 'listening...'; // Status-Label
let music;
let isPlaying = false; // Status der Musik

let soundModel = 'https://teachablemachine.withgoogle.com/models/n4xma_2NH/';

function preload() {
  // Lade das Teachable Machine Modell
  music = loadSound("https://hbk-bs.github.io/the-archives-ivohartwig/assets/images/L&W - MAKKO.mp3");
}

function setup() {
  createCanvas(320, 240);
  // Initialisiere den Klassifikator (warten auf die Ladebestätigung)
  console.log("Loading classifier...");
  classifier = ml5.soundClassifier(soundModel + 'model.json', modelReady);
}

// Diese Funktion wird aufgerufen, wenn das Modell geladen wurde
function modelReady() {
  console.log('Model Loaded!');
  classifier.classify(gotResult); // Sobald das Modell geladen ist, starten wir die Klassifikation
}

// Zeichne das Label auf dem Canvas
function draw() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}

// Verarbeite das Ergebnis der Klassifikation
function gotResult(error, results) {
  if (error) {
    console.error('Fehler bei der Klassifikation:', error);
    return;
  }

  // Zeige das erste Ergebnis
  label = results[0].label; // Das erkannte Label

  let play = 0;
  let stop = 0;

  // Durchlaufe die Ergebnisse und berechne Konfidenz für "PLAY" und "STOP"
  results.forEach(result => {
    let soundLabel = result.label.toUpperCase();
    let confidence = result.confidence;

    if (soundLabel === "PLAY") play = confidence;
    if (soundLabel === "STOP") stop = confidence;
  });

  // Zeige die Prozentwerte der Konfidenz
  document.getElementById("play-val").innerText = Math.round(play * 100) + "%";
  document.getElementById("stop-val").innerText = Math.round(stop * 100) + "%";

  // Musiksteuerung basierend auf der Konfidenz
  if (play > 0.8 && !isPlaying) {
    music.play(); // Musik starten
    isPlaying = true;
  }

  if (stop > 0.8 && isPlaying) {
    music.stop(); // Musik stoppen
    isPlaying = false;
  }

  // Starte die Klassifikation erneut, um kontinuierlich zu hören
  classifier.classify(gotResult);
}
