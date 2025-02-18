import axios from 'axios'

const personalCar = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
        "Content-Type": "application/json",
    }
});

export default personalCar;