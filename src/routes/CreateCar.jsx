import {useEffect,useState} from 'react'
import personalCar from '../axios/config'
import {useNavigate} from 'react-router-dom'
import useToast from '../hook/useToast'
import './CreateCar.css'


const CreateCar = () => {
  const [services, setServices] = useState([])
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState("");
  const [serviceCar, setServiceCar] = useState([]);

  const navigate = useNavigate();

  const loadServices = async() =>{
    const res = await personalCar.get('/services');
    setServices(res.data)
  }

  const personalCars = async(e) =>{
    e.preventDefault();

  try {
    const car = {
      name,
      brand,
      description,
      model,
      budget: Number(budget),
      image,
      services: serviceCar,
    }

    const res = await personalCar.post("/carCreate", car);

    if(res.status === 201){
      navigate('/');
      useToast(res.data.menssage)
    }
  } catch (error) {
    console.log(error)
    useToast(error.response.data.menssage, "error")
  }

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

  useEffect(() => {
    loadServices();
  },[])



  return (
    <div className='form-page'>
      <h2>Crie sua próxima proxima personalização de carro.</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <form onSubmit={(e)=> personalCars(e)}>
        <label>
          <span>Nome do Carro:</span>
          <input type="text" placeholder='Escreva o nome do carro...' required onChange={(e)=> setName(e.target.value)} value={name}/>
        </label>
        <label>
          <span>Marca do Carro:</span>
          <input type="text" placeholder='Escreva o nome da marca do carro...' required onChange={(e)=> setBrand(e.target.value)} value={brand}/>
        </label>
        <label>
          <span>Descreva mais sobre o carro:</span>
          <textarea placeholder='Escreva mais sobre o carro...' required onChange={(e)=> setDescription(e.target.value)} value={description}/>
        </label>
        <label>
          <span>Modelo do carro:</span>
          <input type="text" placeholder='Escreva o modelo do carro...' required onChange={(e)=> setModel(e.target.value)} value={model}/>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Escreva o orçamento a ser inestido no carro...' required onChange={(e)=> setBudget(e.target.value)} value={budget}/>
        </label>
        <label>
          <span>Coloque uma imagem do carro:</span>
          <input type="text" placeholder='Insira uma URL de uma imagem da internet...' required onChange={(e)=> setImage(e.target.value)} value={image}/>
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
  )
}

export default CreateCar
