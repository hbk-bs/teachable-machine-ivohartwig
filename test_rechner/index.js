// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/poz7vYznR/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';
let lastLabel = '';  // Variable to store the last label shown
let confidence = 0;  // Variable to store confidence

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

  // Only display the label if the confidence is >= 98%
  fill(255);
  textSize(16);
  textAlign(CENTER);
  
  // Show the label only if the confidence is above 98% and it's a new label
  if (confidence >= 0.98) {
    text(label, width / 2, height - 4);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
  console.log(results);
  // Check if the confidence is 98% or more
  if (results[0].confidence >= 0.98) {
    // If a new label is detected with 98% confidence, update the label
    if (results[0].label !== lastLabel) {
      label = results[0].label;
      lastLabel = results[0].label; // Store the new label as the last label
    }
  }
  // Classify again
  classifyVideo();
}
