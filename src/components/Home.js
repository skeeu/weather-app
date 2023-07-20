import { useParams } from "react-router-dom";

export default function Home() {
    const { cityName } = useParams
    return <h1>City = {cityName}</h1>
}