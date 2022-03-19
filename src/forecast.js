const request = require('request')
const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=58b86a6f2e5f207ab184b1017132c0b5&query=' + lattitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect', undefined)
        } else if(response.body.error){
            callback('address not found', undefined)
        }else{
            const result = response.body.current.weather_descriptions + ', It is currently ' + response.body.current.temperature + 'degrees celsius, but feels like ' + response.body.current.feelslike + ' degrees'
            callback(undefined, result) 
        }
    })
}

module.exports = forecast