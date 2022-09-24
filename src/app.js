const express = require('express');
const hbs = require('hbs');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'Ziad Honsy' });
});

// const address = process.argv[2];
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address!',
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    const { latitude, longitude, location } = data;

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Ziad Hosny' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help ',
    name: 'Ziad Hosny',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ziad Hosny',
    errorMessage: 'Help article Not Found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ziad Hosny',
    errorMessage: 'Page Not Found.',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
