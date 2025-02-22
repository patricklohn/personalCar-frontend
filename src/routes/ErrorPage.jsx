import React from 'react'
import { Link } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {

  return (
    <div>
      <div className="error-container">
        <div className='error'>
          <h1>Ocorreu um erro não esperado ⚠️</h1>
          <p>Favor voltar para a tela inicial.</p>
          <Link to="/" className='btn-secondary'>Tela inicial</Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
