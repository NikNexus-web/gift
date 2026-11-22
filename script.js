// ELEMENTS

const openBtn = document.getElementById("openBtn");
const intro = document.getElementById("intro");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("bgMusic");
const musicControl = document.getElementById("musicControl");

const photoOne = document.getElementById("photoOne");
const photoTwo = document.getElementById("photoTwo");

const photoSection = document.getElementById("photoSection");


// PHOTO REVEAL TIMING
// Change this according to the song's lyrics timestamp.

const PHOTO_REVEAL_AT = 15;


// PARTICLES

const particles = document.getElementById("particles");

for (let i = 0; i < 35; i++) {

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.innerHTML = ["✦", "✧", "·", "♡"][
        Math.floor(Math.random() * 4)
    ];

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        (8 + Math.random() * 15) + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particle.style.fontSize =
        (10 + Math.random() * 15) + "px";

    particles.appendChild(particle);
}


// OPEN WEBSITE

let started = false;
let photosRevealed = false;

openBtn.addEventListener("click", async () => {

    if (started) return;

    started = true;

    openBtn.innerHTML = "OPENING YOUR STORY...";

    // Start music after user interaction.

    try {

        music.currentTime = 0;

        await music.play();

        musicControl.classList.remove("hidden");
        musicControl.classList.add("playing");

    } catch (error) {

        console.log("Music could not start:", error);

    }

    // Intro transition

    intro.style.transition = "opacity 1.5s ease";
    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        mainContent.classList.remove("hidden");

        window.scrollTo(0, 0);

        mainContent.scrollIntoView({
            behavior: "smooth"
        });

    }, 1500);

});


// REVEAL PHOTOS AT SONG TIMESTAMP

music.addEventListener("timeupdate", () => {

    if (
        music.currentTime >= PHOTO_REVEAL_AT &&
        !photosRevealed
    ) {

        photosRevealed = true;

        revealPhotos();

    }

});


// REVEAL PHOTOS

function revealPhotos() {

    photoOne.classList.add("show");

    setTimeout(() => {

        photoTwo.classList.add("show");

    }, 1000);

    setTimeout(() => {

        photoSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 1800);

}


// MUSIC BUTTON

musicControl.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicControl.classList.add("playing");

    } else {

        music.pause();

        musicControl.classList.remove("playing");

    }

});


// IF SONG ENDS BEFORE PHOTOS ARE REVEALED

music.addEventListener("ended", () => {

    musicControl.classList.remove("playing");

    if (!photosRevealed) {

        photosRevealed = true;

        revealPhotos();

    }

});


// MUSIC ERROR

music.addEventListener("error", () => {

    console.log("Please check song.mp3 file.");

});


// CONSOLE MESSAGE

console.log("💙 FOREVER & ALWAYS");
console.log("Made with love by Nikunj ❤️");