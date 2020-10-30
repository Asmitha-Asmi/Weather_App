const request=require('postman-request')
const weatherRequest=(latitude,longitude,callback)=>{
const url="http://api.weatherstack.com/current?access_key=dd072a65dc2f9797ba3e192c81c91a80&query="+latitude+","+longitude+"&units=f";
request({url,json:true},((error,{body})=>{
if(error){
    callback("Unable to connect to the server",undefined)
}
else if(body.error){
    callback("something went wrong",undefined)
}
else{
callback(undefined,"the temperature is "+body.current.temperature+" but it feels like "+body.current.feelslike)
}
})
)
}

module.exports=weatherRequest