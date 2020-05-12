const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6d7881dfccf1370db94bb97cd470872c&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Forecast service is unavailble.", undefined)
        } else if (body.error) {
            callback("Location not found.", undefined)
        } else {
            callback(undefined, {
                desc: body.current.weather_descriptions[0],
                icon: body.current.weather_icons[0],
                temp: body.current.temperature,
                humidity: body.current.humidity
            }
            )
        }
    })
}

module.exports = forecast