import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Search() {
    const navigate = useNavigate()
    const [cityName, setCityName] = useState('')

    const onClick = () => {
        navigate(`/${cityName}`)
    }

    const handleChange = e => {
        setCityName(e.target.value)
    }

    return (
        <div>
            <input type='text' value={cityName} onChange={handleChange} />
            <button onClick={onClick}>Find</button>
        </div>
    )
}