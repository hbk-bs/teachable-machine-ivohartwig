// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/poz7vYznR/';

// Video
let video;
let flippedVideo;
// To store the classification results
let labels = [];

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  console.log(classifier);
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw all labels and their confidence
  fill(255);
  textSize(12);
  textAlign(LEFT);
  
  // Display each label and confidence
  let yOffset = 20;
  for (let i = 0; i < labels.length; i++) {
    text(labels[i].label + ': ' + nf(labels[i].confidence * 100, 2, 2) + '%', 10, yOffset);
    yOffset += 20;
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
  console.log(results);
  // Store all results
  labels = results.map(result => {
    return { label: result.label, confidence: result.confidence };
  });

  // Classify again
  classifyVideo();
}
