const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

const app = express()

//define paths for Express' config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Pius Wiatmojo"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Pius Wiatmojo"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Pius Wiatmojo",
        helpMessage: "This is a helpfull message"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address."
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({ location, forecastData })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }



    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: "404",
        name: "Pius Krisantono",
        errorMessage: "Help Article not found",
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: "404",
        name: "Pius Krisantono",
        errorMessage: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})