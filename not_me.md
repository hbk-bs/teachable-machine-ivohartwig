# [Not Me](https://hbk-bs.github.io/teachable-machine-ivohartwig/projects/not_me/)

* Pictures of me and pictures only of the background
* Percentage indication of probability


## Images 
<img src="" alt="alt text" width="300" height=auto/>

<img src="" alt="alt text" width="300" height=auto/>





## Code 

```` // Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/A8kUJ_kq2/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

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

	// Draw the label
	fill(255);
	textSize(16);
	textAlign(CENTER);
	text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
	console.log(results); // Hier siehst du, wie genau deine Labels heißen

	// Reset Werte
	let ivo = 0;
	let notivo = 0;

	// Gehe alle Vorhersagen durch
	results.forEach(result => {
		let label = result.label.toUpperCase(); // Vorsichtshalber alles groß
		let confidence = result.confidence;

		if (label === "IVO") ivo = confidence;
		if (label === "NOTIVO") notivo = confidence;
	});

	// Update die Prozentzahlen im HTML
	document.getElementById("ivo-val").innerText = Math.round(ivo * 100) + "%";
	document.getElementById("notivo-val").innerText = Math.round(notivo * 100) + "%";

	// Und weiter geht's
	classifyVideo();
}
````








