import { useState } from 'react';
import './footer.css';

const Footer = () => {
  const [input, setInput] = useState('');
  const [checkbox, setCheckbox] = useState(false);


  //Expresión regular para correo.
  
  const email = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };

  //Función que crea una nueva newsletter.

  const createNewsletter = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/newsletter", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });

    console.log(res);

  if(res.ok){
    alert("Gracias por unirte a nuestras newsletter");
  }else{
    alert("Hubo un error al crear la newsletter. Inténtelo de nuevo");
  }
};

//Función que elimina una newsletter

const deleteNewsletter = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:4000/newsletter", {
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email}),
  });

if(res.ok){
  alert("El correo asociado a la newsletter se eliminó");
}else{
  alert("Hubo un error al eliminar la newsletter. Inténtelo de nuevo");
}
};

  return (
    <footer className="footer">
      <section className="newsletter">
        <form className="sendEmail" onSubmit={createNewsletter}>
          
          <h2>NEWSLETTER</h2>
          
          <input
            type="text"
            id="email"
            name="email"
            regularPhrase={email.email}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="example@gmail.com"
            error="El email debe contener un símbolo '@' y la terminación '.com'"
          ></input>
         
          <button className="enviar" type="submit">Enviar
          </button>
        </form>
        <form className="condition" onSubmit={createNewsletter}>
          <input
            type="checkbox"
            id="politica"
            name="politica"
            value={checkbox}
            onChange={(e) => {
              setCheckbox(e.target.checked);
            }} 
            error="Debes aceptar los términos y condiciones marcando la casilla de validación"
          ></input>
            
            <label htmlFor="politica">
            He leído y acepto la política de privacidad
          </label>
        </form>
     
     </section>

      <section className="links">
        <ul>
          <li>
            <a href="" target="blank">
              Condiciones de Uso
            </a>
          </li>
          <li>
            <a href="" target="blank">
              Política de privacidad
            </a>
          </li>
          <li>
            <a href="" target="blank">
              Contacto
            </a>
          </li>
          <li>
            <a href="" target="blank">
              FAQ
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
