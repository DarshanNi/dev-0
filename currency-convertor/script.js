// Exchange rate API 
const BASE_URL = `https://v6.exchangerate-api.com/v6/580a8757e6f02810f4368448/latest/USD`

const dropdownSelect = document.querySelectorAll('.dropdown select')
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector('.msg')


for (let select of dropdownSelect) {
    for (let currCode in countryList) {
        let newOption = document.createElement('option')
        newOption.innerText = currCode
        newOption.value = currCode

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "USD") {
            newOption.selected = true;
        }

        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode] // IN 
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newScr;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector(".amount input") // from input box
    let amtVal = amount.value

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1
        amount.value = "1"
    }

    const URL = `${BASE_URL}`
    let response = await fetch(URL);
    const data = await response.json();

    const fromCurrRate = data.conversion_rates[`${fromCurr.value}`]
    const toCurrRate = data.conversion_rates[`${toCurr.value}`]

    let finalAmount = (amtVal / fromCurrRate) * toCurrRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

})
