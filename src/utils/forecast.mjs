import requst from 'postman-request';

export function forecast (lat, long, callback){
    const url = 'http://api.weatherstack.com/current?access_key=b31a3aec709f3ef1549d9b85e583c29a&query=' + lat + ',' + long + '&units=f'
 
    requst({url, json: true}, (error, {body}={}) => {
       if(error){
          callback('unable to connect to weather service.')
       }else if( body.error){
          callback('unable to find location.')
       }else{
          callback(undefined, body.current.weather_descriptions[0] + ', It is currently ' +  body.current.temperature + ' degrees out. The humidity is ' + body.current.humidity + '%.')
       }
    })
 }