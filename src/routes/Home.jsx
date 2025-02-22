import {useState, useEffect, useRef} from 'react'
import personalCar from '../axios/config'
import "./Home.css" 
import { Link } from 'react-router-dom'
import useToast from '../hook/useToast'

const Home = () => {
  const [car, setCar] = useState(null);
  const isFetching = useRef(false);

  const loadCar = async() =>{
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const res = await personalCar.get('/carGet');
      setCar(res.data)
    } catch (error) {
    console.log(error)
    useToast("Erro ao comunicar com a API favor aguardar 15 segundos para um nova comunicação.", "error")
    setTimeout(() => {
      isFetching.current = false;
      loadCar();
    }, 15000);
  }
}

  useEffect(() => {
    loadCar();
  },[])

  if(!car) return <div id="loading-screen"><div className="loading-spinner"></div></div>

  return (
    <div className='home'>
      <h1>Seus carros em personalização</h1>
      <div className="cars-container">
        {car.length === 0 && <p>Não há carros cadastradas!</p>}
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
