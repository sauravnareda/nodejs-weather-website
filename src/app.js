const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {title: 'Weather', name: 'Saurav Meena'});
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About The Webpage', name: 'Saurav Meena'});
})

app.get('/help', (req, res) => {
    res.render('help', {helpText: 'Some tips on webpage', title: 'Help', name: 'Saurav Meena'});
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=> {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })  
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: '404', name: 'Saurav Meena', errorMessage: 'Help article not found.'});
})

app.get('*', (req, res) => {
    res.render('404', {title: '404', name: 'Saurav Meena', errorMessage: 'Page not found.'});
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is Up on Port: 3000');
});

