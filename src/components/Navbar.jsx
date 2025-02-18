import React from 'react'
import {NavLink} from 'react-router-dom'

const NavBAR = () => {
  return (
    <div>
      <nav id="navbar">
        <h2>Personal Car</h2>
        <ul>
            <li>
                <NavLink to="/">Meus Carros</NavLink>
            </li>
            <li>
                <NavLink to="/car/new" className="btn">Personalizar o seu carro</NavLink>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBAR
