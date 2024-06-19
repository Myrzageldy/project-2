function getCountryInfo() {
    const countryName = document.getElementById('countryName').value;
    const countryInfo = document.getElementById('countryInfo');

    countryInfo.innerHTML = 'Загрузка...';
    countryInfo.style.display = 'block'; 

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                const country = data[0];
                const callingCode = country.idd.root + country.idd.suffixes[0];

                countryInfo.innerHTML = `
                    <h2>${country.name.common}</h2>
                    <img src="${country.flags.png}" alt="Флаг ${country.name.common}">
                    <p>Столица: ${country.capital?.[0] || 'Не найдено'}</p>
                    <p>Язык: ${Object.values(country.languages)?.[0] || 'Не найдено'}</p>
                    <p>Валюта: ${Object.values(country.currencies)?.[0].name || 'Не найдено'} (${Object.keys(country.currencies)?.[0] || 'N/A'})</p>
                    <p>Регион: ${country.region}</p>
                    <p>Население: ${country.population.toLocaleString()}</p>
                    <p>Площадь: ${country.area.toLocaleString()} км²</p>
                    <p>Телефонный код: <a href="tel:+${callingCode}">+${callingCode}</a></p>
                    <p>Домен верхнего уровня: ${country.tld?.[0] || 'N/A'}</p>
                    <p>Двузначный код: ${country.cca2}</p>
                    <p>Трехзначный код: ${country.cca3}</p>
                `;
            } catch (error) {
                countryInfo.innerHTML = `Ошибка при обработке данных: ${error.message}`;
            }
        } else {
            countryInfo.innerHTML = `Ошибка: ${xhr.status} ${xhr.statusText}`;
        }
    };
    xhr.onerror = function() {
        countryInfo.innerHTML = 'Ошибка при выполнении запроса';
    };
    xhr.send();
}
