const path=require('path')
const express = require('express')
const hbs= require('hbs')
const geoCode=require('./utils/geoCode')
const weatherRequest=require('./utils/weatherRequest')

const app=express()
const directoryPath=path.join(__dirname,'../public')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

app.use(express.static(directoryPath))
hbs.registerPartials(partialsPath)
// app.get('',(req,res)=>{
//     res.render('index')

// })
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name: 'Andrew Mead',
        message:'Help article not found'
    })

})
app.get('/about',(req,res)=>{
    res.send('<h1>About page</h1>')

})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return  res.send({
            error:'Please enter a Address'})

    }
    
    // res.send({
    //     location:req.query.address,
    //     weather:'50'
    // })
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
         return  res.send({error})
        }else{
            weatherRequest(latitude,longitude,(error,forecastData)=>{
        
            if (error){
                return  res.send({error})
        
            }else{
                res.send({
                    address:req.query.address,
                    forecast:forecastData,
                    location
                })
                    console.log(forecastData)
            }
                })
            
          
        }
       
            console.log(latitude,longitude)
        })

})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'help',
        message:'Help article not found',
        name:'Asmi'
    })

})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'help',
        message:'Page not found',
        name:'Asmi'
    })

})
app.listen('3000',()=>{

    console.log('hi')
})