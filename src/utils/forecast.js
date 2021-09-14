const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=48dd3f3b4eebb0aee882a90bda2b1d22&query=' + latitude + ',' + longitude;
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!!',undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chances of rain.')
        }
    })
}

module.exports = forecast;