const button = document.querySelector(".pulsing_button");
const tg = window.Telegram?.WebApp;

let buttonActive = false;
window.addEventListener("load", () => {
    if (!tg) return;

    if (!tg.isExpanded) {
        tg.expand();
    }
})

button.addEventListener("click", () => {
    if (!tg) return;

    const { impactOccurred } = tg?.HapticFeedback;
    buttonActive = !buttonActive;

    if (buttonActive) {
        button.classList.add("working");
        button.innerHTML = "Working..."
    } else {
        button.classList.remove("working");
        button.innerHTML = "PUSH ME"
    }
})

while (buttonActive) {
    setTimeout(() => impactOccurred("soft"))
}