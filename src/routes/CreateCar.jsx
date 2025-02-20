import {useEffect,useState} from 'react'
import personalCar from '../axios/config'
import {useNavigate} from 'react-router-dom'

const CreateCar = () => {
  const [services, setServices] = useState([])

  const loadServices = async() =>{
    const res = await personalCar.get('/services');
    setServices(res.data)
  }

  useEffect(() => {
    loadServices();
  },[])


  return (
    <div className='form-page'>
      <h2>Crie sua próxima proxima personalização de carro.</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <form action="">
        <label>
          <span>Nome do Carro:</span>
          <input type="text" placeholder='Escreva o nome do carro...' required />
        </label>
        <label>
          <span>Marca do Carro:</span>
          <input type="text" placeholder='Escreva o nome da marca do carro...' required />
        </label>
        <label>
          <span>Descreva mais sobre o carro:</span>
          <textarea placeholder='Escreva mais sobre o carro...' required />
        </label>
        <label>
          <span>Modelo do carro:</span>
          <input type="text" placeholder='Escreva o modelo do carro...' required />
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Escreva o orçamento a ser inestido no carro...' required />
        </label>
        <label>
          <span>Coloque uma imagem do carro:</span>
          <input type="text" placeholder='Insira uma URL de uma imagem da internet...' required />
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          {services.length === 0 && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {services.length > 0 && services.map((service) =>(
            <div className="service" key={service.id}>
              <img src={service.image} alt={service.name}/>
              <p id='service-name'>{service.name}</p>
              <p id='service-price'>R$ {service.price}</p>
              <div className='checkbox-container'>
                <input type="checkbox" value={service.id}/>
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
