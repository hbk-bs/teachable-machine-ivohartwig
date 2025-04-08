// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/poz7vYznR/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';
let confidence = 0; // Variable to store the current confidence
let lastLabel = ''; // Variable to store the last label with high confidence

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

	// Draw the label if confidence is high enough
	if (confidence >= 0.98) {
		fill(255);
		textSize(16);
		textAlign(CENTER);
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
	// The results are in an array ordered by confidence.
	// Check the highest confidence result
	let currentLabel = results[0].label;
	let currentConfidence = results[0].confidence;

	// Only update if the confidence is greater than or equal to 98% and it's a new label
	if (currentConfidence >= 0.98 && currentLabel !== lastLabel) {
		label = currentLabel;
		confidence = currentConfidence;
		lastLabel = currentLabel; // Update the last label to prevent changes until a new high-confidence label is detected
	}

	// Classify again!
	classifyVideo();
}
