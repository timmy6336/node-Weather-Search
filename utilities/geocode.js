const request = require('request')

const geocode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGltbXk2MzM2IiwiYSI6ImNrbmU3aGpieDFmazQydm9vMjAycTZreTkifQ.OT1LV8ZN6gJp51uJhNG1GA'
    request({url, json: true }, (err, {body: res} = {}) =>
    {
        if(err)
        {
            callback('Unable to connect to location services!',undefined)
        }
        else if(res.features.length == 0)
        {
            callback('Invald Location', undefined)
        }
        else
        {
            const info = res.features[0]
            const data = 
            {
                latitude: info.center[1],
                longitude: info.center[0],
                name: info.place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode