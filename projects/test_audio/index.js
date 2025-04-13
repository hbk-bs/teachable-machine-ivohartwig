// Classifier Variable
let classifier;
// Model URL
// HERE
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/n4xma_2NH/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = '';

// Load the model first
function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');
	console.log(classifier);
	music = loadSound("https://hbk-bs.github.io/the-archives-ivohartwig/assets/images/L&W - MAKKO.mp3")
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
// Globale Musikvariable (hast du schon im preload)
let music;
let isPlaying = false; // Status-Flag

function gotResult(results) {
	console.log(results);

	let play = 0;
	let stop = 0;

	results.forEach(result => {
		let label = result.label.toUpperCase();
		let confidence = result.confidence;

		if (label === "PLAY") play = confidence;
		if (label === "STOP") stop = confidence;
	});

	document.getElementById("play-val").innerText = Math.round(play * 100) + "%";
	document.getElementById("stop-val").innerText = Math.round(stop * 100) + "%";

	// Musiksteuerung basierend auf Konfidenz
	if (play > 0.8 && !isPlaying) {
		music.play();
		isPlaying = true;
	}

	if (stop > 0.8 && isPlaying) {
		music.stop();
		isPlaying = false;
	}

	classifyVideo();
}