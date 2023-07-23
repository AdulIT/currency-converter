import countryCode from "./country-list.js"

const select = document.querySelectorAll('select'),
      exchangeBtn = document.querySelector('.exchange_btn'),
      amountInput = document.querySelector('.amount__input'),
      fromCurrency = document.querySelector('.from select'),
      toCurrency = document.querySelector('.to select'),
      exchangeInfo = document.querySelector('.exchange_rate')

for (let i = 0; i < select.length; i++)
{
    for (let currencyCode in countryCode)
    {
        let selected
        if (i == 0)
        {
            selected = currencyCode == 'USD' ? 'selected' : ''
        } else if (i == 1)
        {
            selected = currencyCode == 'KZT' ? 'selected' : ''
        }
        let option = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`
        select[i].insertAdjacentHTML('beforeend', option)
    }
    select[i].addEventListener('change', e =>
    {
        loadFlag(e.target)
    })
}

window.addEventListener('load', getExchangeRate)

exchangeBtn.addEventListener('click', (e) =>
{
    e.preventDefault()
    getExchangeRate()
})

const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function loadFlag(element)
{
    for (let code in countryCode)
    {
        if (code === element.value)
        {
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://flagsapi.com/${countryCode[code].slice(0,3)}/flat/24.png`;
            // imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}


function getExchangeRate()
{
    let amount = Number(amountInput.value)
    const from = fromCurrency.value
    const to = toCurrency.value

    if (amount == "" || amount == "0")
    {
        amountInput.value = "1";
        amount = 1;
    }

    const headers = new Headers();
    headers.append("apikey", "Juppf89pEBxfca6WAxkIQRweB86PsO1e");

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: headers
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(response => response.json())
    .then(result => 
        {
            let exchangeRate = result.result
            exchangeInfo.innerHTML = `${amount} ${from} = ${exchangeRate} ${to}`
            console.log(result)
        })
    .catch(error => console.log('error', error));
}