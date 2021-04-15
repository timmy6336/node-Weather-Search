const request = require('request')

const forecast = (lat, lon, callback) =>
{
    const url = 'http://api.weatherstack.com/current?access_key=970747fe3b95af2ffd0c8233b3f1bd79&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '&units=f'
    request({url, json: true }, (err,{body:res} = {}) =>
    {
        if(err)
        {
            callback('Unable to connect to weather services!',undefined)
        }
        else if(res.error)
        {
            callback('Latittude or Longitude missing or invalid!', undefined)
        }
        else
        {
            const info = res.current
            const data = 
            {
                temperature: info.temperature,
                feelsLike: info.feelslike,
                overcast: info.weather_descriptions,
                humidity: info.humidity,
                name: res.location.name
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast