const input = document.querySelector("input");
const defaultYen = 0;
let yen = defaultYen;
let multiplier = 1;
let multiplierPrice = 100;

const updateMultiplier = (num) => {
    multiplier = num;
};

document.querySelector("#yenCoin").onkeyup = (e) => {
    if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32
    ) {
        yen += 1
        console.log(yen)
        document.querySelector("p").textContent = `Yen${yen}`
        localStorage.setItem("Yen", yen)
    }
}

document.addEventListener("keyup", (e) => {
    if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        yen += 1;
        console.log(yen);
        document.querySelector("p").textContent = `¥${yen}`;
        localStorage.setItem("Yen", yen);
    }
});

document.querySelector("#yenCoin").addEventListener('click', function () {
    yen += (1 * multiplier)
    console.log(yen)

    document.querySelector("p").textContent = `¥${yen}`
    localStorage.setItem("Yen", yen)
});


window.addEventListener('load', () => {
    const yenValue = localStorage.getItem("Yen");
    const data = localStorage.getItem("colour");
    const multiplierData = localStorage.getItem("Multiplier");
    const multiplierPriceData = localStorage.getItem("MultiplierPrice");

    if (data) {
        input.textContent = data.colour;
        document.querySelector("body").style.background = data;
    }

    if (yenValue) {
        yen = Number(yenValue);
        document.querySelector("p").textContent = `¥${yen}`;
    }

    if (multiplierData) {
        multiplier = Number(multiplierData);
        console.log(`Multiplier loaded: ${multiplier}`);
    }

    if (multiplierPriceData) {
        multiplierPrice = Number(multiplierPriceData);
        console.log(`Multiplier price loaded: ${multiplierPrice}`);
    }
});

input.addEventListener('change', () => {
    console.log(input.value)

    localStorage.setItem("colour", input.value);
    document.querySelector('body').style.background = input.value;
});



document.querySelector('#multiplier').addEventListener('click', () => {
    if (yen >= multiplierPrice) {
        yen -= multiplierPrice; 
        multiplierPrice = Math.ceil(multiplierPrice * 10.5); 
        multiplier *= 2; 
        console.log(`Multiplier updated to: ${multiplier}`);
        console.log(`Yen after deduction: ${yen}`);
        
        document.querySelector("p").textContent = `¥${yen}`; 
        localStorage.setItem("Yen", yen); 
        localStorage.setItem("Multiplier", multiplier); 
        localStorage.setItem("MultiplierPrice", multiplierPrice);
        console.log(`Multiplier price updated to: ${multiplierPrice}`);
    } else {
        console.log("Not enough yen to purchase multiplier.");
    }
});

