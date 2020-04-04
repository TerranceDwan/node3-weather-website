const request = require('request')

const forecast = (x, y, callback) => {
  const url =
    'https://api.darksky.net/forecast/36fef629cd0afa107bf61002d1b0399e/' +
    x +
    ',' +
    y

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const { currently } = body
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently ' +
          currently.temperature +
          ' degrees outside.  There is a ' +
          currently.precipProbability +
          '% chance of rain.'
      )
    }
  })
}

module.exports = forecast
