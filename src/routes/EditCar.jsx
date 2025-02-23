import {useEffect,useState} from 'react'
import personalCar from '../axios/config'
import {useNavigate, useParams} from 'react-router-dom'
import useToast from '../hook/useToast'
import './EditCar.css'

const EditCar = () => {
  const [services, setServices] = useState([])
  const [serviceCar, setServiceCar] = useState([]);
  const [carData, setCarData] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();


  const getData = async() =>{
    try {
      const res = await personalCar.get(`/carGet/${id}`);
      setCarData(res.data)
    } catch (error) {
      console.log(error)
      useToast(error.data.menssage, "error")
    }
  }

  const loadServices = async() =>{
    const res = await personalCar.get('/services');
    setServices(res.data)
    
    getData();
  }

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filterService = services.filter((s)=> s._id === value);

    if(checked){
      setServiceCar((serviceCar) => [...serviceCar, filterService[0]]);
    }else{
      setServiceCar((serviceCar) => serviceCar.filter((s)=> s._id !== value));
    }
  }

  const updateCar = async(e) =>{
    e.preventDefault();
    console.log(carData)
  }

  useEffect(()=>{
    loadServices();
  },[])

  if(!carData) return <div id="loading-screen"><div className="loading-spinner"></div></div>

  return (
    <div>
      <div className='form-page'>
      <h2>Editando: {carData.name}</h2>
      <p>Ajuste as opçoes de personalização do carro.</p>
      <form onClick={(e) => updateCar(e)}>
        <label>
          <span>Nome do Carro:</span>
          <input type="text" placeholder='Escreva o nome do carro...' required onChange={(e)=> setName(e.target.value)} value={carData.name}/>
        </label>
        <label>
          <span>Marca do Carro:</span>
          <input type="text" placeholder='Escreva o nome da marca do carro...' required onChange={(e)=> setBrand(e.target.value)} value={carData.brand}/>
        </label>
        <label>
          <span>Descreva mais sobre o carro:</span>
          <textarea placeholder='Escreva mais sobre o carro...' required onChange={(e)=> setDescription(e.target.value)} value={carData.description}/>
        </label>
        <label>
          <span>Modelo do carro:</span>
          <input type="text" placeholder='Escreva o modelo do carro...' required onChange={(e)=> setModel(e.target.value)} value={carData.model}/>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Escreva o orçamento a ser inestido no carro...' required onChange={(e)=> setBudget(e.target.value)} value={carData.budget}/>
        </label>
        <label>
          <span>Coloque uma imagem do carro:</span>
          <input type="text" placeholder='Insira uma URL de uma imagem da internet...' required onChange={(e)=> setImage(e.target.value)} value={carData.image}/>
        </label>
        <h2 id='title-service'>Escolha os serviços</h2>
        <div className='services-container'>
          {services.length === 0 && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {services.length > 0 && services.map((service) =>(
            <div className="service" key={service._id}>
              <img src={service.image} alt={service.name}/>
              <p id='service-name'>{service.name}</p>
              <p id='service-price'>R$ {service.price}</p>
              <div className='checkbox-container'>
                <input type="checkbox" value={service._id} onChange={(e) => handleServices(e)}/>
                <p>Marque para selecionar</p>
              </div>
            </div>
          ))}
        </div>
        <input type="submit" value="Solicitar personalização" className='btn'/>
      </form>
    </div>
    </div>
  )}

export default EditCar
