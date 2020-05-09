const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6d7881dfccf1370db94bb97cd470872c&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=f"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Forecast service is unavailble.", undefined)
        } else if (body.error) {
            callback("Location not found, please try another one", undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + ". It is currently " +
                body.current.temperature + " degrees out. It feels like " +
                body.current.feelslike + " degrees."
            )
        }
    })
}

module.exports = forecast