
const BASE_URL = `https://v6.exchangerate-api.com/v6/580a8757e6f02810f4368448/latest/USD`

const dropdownSelect = document.querySelectorAll('.dropdown select')



for (let select of dropdownSelect) {
    for (currCode in countryList) {
        let newOption = document.createElement('option')
        newOption.innerText = currCode
        newOption.value = currCode
        select.append(newOption)
    }
}

