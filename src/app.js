const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const geocode = require('./geocode')
const forecast = require('./forecast')
const request = require('request')
const port = process.env.PORT || 3000


const directory = path.join(__dirname, '../utils')
const directoryHbs = path.join(__dirname, '../template/views')
const partialsDir = path.join(__dirname, '../template/partials')


app.use(express.static(directory))
app.set('view engine', 'hbs')
app.set('views', directoryHbs)
hbs.registerPartials(partialsDir)

app.get('', (req, res) => {
    res.render('index', {
        name: 'Adewale',
        title: 'Home Page'
    })
})
app.get('/weather', (req, res) => {
   if(!req.query.address){
       return res.send({error: 'You must provide an address'})
   }
   geocode(req.query.address, (error, {lattitude, longitude, place} = {}) =>{
       if(error){
           return res.send({error})
       }
       forecast(lattitude, longitude, (error, forecastData) =>{
           if(error){
               return res.send({error})
           }
           res.send({
               forecast: forecastData,
               place,
               address: req.query.address
           })
       })
   } )
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Adewale',
        title: 'About Page'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Adewale',
        title: 'Help Page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Adewale',
        errorMessage: 'help page not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        name: 'Adewale',
        title: '404',
        errorMessage: 'sorry, no match'
    })
})

app.listen(port, () => {
    console.log('listening on port' + port + '...')
})
