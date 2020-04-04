const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Terrance Lewis'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Terrance Lewis'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Terrance Lewis',
    info: "Any questions you may have, just shove 'em"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('Error: Address Required')
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        return res.send({
          address: req.query.address,
          location,
          forecast: forecastData
        })
      })
    }
  )
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Woops...',
    message: 'This help page does not exist'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Woops...',
    message: 'No page exists at this extension'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
