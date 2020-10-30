const request=require('postman-request')
const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNtaXRoYSIsImEiOiJja2cwZThmY3cwY2JzMzRsYmU1dTV2bzA4In0.Iav9XLFXQHs8JG1puU__TQ"
    request({url,json:true},((error,{body})=>{
        if(error){
           callback("Unable to connect to the server",undefined)
        }
        else if(body.features==0){
           callback("something went wrong",undefined)
        }
        else{
           callback(undefined,{latitude:body.features[0].center[1],longitude:body.features[0].center[0],location:body.features[0].place_name})
       }
       }))
}

module.exports=geocode