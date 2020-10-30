
console.log('hi manda')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc= search.value
message1.textContent='Loading...'
    fetch('http://localhost:3000/weather?address='+loc).then(res=>{
        res.json().then(resp=>{
            if(resp.error){
                message1.textContent=resp.error
                console.error(resp.error)
            }
            else{
                message1.textContent=resp.forecast;
                message2.textContent=resp.location
            console.log(resp)
            }
        })
        
        })

})