# [Music](https://hbk-bs.github.io/teachable-machine-ivohartwig/projects/test_audio/)

* Record start and stop from fellow students
* Different background noises to train the AI better on the words
* When start: song begins
* When stop: song stops


## Images 
<img src="" alt="alt text" width="300" height=auto/>

<img src="" alt="alt text" width="300" height=auto/>





## Code 

```` // Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = '';

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
	let play = 0;
	let stop = 0;
	

	// Gehe alle Vorhersagen durch
	results.forEach(result => {
		let label = result.label.toUpperCase(); // Vorsichtshalber alles groß
		let confidence = result.confidence;

		if (label === "PLAY") play = confidence;
		if (label === "STOP") stop = confidence;
	});

	// Update die Prozentzahlen im HTML
	document.getElementById("play-val").innerText = Math.round(play * 100) + "%";
	document.getElementById("stop-val").innerText = Math.round(stop * 100) + "%";

	// Und weiter geht's
	classifyVideo();
}
````





