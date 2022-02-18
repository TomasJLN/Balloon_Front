import { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetcher';
import './register.css';

const Register = () => {
  const initialForm = {
    
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };
  const [newUser, setNewUser] = useState(initialForm);
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errorsFormulario, setErrorsFormulario] = useState({});

  const register = async (e) => {
    e.preventDefault();
    await fetcher(setNewUser, setError, setLoading, 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
  };
  const handleChange = (e) => {
    const {name,value} = e.target;
    setNewUser({
        ...newUser,
        [name]: value,
    });
  
};
const handleBlur = (e) => {
    handleChange(e);
    setErrorsFormulario(validationsForm(newUser));

}
const handleSubmit = (e) => {
  e.preventDefault();
  setErrorsFormulario(validationsForm(newUser))
}
const validationsForm = (newUser) => {
  let errorsFormulario = {};

  if(!newUser.name.trim()){
     errorsFormulario.name = "Debes introducir un nombre"
     
  }
  if(!newUser.surname.trim()){
       errorsFormulario.surname = "Debes introducir tus apellidos"
    }
  if(!newUser.email.trim()){ 
          errorsFormulario.email = "Debes introducir tu email"
  }
  if(!newUser.password.trim()){

          errorsFormulario.password = "Debes introducir una contraseña"
   
  }
  if(!newUser.passwordRepeat.trim()){
   
          
      errorsFormulario.passwordRepeat = "Debes introducir de nuevo la contraseña"
   
  }

  if(newUser.password !== newUser.passwordRepeat )    {
      errorsFormulario.password = "Las contraseñas deben coinicidir"
  }

  return errorsFormulario;
}
  useEffect(() => {
    if (error) alert(error);
    console.log(error);
    return () => {
      setError(null);
    };
  }, [error]);

  return (
    <div>
      <h2 className='newUserCreate'>Crear nuevo usuario</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
      <div >
        <label htmlFor='name'>Nombre:</label>

        <input
         className='registerInputs'
         name='name'
          type="text"
          placeholder="Escribe tu nombre"
          onChange={handleChange}
          value={newUser.name}
          onBlur={handleBlur}
          required></input>
             {errorsFormulario.name && 
            <p className='errorValidation'>{errorsFormulario.name}</p>
           }
          </div>


          <div >
        <label htmlFor='surname'>Apellidos:</label>

        <input
         className='registerInputs'
         name='surname'
          type="text"
          placeholder="Escribe tus apellidos"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.surname}

          required></input>
           {errorsFormulario.surname && 
            <p className='errorValidation'>{errorsFormulario.surname}</p>
           }
         
          </div>



        <div>
        <label htmlFor='email'>Correo electrónico:</label>
        <input
         className='registerInputs'
         name='email'
          type="email"
          placeholder="Escribe tu correo electrónico"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.email}
          
          required></input>
          {errorsFormulario.email && 
            <p className='errorValidation'>{errorsFormulario.email}</p>
           }
        </div>

        
        
        <div>
        <label htmlFor='password'>Contraseña:</label>

        <input
         className='registerInputs'
          name='password'
          type="password"
          placeholder="Escribe una contraseña"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.password}
          required></input>
           {errorsFormulario.password && 
            <p className='errorValidation'>{errorsFormulario.password}</p>
           }
        </div>

        
        <div>
        <label htmlFor='passwordRepeat'>Repite la contraseña:</label>
        <input
        className='registerInputs'
        name='passwordRepeat'
          type="password"
          placeholder="Repite la contraseña"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.passwordRepeat}
        required></input>
           {errorsFormulario.passwordRepeat && 
            <p className='errorValidation'>{errorsFormulario.passwordRepeat}</p>
           }
        </div>
        

        <div>
          <label htmlFor='terminos'>
            <input type="checkbox" name="terminos" id="terminos"/>
            Acepto los términos y condiciones
            </label>
        </div>


        <div className='errMsn'>
          <p><b>Error:</b>Por favor, rellena el formulario correctamente.</p>
        </div>


        <button className="registerbtn" type="submit">
          REGISTRARSE
        </button>

        </form>

  </div>


  )
};

export default Register;
