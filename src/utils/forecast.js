const request = require('request');

const forecast = (longitude , latitude , callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=7e9d5c570a4faf3da3de5fd4f1918702&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m';    
    request({url, json: true},(error, {body})=>{            

        if(error){
            callback('Unable to Connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find Location', undefined)
        }else{            
            const currentData = body.current;
            const outputData = currentData.weather_descriptions[0] + ". It is currently " +currentData.feelslike + " degree out.It Feels like " + currentData.temperature + " degree out.";
            callback(undefined, outputData);
        }
    })  
}


module.exports = forecast;