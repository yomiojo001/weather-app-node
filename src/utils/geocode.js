const request = require('request');




const geocode = (address, callback) => {

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieW9taW9qbzAwMSIsImEiOiJjazhvd3lwZnYwMWFrM2RtaHNhemx5d3pmIn0.cGsqF0O3jmltiwQO9FN7Kw&limit=1`;

        request({ url, json:true }, (error, response) => {
                if(error){
                callback("Unable to connect to location services!", undefined)
                }else{
                const body = response.body;
                if(body.message){
                callback("You did not enter a search term!! Enter a seach term!",undefined);
                }else if (body.features.length === 0 ){
                callback("Unable to find location!! Try again with different seach term!", undefined);
                }else{
                const data = body.features[0];
                callback(undefined, {
                        latitude: data.center[1],
                        longitude: data.center[0],
                        location: data.place_name
                })
                }
                }
                }) 
}


module.exports = geocode;
