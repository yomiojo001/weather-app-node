const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// declare paths for express routes
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

// server public dir
app.use(express.static(path.join(publicDirectory)));

// handlebars config
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Devmike"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Weather App',
        name: "Devmike"
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
        title: "Weather App",
        name: "Devmike",
        text: "We are more than willing to assist you with the app"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You need to enter an address"
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({error})
        }
        const {latitude, longitude, location} = data
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }else{
                res.send({
                    location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
            }
        })
    })

})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You need to enter a search term"
        })
    }
    console.log(req.query.search);
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Weather App",
        message: "Help article not found!",
        name: "Devmike"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: "Weather App",
        message: "Page not found!",
        name: "Devmike"
    })
})


app.listen(3000, () => {
    console.log("app started on port 3000");
})