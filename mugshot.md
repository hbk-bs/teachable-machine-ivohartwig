# [Mugshot](https://hbk-bs.github.io/teachable-machine-ivohartwig/projects/mugshot/)

* Use pictures of fellow students to build an AI model
* Pictures in front of a neutral background -> avoid disturbances
* Percentage indication of probability
* From a certain probability a gimmick


## Images 
<img src="" alt="alt text" width="300" height=auto/>

<img src="" alt="alt text" width="300" height=auto/>





## Code 

```` // Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/p4Hls1KC-/';

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

}

// Get a prediction for the current video frame
function classifyVideo() {
	classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results) {
	console.log(results); // Hier siehst du, wie genau deine Labels heißen

	// Reset Werte
	let pauline = 0;
	let andrea = 0;
	let luca = 0;

	// Gehe alle Vorhersagen durch
	results.forEach(result => {
		let label = result.label.toUpperCase(); // Vorsichtshalber alles groß
		let confidence = result.confidence;

		if (label === "PAULINE") pauline = confidence;
		if (label === "ANDREA") andrea = confidence;
		if (label === "LUCA") luca = confidence;
	});

	// Update die Prozentzahlen im HTML
	document.getElementById("pauline-val").innerText = Math.round(pauline * 100) + "%";
	document.getElementById("andrea-val").innerText = Math.round(andrea * 100) + "%";
	document.getElementById("luca-val").innerText = Math.round(luca * 100) + "%";

	// Und weiter geht's
	classifyVideo();
}
````








