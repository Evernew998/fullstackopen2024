const Weather = ({ weatherObject }) => {
    console.log("displaying weather info")
    if (weatherObject === null) {
        return null
    }

    const { capitalCity, iconUrl, temperature, windSpeed } = weatherObject
    return (
        <div>
            <h2>Weather in {capitalCity}</h2>
            <p>temperature {temperature} Celcius</p>
            <img src={iconUrl}/>
            <p>wind {windSpeed} m/s</p>
        </div>
    )
}

export default Weather