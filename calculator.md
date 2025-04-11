# Calculator 

* Teachable Machine trained on digits
* Percentage indication of probability
* Program recognizes the digits held in front of the camera
* Function: Should be able to calculate using the operators

## Images 
<img src="https://hbk-bs.github.io/teachable-machine-ivohartwig/assets/bla.jpg" alt="alt text" width="300" height=auto/>

<img src="https://hbk-bs.github.io/teachable-machine-ivohartwig/assets/bla2.jpg" alt="alt text" width="300" height=auto/>





## Code 

```` // Classifier Variable
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

let currentExpression = ''; // Store the current expression
let result = ''; // Store the result when '?' is detected
let resultDisplayed = false; // Flag to check if result has been displayed

// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	console.log(classifier);
}

function setup() {
	createCanvas(320, 240);
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

	// Draw the current expression
	fill(255);
	textSize(32);
	textAlign(CENTER, CENTER);
	text(currentExpression, width / 2, height / 2);

	// Only show the result when '?' is detected
	if (label === '?' && !resultDisplayed) {
		// Calculate the result of the expression
		try {
			result = eval(currentExpression); // Compute the result
		} catch (e) {
			result = 'Error'; // In case of an invalid expression
		}

		// Display the result behind the expression
		textSize(24);
		text(result, width / 2, height - 30);
		resultDisplayed = true; // Set the flag to true to indicate that the result has been shown
	}
}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
	// Log the results for debugging
	console.log(results);
	// The results are in an array ordered by confidence.
	// Check the highest confidence result
	let currentLabel = results[0].label;
	let currentConfidence = results[0].confidence;

	// Only update if the confidence is greater than or equal to 98% and it's a new label
	if (currentConfidence >= 0.98 && currentLabel !== lastLabel) {
		lastLabel = currentLabel; // Update the last label to prevent changes until a new high-confidence label is detected

		// If it's not a question mark, add it to the expression
		if (currentLabel !== '?') {
			currentExpression += currentLabel;
			resultDisplayed = false; // Reset result displayed flag so it won't be shown before the question mark
		} else {
			// If '?' is detected, calculate and display the result
			label = '?';
		}
	}

	// Classify again!
	classifyVideo();
}
 ````





