<<<<<<< HEAD
import './register.css'
import { useState } from 'react';

const Register = () => {
    const [name, setName] = useState("");
    const [surename, setSurename] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordRepeat, setPasswordRepeat] = useState("");
    
   const register = async (e) => {
       e.preventDefault()
       const res = await fetch("http://localhost:4000/user", {
           method: "POST",
           headers:{
               "Content-Type": "application/json",
           },
           body: JSON.stringify({name, surename, email, password, passwordRepeat}),
           
       });

       if (res.ok){
           alert("te has registrado correctamente");
       }else {
           console.log("error", res);
       }
   };

    return (
        <section>
            <h2>Crear nuevo usuario</h2>
            <form className='registerForm' onSubmit={register}>
            
                 
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre" value={name} onChange={(e)=>{setName(e.target.value)}}></input>

                <label>Apellidos:</label>
                <input type="text" placeholder="Apellidos" value={surename} onChange={(e)=>{setSurename(e.target.value)}}></input>

                <label>Correo electrónico:</label>
                <input type="email" placeholder="Correo electrónico" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>

                <label>Contraseña:</label>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>

                <label>Repite la contraseña:</label>
                <input type="password" placeholder="Misma contraseña" value={passwordRepeat} onChange={(e)=>{setPasswordRepeat(e.target.value)}}></input>

                <button className="registerbtn" type='submit'>REGISTRARSE</button>
                
            </form>
        </section>
    )
}

export default Register;
=======
import React, { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetcher';
import './register.css';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [error, setError] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    await fetcher(setNewUser, setError, 'user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    console.log('enviamos los datos al registro');
  };

  return (
    <form onSubmit={register} className="register-form">
      <div className="name-field">
        <label htmlFor="reg-name">Nombre:</label>
        <input
          type="text"
          id="reg-name"
          name="reg-name"
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
      </div>
      <div className="surname-field">
        <label htmlFor="surname-name">Apellidos:</label>
        <input
          type="text"
          id="reg-surname"
          name="reg-surname"
          onChange={(e) => {
            setNewUser({ ...newUser, surname: e.target.value });
          }}
        />
      </div>
      <div className="mail-field">
        <label htmlFor="reg-mail">Email:</label>
        <input
          type="text"
          id="reg-mail"
          name="reg-mail"
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
          }}
        />
      </div>
      <br />
      <div className="password-field">
        <label htmlFor="reg-password">Contraseña:</label>
        <input
          type="password"
          id="reg-password"
          name="reg-password"
          autoComplete="off"
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
          }}
        />
      </div>
      <div className="passwordR-field">
        <label htmlFor="reg-passwordR">Repetir Contraseña:</label>
        <input
          type="password"
          id="reg-passwordR"
          name="reg-passwordR"
          autoComplete="off"
          onChange={(e) => {
            setNewUser({ ...newUser, passwordRepeat: e.target.value });
          }}
        />
      </div>
      <br />
      <input type="submit" value="Login" className="btn-login" />
    </form>
  );
};

export default Register;
>>>>>>> 4d027e201c738f7ead30241cf25ce9a2ab861ae8
