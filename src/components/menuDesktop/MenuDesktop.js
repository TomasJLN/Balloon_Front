import React from 'react'
import "./menuDesktop.css"
import { Link } from 'react-router-dom'
import Dropdown from '../dropDown/DropDown'

const MenuDesktop = () => {
  return (
      
 <div>

     
<menu  className="menuescritorio">
    
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