import React, { useState } from "react";
import "./menuDesktop.css";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategories } from "../../hooks/useGetCategories";

<<<<<<< HEAD
const MenuDesktop = ({ setShowNavBar }) => {
	const [isActive, setIsActive] = useState(false);

	const navigate = useNavigate();
	const { categories } = useGetCategories();

	return (
		<div className="menuescritorio">
			<menu className="menunavegacionDesktop">
				<li className="itemmenuescritorio">
					<Link to="/">INICIO</Link>
				</li>
				<li className="itemmenuescritorio">
					<Link to="/account">MI CUENTA</Link>
				</li>
				<div
					onMouseOver={(e) => setIsActive(true)}
					onMouseLeave={(e) => setIsActive(false)}
					className="both"
					style={{ display: "flex", flexDirection: "column-reverse" }}
				>
					<li className="itemmenuescritorio">CATEGORIAS</li>

					{isActive && (
						<div className="drop-cat">
							{categories.map((category) => (
								<li
									className="itemmenucategory"
									key={category.id}
									category={category}
									onClick={() => {
										navigate(`/allFilter?category=${category.title}`);
									}}
								>
									{category.title}
								</li>
							))}
						</div>
					)}
				</div>
				<li className="itemmenuescritorio">
					<Link to="/contact-form">CONTACTO</Link>
				</li>
				<li className="itemmenuescritorio">
					<Link to="/faq">FAQ</Link>
				</li>
			</menu>
			<div className="menucategory"></div>
		</div>
	);
};

export default MenuDesktop;
=======


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
	<div className='contenenedormenucategory'>
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
>>>>>>> 56981be6f75a76ad9adadf95e40d23b8ff6e9ae0
