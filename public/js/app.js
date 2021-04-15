const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const place = document.querySelector("#location")
const forecast = document.querySelector('#forecast')


weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault()

    const location = search.value
    
    place.textContent = 'Searching...'
    forecast.textContent = ''
    
    fetch('/weather?address=' + location).then((response) =>
    {
        response.json().then((data) =>{
            if(data.error)
            {
                //console.log(data.error)
                place.textContent = data.error
            }
            else
            {
                //console.log(data.location,data.temperature)
                place.textContent = "Forecast for " + data.location + ': ' + data.overcast 
                forecast.textContent = 'It is currently ' + data.temperature + ' degrees out but it feels like ' + data.feel + ' degrees. the humidity is ' + data.humidity + '%.'
            }
        })
    })
})