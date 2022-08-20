window.navigator.geolocation.getCurrentPosition(async  succsess => {
    console.log(succsess);
    const lat = succsess.coords.latitude
    const long = succsess.coords.longitude
    const tbodyelement = document.querySelector(".tbody")
    const cityElement = document.querySelector(".city")

    let response = await fetch(`http://api.aladhan.com/v1/timings/calendar?latitude=${lat}&longitude=${long}&method=3&school=1month=${new Date().getMonth()}&year=${new Date().getFullYear()}`)
    response = await response.json()
    console.log(response.data.meta.timezone);

    let times = ["Fajr" , "Dhuhr" , "Asr" , "Maghrib" , "Isha"]

    cityElement.textContent = `${response.data.meta.timezone}`

    for (let data in response.data.timings) {   
        if(times.indexOf(data) !== -1){
        const trElement = document.createElement("tr")
        const nameElement = document.createElement("td")
        const newTimeElement = document.createElement("td")

        nameElement.textContent = data
        newTimeElement.textContent = response.data.timings[data]
        trElement.appendChild(nameElement)
        trElement.appendChild(newTimeElement)
        tbodyelement.appendChild(trElement)
        }
    }
    // console.log(response.data.timings);
}, error => {
    alert("Erorni chiqar")
})