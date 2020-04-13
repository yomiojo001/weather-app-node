const request = require("request");

const forecast = (latitude, longitude, callback) => {

    const options = {
        method: 'GET',
        url: `https://dark-sky.p.rapidapi.com/${latitude},${longitude}`,
        qs: {lang: 'en', units: 'auto'},
        headers: {
          'x-rapidapi-host': 'dark-sky.p.rapidapi.com',
          'x-rapidapi-key': '4875e72aefmsh036ade1b0294994p158f0cjsnf0f9902dad80'
        }
      };
  
      request(options, (error, response) =>{
        if(error){
          callback("Unable to connect to weather api!!!", undefined);
        }else{
          const body = JSON.parse(response.body);
          if(body.message){
            callback("Unable to fetch weather location!!!", undefined);
          }else{
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
          }
        }
      })
  
  }

  module.exports = forecast;