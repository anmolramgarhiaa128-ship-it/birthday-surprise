// ================================
// BIRTHDAY WEBSITE - JAVASCRIPT
// JavaScript ES6 + Canvas API
// ================================

// ---------- Popup Elements ----------

const surpriseButton = document.getElementById("surpriseButton");
const surprisePopup = document.getElementById("surprisePopup");
const closePopup = document.getElementById("closePopup");
const closeSurprise = document.getElementById("closeSurprise");


// ---------- Canvas Setup ----------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let confetti = [];


// Make canvas full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ---------- Create Confetti ----------

function createConfetti() {

    confetti = [];

    for (let i = 0; i < 150; i++) {

        confetti.push({
            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height - canvas.height,

            size: Math.random() * 8 + 4,

            speed: Math.random() * 3 + 2,

            rotation: Math.random() * 360,

            rotationSpeed: Math.random() * 6 - 3,

            color: `hsl(${Math.random() * 360}, 80%, 60%)`
        });

    }
}


// ---------- Animate Confetti ----------

function animateConfetti() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    confetti.forEach((piece) => {

        ctx.save();

        ctx.translate(piece.x, piece.y);

        ctx.rotate(
            piece.rotation * Math.PI / 180
        );

        ctx.fillStyle = piece.color;

        ctx.fillRect(
            -piece.size / 2,
            -piece.size / 2,
            piece.size,
            piece.size
        );

        ctx.restore();


        // Move down
        piece.y += piece.speed;

        // Rotate
        piece.rotation += piece.rotationSpeed;


        // Bring back to top
        if (piece.y > canvas.height) {

            piece.y = -10;

            piece.x = Math.random() * canvas.width;
        }

    });

    requestAnimationFrame(animateConfetti);
}


// ---------- Open Surprise ----------

surpriseButton.addEventListener("click", () => {

    surprisePopup.classList.add("show");

    createConfetti();
    animateConfetti();

    setTimeout(() => {
        confetti = [];
    }, 15000);

});


// ---------- Close Popup ----------

closePopup.addEventListener("click", () => {

    surprisePopup.classList.remove("show");

});


closeSurprise.addEventListener("click", () => {

    surprisePopup.classList.remove("show");

});


// ---------- Click Outside Popup ----------

surprisePopup.addEventListener("click", (event) => {

    if (event.target === surprisePopup) {

        surprisePopup.classList.remove("show");

    }

});
// ================================
// FLOATING HEARTS ❤️
// ================================

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";

    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";

    heart.style.pointerEvents = "none";
    heart.style.zIndex = "10";

    heart.style.animation =
        `heartFloat ${Math.random() * 3 + 4}s linear forwards`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}


// Create a heart every 700 milliseconds
setInterval(createHeart, 700);
// ================================
// FIREWORKS 🎆
// ================================

function createFirework() {

    const centerX = Math.random() * canvas.width;
    const centerY = Math.random() * (canvas.height * 0.6);

    const particles = [];

    for (let i = 0; i < 60; i++) {

        const angle = Math.random() * Math.PI * 2;

        const speed = Math.random() * 6 + 2;

        particles.push({
            x: centerX,
            y: centerY,

            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,

            life: 100,

            size: Math.random() * 3 + 2,

            color: `hsl(${Math.random() * 360}, 90%, 65%)`
        });
    }

    animateFirework(particles);
}


function animateFirework(particles) {

    function animate() {

        particles.forEach((particle) => {

            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.vy += 0.05;

            particle.life -= 1;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = particle.color;

            ctx.globalAlpha = particle.life / 100;

            ctx.fill();

        });

        ctx.globalAlpha = 1;

        particles = particles.filter(
            particle => particle.life > 0
        );

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}


// Fireworks when surprise button is clicked
surpriseButton.addEventListener("click", () => {

    for (let i = 0; i < 5; i++) {

        setTimeout(() => {
            createFirework();
        }, i * 400);

    }

});
// =========================
// SECRET LETTER + BALLOONS
// =========================

const openLetter = document.getElementById("openLetter");
const letter = document.getElementById("letter");
const envelope = document.getElementById("envelope");

openLetter.addEventListener("click", () => {

    // Open letter
    letter.classList.add("show");

    envelope.innerHTML = "💖";

    openLetter.innerHTML = "Letter Opened 💌";
    openLetter.disabled = true;

    // Release balloons 🎈
    releaseBalloons();

});

function releaseBalloons() {

    for (let i = 0; i < 15; i++) {

        setTimeout(() => {

            const balloon = document.createElement("div");

            balloon.innerHTML = "🎈";

            balloon.style.position = "fixed";
            balloon.style.left = Math.random() * 100 + "vw";
            balloon.style.bottom = "-80px";

            balloon.style.fontSize =
                Math.random() * 30 + 35 + "px";

            balloon.style.zIndex = "200";

            balloon.style.pointerEvents = "none";

            balloon.style.animation =
                `balloonFly ${Math.random() * 3 + 4}s linear forwards`;

            document.body.appendChild(balloon);

            setTimeout(() => {
                balloon.remove();
            }, 7000);

        }, i * 200);

    }
}
// =========================

// SURPRISE GIFT POPUP
// =========================

const giftBoxes = document.querySelectorAll(".gift-box");

const giftPopup = document.getElementById("giftPopup");
const closeGiftPopup = document.getElementById("closeGiftPopup");

const popupGift = document.getElementById("popupGift");
const giftTitle = document.getElementById("giftTitle");
const giftPopupMessage = document.getElementById("giftPopupMessage");

giftBoxes.forEach((gift) => {

    gift.addEventListener("click", () => {

        const message = gift.getAttribute("data-message");

        // Open popup
        giftPopup.classList.add("show");

        // Reset gift animation
        popupGift.innerHTML = "🎁";

        // Normal gifts
        giftTitle.innerHTML = "Surprise! 🎉";
        giftPopupMessage.textContent = message;

        // Reaction
        createGiftReaction();

        // Special Gift 3 🎂
        if (gift.classList.contains("special-gift")) {

            setTimeout(() => {

                popupGift.innerHTML = "🎂";

                giftTitle.innerHTML =
                    "🎉 HAPPY BIRTHDAY! 🎉";

                // Display your own Gift 3 message
                giftPopupMessage.textContent = message;

                createConfetti();
                animateConfetti();

                releaseBalloons();

            }, 700);

        }

    });

});


// Close popup

closeGiftPopup.addEventListener("click", () => {

    giftPopup.classList.remove("show");

});


// Close when clicking outside

giftPopup.addEventListener("click", (event) => {

    if (event.target === giftPopup) {

        giftPopup.classList.remove("show");

    }

});


// =========================
// GIFT REACTION
// =========================

function createGiftReaction() {

    const reactions = [
        "🎉",
        "💖",
        "💕",
        "✨",
        "🎈",
        "🥳",
        "💝"
    ];

    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            const reaction = document.createElement("div");

            reaction.innerHTML =
                reactions[
                    Math.floor(Math.random() * reactions.length)
                ];

            reaction.style.position = "fixed";

            reaction.style.left =
                Math.random() * 100 + "vw";

            reaction.style.bottom = "-40px";

            reaction.style.fontSize =
                Math.random() * 25 + 20 + "px";

            reaction.style.zIndex = "600";

            reaction.style.pointerEvents = "none";

            reaction.style.animation =
                "reactionFly 3s linear forwards";

            document.body.appendChild(reaction);

            setTimeout(() => {

                reaction.remove();

            }, 3000);

        }, i * 150);

    }

}
// =========================
// BIRTHDAY CAKE CELEBRATION
// =========================

const blowCandles = document.getElementById("blowCandles");
const wishMessage = document.getElementById("wishMessage");
const flames = document.querySelectorAll(".flame");

blowCandles.addEventListener("click", () => {

    // Blow out candles 💨
    flames.forEach((flame, index) => {

        setTimeout(() => {
            flame.style.display = "none";
        }, index * 250);

    });

    blowCandles.innerHTML = "🎉 Birthday Celebration!";

    // Wind effect 💨
    createWind();

    // Candies and chocolates 🍬🍫
    createTreats();

    // Play Happy Birthday 🎵
    playBirthdayTune();

    // Show birthday message
    setTimeout(() => {

        wishMessage.innerHTML =
            "🎉 HAPPY BIRTHDAY! 🎉" +
            "<br><br>" +
            "May all your wishes come true! 💖✨";

        wishMessage.classList.add("show");

    }, 1200);

    // Hearts ❤️
    for (let i = 0; i < 15; i++) {

        setTimeout(() => {
            createHeart();
        }, i * 120);

    }

    // Balloons 🎈
    setTimeout(() => {
        releaseBalloons();
    }, 500);

});


// =========================
// WIND / AIR EFFECT 💨
// =========================

function createWind() {

    for (let i = 0; i < 18; i++) {

        const wind = document.createElement("div");

        wind.innerHTML = "💨";

        wind.style.position = "fixed";
        wind.style.left = "35%";
        wind.style.top = "45%";

        wind.style.fontSize =
            Math.random() * 20 + 20 + "px";

        wind.style.zIndex = "700";
        wind.style.pointerEvents = "none";

        wind.style.animation =
            "windBlow 1.5s ease-out forwards";

        document.body.appendChild(wind);

        setTimeout(() => {
            wind.remove();
        }, 1600);

    }
}


// =========================
// CANDIES + CHOCOLATES 🍬🍫
// =========================

function createTreats() {

    const treats = [
        "🍬",
        "🍭",
        "🍫",
        "🍬",
        "🍫",
        "🍭",
        "🍬",
        "🍫",
        "🍭",
        "🍬",
        "🍫",
        "🍬"
    ];

    treats.forEach((item, index) => {

        setTimeout(() => {

            const treat = document.createElement("div");

            treat.innerHTML = item;

            treat.style.position = "fixed";

            treat.style.left =
                Math.random() * 90 + 5 + "vw";

            treat.style.top = "-50px";

            treat.style.fontSize =
                Math.random() * 20 + 25 + "px";

            treat.style.zIndex = "650";
            treat.style.pointerEvents = "none";

            treat.style.animation =
                `treatFall ${Math.random() * 2 + 3}s linear forwards`;

            document.body.appendChild(treat);

            setTimeout(() => {
                treat.remove();
            }, 5500);

        }, index * 150);

    });

}


// =========================
// HAPPY BIRTHDAY TUNE 🎵
// =========================

function playBirthdayTune() {

    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const audio = new AudioContext();

    const notes = [
        264, 264, 297, 264, 352, 330,
        264, 264, 297, 264, 396, 352,
        264, 264, 528, 440, 352, 330, 297,
        466, 466, 440, 352, 396, 352
    ];

    let time = audio.currentTime;

    notes.forEach((frequency, index) => {

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(
            0.25,
            time + 0.03
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            time + 0.35
        );

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start(time);
        oscillator.stop(time + 0.4);

        time += 0.4;

    });

}
// =================================
// OPENING COUNTDOWN
// =================================

const countdownScreen =
    document.getElementById("countdownScreen");

const countdownNumber =
    document.getElementById("countdownNumber");

let count = 3;

const countdownMessages = {
    3: "Get ready... ✨",
    2: "Something special is coming... 💖",
    1: "Make a wish... 🎂"
};

function startCountdown() {

    countdownNumber.textContent = count;

    const message =
        document.querySelector(".countdown-content p");

    message.textContent =
        countdownMessages[count];

    // Restart animation
    countdownNumber.style.animation = "none";

    void countdownNumber.offsetWidth;

    countdownNumber.style.animation =
        "countdownPulse 1s ease-in-out";

    if (count > 0) {

        setTimeout(() => {

            count--;

            if (count > 0) {

                startCountdown();

            } else {

                showBirthdayPage();

            }

        }, 1000);

    }

}


// =================================
// SHOW BIRTHDAY PAGE
// =================================

function showBirthdayPage() {

    countdownNumber.innerHTML = "🎉";

    document.querySelector(".countdown-content p")
        .textContent = "Happy Birthday! ❤️";

    countdownNumber.style.animation =
        "countdownPulse 0.8s ease-in-out";

    setTimeout(() => {

        countdownScreen.classList.add("hide");

        // Celebration when page appears
        createHeart();

        setTimeout(() => {
            createHeart();
        }, 200);

        setTimeout(() => {
            createHeart();
        }, 400);

    }, 1000);

}


// Start automatically
startCountdown();
/* =========================
   GRAND FINALE
========================= */

const finaleButton = document.getElementById("finaleButton");
const finalMessage = document.getElementById("finalMessage");

finaleButton.addEventListener("click", () => {

    finalMessage.classList.add("show");

    finaleButton.innerHTML = "💖 Surprise Revealed 💖";
    finaleButton.disabled = true;

    // Hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }

    // Balloons
    setTimeout(() => {
        releaseBalloons();
    }, 500);

    // Confetti
    setTimeout(() => {
        createConfetti();
        animateConfetti();
    }, 700);

});
/* =========================
   NIGHT MESSAGE POPUP
========================= */

const nightMessageButton =
    document.getElementById("nightMessageButton");

const nightPopup =
    document.getElementById("nightPopup");

const closeNightPopup =
    document.getElementById("closeNightPopup");


nightMessageButton.addEventListener("click", () => {

    nightPopup.classList.add("show");

});


closeNightPopup.addEventListener("click", () => {

    nightPopup.classList.remove("show");

});


nightPopup.addEventListener("click", (event) => {

    if (event.target === nightPopup) {

        nightPopup.classList.remove("show");

    }

});


/* =========================
   TEDDY FINAL SURPRISE
========================= */

const teddyButton =
    document.getElementById("teddyButton");

const letterPaper =
    document.getElementById("letterPaper");

const finalTeddyPopup =
    document.getElementById("finalTeddyPopup");

const closeTeddyPopup =
    document.getElementById("closeTeddyPopup");


teddyButton.addEventListener("click", () => {

    // Teddy takes the letter out
    letterPaper.classList.add("out");

    teddyButton.innerHTML =
        "💌 Teddy Found Something For You!";

    teddyButton.disabled = true;


    // Little hearts
    for (let i = 0; i < 15; i++) {

        setTimeout(() => {

            createHeart();

        }, i * 150);

    }


    // Open final popup after teddy reveals letter
    setTimeout(() => {

        finalTeddyPopup.classList.add("show");

        releaseBalloons();

    }, 1500);

});


closeTeddyPopup.addEventListener("click", () => {

    finalTeddyPopup.classList.remove("show");

});


finalTeddyPopup.addEventListener("click", (event) => {

    if (event.target === finalTeddyPopup) {

        finalTeddyPopup.classList.remove("show");

    }

});


/* Responsive Hug Image */
.final-teddy-popup {
    width: min(90vw, 520px) !important;
    max-height: 90vh;
    max-height: 90dvh;
    margin: auto;
    padding: 12px;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.exact-hug-image {
    display: block;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    max-height: 82vh;
    max-height: 82dvh;
    object-fit: contain;
    margin: auto;
}

/* Mobile screen */
@media screen and (max-width: 600px) {
    .final-teddy-popup {
        width: 94vw !important;
        max-height: 88dvh;
        padding: 8px;
    }

    .exact-hug-image {
        width: 100% !important;
        max-height: 78dvh;
        object-fit: contain;
    }
}
