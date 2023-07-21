import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosThunderstorm } from 'react-icons/io'
import { BsFillCloudRainFill } from 'react-icons/bs'

export default function Home() {
    const { cityName } = useParams()
    const [weather, setWeather] = useState({ temp: undefined, feels_like: undefined, wind_speed: undefined })

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
        console.log(weather);
        setWeather({
            temp: weather.main.temp, 
            feels_like: weather.main.feels_like,
            wind_speed: weather.wind.speed})
    }
    
    useEffect(() => {
        getWeather(cityName)
    }, [])

    // const codeOfWeather = 2
    // const icons = {
    //     2: <IoIosThunderstorm />,
    //     5: <BsFillCloudRainFill/>
    // }
    return (
        <div>
            {/* {icons[codeOfWeather]} */}
            {cityName}
            {weather.temp !== undefined ? <div>
                <h1>{weather.temp} temp</h1>
                <h1>{weather.feels_like} feels like</h1>
                <h1>{weather.wind_speed} wind speed</h1>
            </div> : ''}
        </div>
    )
}