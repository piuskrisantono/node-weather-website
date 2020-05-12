const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherReport = document.querySelector('#weather-report')
const dataLocation = document.querySelector('#data-location')
const dataDescription = document.querySelector('#data-description')
const imageDescription = document.querySelector('#image-description')
const dataTemperature = document.querySelector('#data-temperature')
const dataHumidity = document.querySelector('#data-humidity')

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = search.value

    weatherReport.style.display === "grid" ? weatherReport.style.display = "none" : "grid"

    dataLocation.textContent = "Loading..."


    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                dataLocation.textContent = data.error
            } else {
                weatherReport.style.display = "grid"
                dataLocation.textContent = data.location
                dataDescription.textContent = data.forecastData.desc
                imageDescription.setAttribute("src", data.forecastData.icon)
                dataTemperature.textContent = data.forecastData.temp
                dataHumidity.textContent = data.forecastData.humidity
            }
        })
    })


})