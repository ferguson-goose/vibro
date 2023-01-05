const button = document.querySelector(".pulsing_button");

let buttonActive = false;

button.addEventListener("click", () => {
    console.log("popip")
    buttonActive = !buttonActive;

    if (buttonActive) {
        button.classList.add("working");
    } else {
        button.classList.remove("working");
    }
})