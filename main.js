const playButton = document.getElementById("play-button");
const textMessage = document.getElementById("text-message");
const stanfordImages = document.getElementById("stanford-images");
const images = document.querySelectorAll("#stanford-images img");
const audioContainer = document.querySelector(".audio-container");
const music = document.getElementById("myAudio");

let currentImageIndex = 0;
let imageInterval;

playButton.addEventListener("click", () => {
   
    music.play();
    music.muted = false;


    playButton.classList.add("fade-out");
    textMessage.classList.add("fade-out"); 

    audioContainer.style.display = "block";
  
    setTimeout(() => {
        stanfordImages.style.display = "block"; 
        showImage(currentImageIndex); 

        imageInterval = setInterval(() => {
            if (currentImageIndex < images.length - 1) {
                rotateImages(); 
            }
        }, 10000); 
    }, 2000); 

    setTimeout(() => {
        playButton.style.display = "none";
        textMessage.style.display = "none"; 
    }, 1000); 
});

function showImage(index) {
    images[index].classList.add("active");
}

function hideImage(index) {
    images[index].classList.remove("active");
}


function rotateImages() {
    hideImage(currentImageIndex); 
    currentImageIndex = (currentImageIndex + 1) % images.length; 
    showImage(currentImageIndex); 
}


music.addEventListener("ended", () => {

    hideImage(currentImageIndex);
    stanfordImages.style.display = "none"; 
    audioContainer.style.display = "none"; 


    const blackScreen = document.createElement("div");
    blackScreen.style.position = "absolute";
    blackScreen.style.top = "0";
    blackScreen.style.left = "0";
    blackScreen.style.width = "100%";
    blackScreen.style.height = "100%";
    blackScreen.style.backgroundColor = "black";
    blackScreen.style.zIndex = "9999"; 
    document.body.appendChild(blackScreen);
});

music.loop = false;
