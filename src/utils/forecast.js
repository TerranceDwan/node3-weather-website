const request = require('request')
const rp = require('request-promise')

const forecast = (x, y, callback) => {
  const url =
    'https://api.darksky.net/forecast/36fef629cd0afa107bf61002d1b0399e/' +
    x +
    ',' +
    y
  return rp({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const { currently } = body
      callback(
        undefined,
        body.daily.data[0].summary +
          ' It is currently <strong class="emphasize">' +
          currently.temperature +
          ' degrees</strong> outside.  There is a <strong class="emphasize">' +
          currently.precipProbability +
          '% chance of rain</strong>.  There is also a wind speed of about ' +
          body.currently.windSpeed +
          ' mph.'
      )
    }
  })
}

module.exports = forecast
