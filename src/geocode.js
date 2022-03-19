const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoidGFsYWRleCIsImEiOiJja3N1ZTR0b3MwN21yMnBsZ2ExcTRnMWt1In0.qtI4-60XoXO16CjMRWhYeQ&limit=1'
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('unable to connect', undefined)
        } else if(response.body.features.length === 0){
            callback('search not found', undefined)
        } else{
            callback(undefined, {
                place: response.body.features[0].place_name,
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }
    })
 }

 module.exports = geocode



