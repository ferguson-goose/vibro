const button = document.querySelector(".pulsing_button");
const tg = window.Telegram?.WebApp;
const {impactOccurred, notificationOccurred, selectionChanged} = tg?.HapticFeedback;

let buttonActive = false;
let vNum = 0;
const vibroVars = [
    impactOccurred("light"),
    impactOccurred("medium"),
    impactOccurred("heavy"),
    impactOccurred("rigid"),
    impactOccurred("soft"),
    notificationOccurred("error"),
    notificationOccurred("success"),
    notificationOccurred("warning"),
    selectionChanged()];
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
        button.innerHTML = vNum;
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
    return new Promise((resolve) => {
        setTimeout(() => {
            impactOccurred(vibroVars[vNum])
            resolve()
        }, ms)
    })
}

async function vibrate() {
    while (buttonActive) {
        await delayHaptic(10);
    }
}
