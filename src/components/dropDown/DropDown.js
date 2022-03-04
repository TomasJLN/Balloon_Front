import { useState, useEffect } from "react";
import {FaArrowDown} from 'react-icons/fa'
import { useGetCategories } from "../../hooks/useGetCategories";
import { Link, Navigate } from "react-router-dom";
import './dropDown.css';
 
 
 
const Dropdown = () =>{
   const [isActive, setisActive] = useState(false);
 


const {categories} = useGetCategories();
 
 
   return (
       <ul className="dropdown">
           <li className="dropdown-btn" onClick={(e) => setisActive(!isActive)}>CATEGORIAS <FaArrowDown className="arrowdown"/></li>
       
               { isActive && (    
               <div className="dropdown-content">
                    {categories.map((category)=>(<li className="dropdown-item" key={category.id} category={category}>
                      {category.title}
                       </li>))}
            
               </div>
               )}
          
        
       </ul>
   )
}
 
export default Dropdown;
