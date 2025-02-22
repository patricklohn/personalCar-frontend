import {useEffect, useRef, useState} from 'react'
import "./Cars.css"
import {useParams, Link, useNavigate} from 'react-router-dom'
import personalCar from '../axios/config'
import useToast from '../hook/useToast'

const Cars = () => {
    const [cars, setCars] = useState(null);
    const isFetching = useRef(false);
    const {id} = useParams(); 
    const toast = useToast();

    const loadCar = async() =>{
        if(isFetching.current) return;

        try {
            isFetching.current = true
            const res = await personalCar.get(`carGet/${id}`);
            setCars(res.data);
        } catch (error) {
            console.log(error)
            toast("Erro ao retornar os dados do carro ahuarde 15 segundos para uma nova tentativa.", "error")
            setTimeout(() =>{
                isFetching.current = false;
                loadCar(); 
            },15000)
        }
    }

    useEffect(() => {
        loadCar();
    },[])

    if(!cars) return <div id="loading-screen"><div className="loading-spinner"></div></div>
  return (
    <div className="container-car">
        <h1>{cars.name}</h1>
        <div className="actions-container">
            <Link className='btn-secondary'>Editar</Link>
            <button className='btn-secondary'>Excluir</button>
        </div>
        <p>Orçamento: R${cars.budget}</p>
        <h3>Serviços contratados</h3>
        <div className="services-container">
            {cars.services.map((service)=>(
                <div className="service" key={service._id}>
                    <img src={service.image} alt={service.name}/>
                    <p>{service.name}</p>
                    <p>R$ {service.price}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cars
