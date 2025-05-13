const input = document.querySelector("input");
const defaultYen = 0;
let yen = defaultYen;

document.querySelector("#yenCoin").addEventListener('click', function () {
    yen += 1
    console.log(yen)
    document.querySelector("p").textContent = `Yen: ${yen}`
    localStorage.setItem("Yen", yen)
});
document.querySelector("#yenCoin").onkeyup = (e) => {
    if (e.key == " " ||
    e.code == "Space" ||      
    e.keyCode == 32      
) {
    yen += 1
    console.log(yen)
    document.querySelector("p").textContent = `Yen: ${yen}`
    localStorage.setItem("Yen", yen)
}
}

document.addEventListener("keyup", (e) => {
    if (e.key === " " || e.code === "Space") {
        e.preventDefault(); // Prevent default spacebar behavior (e.g., scrolling)
        yen += 1;
        console.log(yen);
        document.querySelector("p").textContent = `Yen: ${yen}`;
        localStorage.setItem("Yen", yen);
    }
});

window.addEventListener('load', () => {
    const yenValue = localStorage.getItem("Yen")
    const data = localStorage.getItem("colour");

    if (data) {
        input.textContent = data.colour;

        document.querySelector("body").style.background = data
    }

    if (yenValue) {
        document.textContent = yenValue.Yen
        yen = Number(yenValue);

        document.querySelector("p").textContent = `Yen: ${yenValue}`
    }
});

input.addEventListener('change', () => {
    console.log(input.value)

    localStorage.setItem("colour", input.value);
    document.querySelector('body').style.background = input.value;
});



