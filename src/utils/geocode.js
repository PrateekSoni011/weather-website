const request = require('request');

const geoCode = (address , callback)=>{

    //before putting the address string to the url we will pass it to the encdeURIComponent Function
    // It return the encode string in which the special characters are encode so that URL will not Break 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHRhdGVla3NvbmkiLCJhIjoiY2tkNjczaWJ5MXA2dDJ0bnRyeXJxOGIyeiJ9.TwtaX-Ep0qQJnv5bADtjyw&limit=1';

    request({url, json: true}, (error , {body})=>{
        if(error){
            // We are passing back the error to the call back
            callback("Unable to Connect to network service", undefined);
        }else if (body.features.length === 0 ){
            callback("Unable to Find location try again with another Search term", undefined);            
        }else{
            const features = body.features[0];    
            callback(undefined, {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            })
            
            // console.log("Latitude => "+ features.center[1] + "  Longitude => "+features.center[0]);
        }

    });
   
}

module.exports = geoCode;