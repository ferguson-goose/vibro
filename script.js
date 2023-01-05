const button = document.querySelector(".pulsing_button");
const tg = window.Telegram?.WebApp;

let buttonActive = false;
let vNum = 0;
const vibroVars = [
    "light",
    "medium",
    "heavy",
    "rigid",
    "soft",
    "error",
    "success",
    "warning",
    "selectionChanged"
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
    const {impactOccurred, notificationOccurred, selectionChanged} = tg?.HapticFeedback;

    return new Promise((resolve) => {
        setTimeout(() => {
            if (vNum <= 4) {
                impactOccurred(vibroVars[vNum]);
            } else if (vNum > 4 && vNum < 8) {
                notificationOccurred(vibroVars[vNum])
            } else if (vNum > 7) {
                selectionChanged();
            }
            resolve()
        }, ms)
    })
}

async function vibrate() {
    while (buttonActive) {
        await delayHaptic(10);
    }
}
