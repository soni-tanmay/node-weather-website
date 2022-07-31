import requst from 'postman-request';

export function geocode (address, callback){
    const url = 'http://api.positionstack.com/v1/forward?access_key=36757f8fdcfdaa1d18362470a430a568&query='+ encodeURIComponent(address)
 
    requst({url, json: true}, (error, {body}={}) => {
       if(error){
          callback('unable to connect to location service.')
       }else if(body.error){
          callback('unable to find location. Try another search.')
       }else{
          callback(undefined,{
             latitude: body.data[0].latitude,
             longitude: body.data[0].longitude,
             location: body.data[0].name
          })
       }
    })
 }