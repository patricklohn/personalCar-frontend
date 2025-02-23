import {useEffect,useState} from 'react'
import personalCar from '../axios/config'
import {useNavigate, useParams} from 'react-router-dom'
import useToast from '../hook/useToast'
import './EditCar.css'

const EditCar = () => {
  const [services, setServices] = useState([])
  const [carData, setCarData] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    const loadServices = async() =>{
      const res = await personalCar.get('/services');
      setServices(res.data)
      
      getData();
    };
    const getData = async() =>{
      try {
        const res = await personalCar.get(`/carGet/${id}`);
        setCarData(res.data)
      } catch (error) {
        console.log(error)
        useToast(error.data.menssage, "error")
      }
    }

    loadServices();
  },[])

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filterService = services.filter((s)=> s._id === value);
    let servicesCar = carData.services;

    if(checked){
      servicesCar = [...servicesCar, filterService[0]];
    }else{
      servicesCar = servicesCar.filter((s)=> s._id !== value);
    }

    setCarData({...carData, services: servicesCar})

  }

  const updateCar = async(e) =>{
    e.preventDefault();

    try {

      const res = await personalCar.put(`/carGet/${id}`, carData);
      if(res.status === 200){
        navigate(`/`)
        useToast(res.data.menssage)
      }
      
    } catch (error) {
      console.log(error)
      useToast(error.response.data.message, "error")
    }
  }

  if(!carData) return <div id="loading-screen"><div className="loading-spinner"></div></div>

  return (
    <div>
      <div className='form-page'>
      <h2>Editando: {carData.name}</h2>
      <p>Ajuste as opçoes de personalização do carro.</p>
      <form onSubmit={(e) => updateCar(e)}>
        <label>
          <span>Nome do Carro:</span>
          <input type="text" placeholder='Escreva o nome do carro...' required onChange={(e)=> setCarData({...carData, name: e.target.value})} value={carData.name}/>
        </label>
        <label>
          <span>Marca do Carro:</span>
          <input type="text" placeholder='Escreva o nome da marca do carro...' required onChange={(e)=> setCarData({...carData, brand: e.target.value})} value={carData.brand}/>
        </label>
        <label>
          <span>Descreva mais sobre o carro:</span>
          <textarea placeholder='Escreva mais sobre o carro...' required onChange={(e)=> setCarData({...carData, description: e.target.value})} value={carData.description}/>
        </label>
        <label>
          <span>Modelo do carro:</span>
          <input type="text" placeholder='Escreva o modelo do carro...' required onChange={(e)=> setCarData({...carData, model:e.target.value})} value={carData.model}/>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Escreva o orçamento a ser inestido no carro...' required onChange={(e)=> setCarData({...carData,budget:e.target.value})} value={carData.budget}/>
        </label>
        <label>
          <span>Coloque uma imagem do carro:</span>
          <input type="text" placeholder='Insira uma URL de uma imagem da internet...' required onChange={(e)=> setCarData({...carData,image:e.target.value})} value={carData.image}/>
        </label>
        <h2 id='title-service'>Escolha os serviços</h2>
        <div className='services-container'>
          {services.length === 0 && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {services.length > 0 && 
          services.map((service) => (
            <div className="service" key={service._id}>
              <img src={service.image} alt={service.name} />
              <p className="service-name">{service.name}</p>
              <p className="service-price">R${service.price}</p>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  value={service._id}
                  onChange={(e) => handleServices(e)}
                  checked={carData.services.find((carService) => carService._id === service._id) || ""
                  }
                />
                <p>Marque para solicitar</p>
              </div>
            </div>
          ))}
        </div>
        <input type="submit" value="Editar personalização" className='btn'/>
      </form>
    </div>
    </div>
  )}

export default EditCar
