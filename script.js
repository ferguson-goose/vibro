const button = document.querySelector(".pulsing_button");
const tg = window.Telegram?.WebApp;

let buttonActive = false;
window.addEventListener("load", () => {
    if (!tg) return;

    if (!tg.isExpanded) {
        console.log("expand")
        tg.expand();
    }

    // vibrate();
})

button.addEventListener("click", () => {
    if (!tg) return;

    buttonActive = !buttonActive;

    if (buttonActive) {
        button.classList.add("working");
        button.innerHTML = "Working..."
    } else {
        button.classList.remove("working");
        button.innerHTML = "PUSH ME"
    }

    vibrate();
})

function delayExecution (ms) {
    const { impactOccurred } = tg?.HapticFeedback;

    return new Promise((resolve) => {
        setTimeout(() => {
            impactOccurred("soft")
            resolve()
        }, ms)
    })
}

async function vibrate() {
    while (buttonActive) {
        await delayExecution(100);
    }
}
