import React from 'react'
import "./menuDesktop.css"
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from '../dropDown/DropDown'

const MenuDesktop = () =>  {

const navigate = useNavigate();



  return (
      
 <div className="menuescritorio">

     
<menu  className='menunavegacionDesktop'>
    
			<li className="itemmenuescritorio">
				<Link to="/" >
					INICIO
				</Link>
			</li>
			<li className="itemmenuescritorio">
				<Link to="/account" >
					MI CUENTA
				</Link>
			</li>
            <li className="itemmenuescritorio">
				<Link to="/contact-form" >
					CATEGORIAS
				</Link>
			</li>
			<li className="itemmenuescritorio">
				<Link to="/contact-form" >
					CONTACTO
				</Link>
			</li>
			<li className="itemmenuescritorio">
				<Link to="/faq" >
					FAQ
				</Link>
			</li>
		</menu>
 </div>
  )
}

export default MenuDesktop;