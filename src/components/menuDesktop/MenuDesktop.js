import React, { useState } from 'react'
import "./menuDesktop.css"
import { Link, useNavigate } from 'react-router-dom'
import { useGetCategories } from "../../hooks/useGetCategories";



const MenuDesktop = ({setShowNavBar}) =>  {

const [isActive, setIsActive] = useState(false);

const navigate = useNavigate();
const {categories } = useGetCategories();




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
            <li className="itemmenuescritorio" onClick={(e)=> setIsActive(!isActive)}>
			
					CATEGORIAS			
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
		<div className='menucategory'>

{isActive && (
	<div >
		{categories.map((category) => (
			<li
				className="itemmenucategory"
				key={category.id}
				category={category}
				onClick={() => {
					navigate(`/allFilter?category=${category.title}`);}}
	
			>
				{category.title}
			</li>
		))}
	</div>
)}
</div>
 </div>
  )
}

export default MenuDesktop;