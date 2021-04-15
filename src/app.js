const path = require('path')
const express = require('express')
const hbs = require('hbs')
const isProvided = require('../utilities/utils').isProvided
const geocode = require('../utilities/geocode')
const forecast = require('../utilities/forecast')

const app = express()
const port = process.env.PORT || 3000

const public = path.join(__dirname,'../public')

/*
Can be done if youd like to use a diffrent name or location for the views folder
in this case we are useing a folder called templates in the web-server folder
const viewsPath = path.join(__dirname,'../templates')
app.set('views',viewsPath)
*/

const partialsPath = path.join(__dirname,'../partials')

//Setup handlebars engine
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(public))

app.get('',(req, res) =>
{
    res.render('index',{
        title: 'Weather App',
        name: 'Timmy Roma'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Timmy Roma'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help Page',
        name: 'Timmy Roma',
        message: 'Type any location, (city, zipcode, building name, etc...) and press search to get the forecast for that location'
    })
})


app.get('/weather', (req, res) => 
{
    if(!isProvided(req.query.address))
    {
        return res.send({
            error: 'You must provide an adress'
        })
    }
    geocode(req.query.address, (err, {latitude: lat, longitude: lon} = {}) =>
    {
        if(err)
        {
            return res.send({
                error: 'Error: ' + err
            })
        }
        else
        {
            forecast(lat, lon, (err, {temperature: temp, feelsLike: feel, name, overcast: over,humidity: hum} = {}) => 
            {
                if(err)
                {
                    return res.send({
                        error: 'Error: ' + err
                    })
                }
                else
                {
                    res.send({
                        temperature: temp,
                        feel: feel,
                        location: name,
                        overcast: over,
                        humidity: hum
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) =>{
    if(!isProvided(req.query.search))
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: req.query.search
    })
})

app.get('/help/*', (req, res) =>
{
    res.render('404',{
        title: 'Help Article Not Found!',
        name: 'Timmy Roma',
    })
})

app.get('*', (req, res) =>
{
    res.render('404',{
        title: '404 Page Not Found!',
        name: 'Timmy Roma',
    })
})

//Setting up our server on port 3000
app.listen(port, () =>
{
    console.log('Server is up on port: ' + port)
})