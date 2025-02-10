const playButton = document.getElementById("play-button");
const textMessage = document.getElementById("text-message");
const stanfordImages = document.getElementById("stanford-images");
const images = document.querySelectorAll("#stanford-images img");
const audioContainer = document.querySelector(".audio-container");
const music = document.getElementById("myAudio");

let currentImageIndex = 0;
let imageInterval;

// Play button click event
playButton.addEventListener("click", () => {
    // Start music playback
    music.play();
    music.muted = false; // Ensure music is unmuted

    // Fade out the play button and text message
    playButton.classList.add("fade-out");
    textMessage.classList.add("fade-out"); // Hide the text message when button is clicked

    // Show audio controls
    audioContainer.style.display = "block";

    // Delay for 2 seconds before showing images
    setTimeout(() => {
        stanfordImages.style.display = "block"; // Show the images container
        showImage(currentImageIndex); // Display the first image

        // Automatically rotate images every 10 seconds
        imageInterval = setInterval(() => {
            if (currentImageIndex < images.length - 1) {
                rotateImages(); // Move to the next image
            }
        }, 10000); // Change image every 10 seconds
    }, 2000); // 2-second delay

    // Remove play button and text message from the DOM after it fades out
    setTimeout(() => {
        playButton.style.display = "none";
        textMessage.style.display = "none"; // Hide the text message completely
    }, 1000); // Wait for the fade-out animation to complete
});

// Function to show the current image
function showImage(index) {
    images[index].classList.add("active");
}

// Function to hide the current image
function hideImage(index) {
    images[index].classList.remove("active");
}

// Function to rotate images
function rotateImages() {
    hideImage(currentImageIndex); // Hide the current image
    currentImageIndex = (currentImageIndex + 1) % images.length; // Move to the next image
    showImage(currentImageIndex); // Show the next image
}

// Listen for when the music ends
music.addEventListener("ended", () => {
    // Remove the last image and show a black screen after the song ends
    hideImage(currentImageIndex);
    stanfordImages.style.display = "none"; // Hide the images container
    audioContainer.style.display = "none"; // Hide the audio controls

    // Show black screen or something after the music ends
    const blackScreen = document.createElement("div");
    blackScreen.style.position = "absolute";
    blackScreen.style.top = "0";
    blackScreen.style.left = "0";
    blackScreen.style.width = "100%";
    blackScreen.style.height = "100%";
    blackScreen.style.backgroundColor = "black";
    blackScreen.style.zIndex = "9999"; // Ensure it's on top of everything
    document.body.appendChild(blackScreen);
});

// Prevent the music from replaying automatically
music.loop = false;
