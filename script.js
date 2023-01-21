const button = document.querySelector(".pulsing_button");
const tg = window.Telegram?.WebApp;

let buttonActive = false;
let vNum = 0;

const vibroVars = [
    "soft",
    "medium",
    "heavy",
    "success",
];

window.addEventListener("load", () => {
    if (!tg) return;

    if (!tg.isExpanded) {
        tg.expand();
    }
})

button.addEventListener("click", () => {
    if (!tg) return;

    buttonActive = !buttonActive;

    if (buttonActive) {
        button.classList.add("working");
        button.innerHTML = vibroVars[vNum];
    } else {
        button.classList.remove("working");
        button.innerHTML = "PUSH ME"

        if (vNum < vibroVars.length - 1) {
            vNum++;
        } else {
            vNum = 0;
        }
    }

    vibrate();
})

function delayHaptic(ms) {
    const {impactOccurred, notificationOccurred} = tg?.HapticFeedback;

    return new Promise((resolve) => {
        setTimeout(() => {
            if (vNum <= 2) {
                resolve(impactOccurred(vibroVars[vNum]));
            } else {
                resolve(notificationOccurred(vibroVars[vNum]))
            }
        }, ms)
    })
}

async function vibrate() {
    while (buttonActive) {
        await delayHaptic(10);
    }
}
