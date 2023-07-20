import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Search() {
    const navigate = useNavigate()
    const [cityName, setCityName] = useState('')
    const [weather, setWeather] = useState({ temp: undefined, feels_like: undefined, wind_spee: undefined })

    const url = process.env.REACT_APP_API_URL
    const apiKey = process.env.REACT_APP_API_KEY

    const getCoordinates = async (cityName) => {
        const req = await fetch(`${url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`)
        const response = await req.json()
        const data = response[0]
        return {
            lat: data?.lat,
            lon: data?.lon
        }
    }

    const fetchWeather = async (lat, lon) => {
        if (lat !== undefined && lon !== undefined) {
            const req = await fetch(`${url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            const response = await req.json()
            return response
        }
        return {}
    }

    const getWeather = async (cityName) => {
        const coordinates = await getCoordinates(cityName)
        const weather = await fetchWeather(coordinates.lat, coordinates.lon)
        return weather
    }

    // useEffect(() => {
    //     setTimeout(async () => {
    //         const weather = await getWeather('Astana')
    //         console.log(weather);
    //         setWeather({ temp: weather?.main?.temp, feels_like: weather?.main?.feels_like, wind_spee: weather?.wind?.speed })
    //     }, 5000)
    // }, [])
    const onClick = () => {
        console.log(cityName)
        navigate(`/${cityName}`)
    }

    const handleChange = e => {
        setCityName(e.target.value)
    }

    return (
        <div>
            <div>
                <input type='text'value={cityName} onChange={handleChange} />
                <button onClick={onClick}>Find</button>
                <div>
                    {weather.temp !== undefined ? <div>
                        <h1>{weather.temp} temp</h1>
                        <h1>{weather.feels_like} feels like</h1>
                        <h1>{weather.wind_spee} wind speed</h1>
                    </div> : ''}
                </div>
            </div>
        </div>
    )
}