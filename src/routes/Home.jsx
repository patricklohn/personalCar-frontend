import {useState, useEffect} from 'react'
import personalCar from '../axios/config'
import "./Home.css" 
import { Link } from 'react-router-dom'

const Home = () => {
  const [car, setCar] = useState(null);

  useEffect(() => {
    const loadCar = async() =>{
      const res = await personalCar.get('/carGet');
      console.log(res)
      setCar(res.data)
      console.log(car)
    }
  
    loadCar();
  },[])

  if(!car) return <div id="loading-screen"><div className="loading-spinner"></div></div>

  return (
    <div className='home'>
      <h1>Seus carros em personalização</h1>
      <div className="cars-container">
        {car.length === 0 && <p>Não há festas cadastradas!</p>}
        {car.map((cars)=>(
          <div className="car" key={cars._id}>
            <img src={cars.image} alt={cars.name} />
            <h3>{cars.name}</h3>
            <Link className='btn-secondary' to={`/car/${cars._id}`}>Detalhes</Link> 
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
