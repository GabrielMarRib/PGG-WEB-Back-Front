import React, { useState } from 'react'
import axios from 'axios';
function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [user,setUser] = useState(null);

  const handleLogin = async (e) =>{
      e.preventDefault();
      try{ //teste
            const response = await axios.post('http://localhost:4000/login',
            JSON.stringify({email,password}),
            {
              headers: {"Content-Type": "application/json"}
            }
          );
          console.log(response.data);
          setUser(response.data);
      }catch(erro){
      if(!erro?.response){ // if (erro?.response == false)
          setError("Erro ao acessar o servidor")
        }else if (erro?.response.status == 401){   //response.status == 401
          setError("Usuario ou senha inválidos")
        }
      }
  }

  const handleLogOut = () =>{
    setUser(null);
    setError('');
  }

  return ( 
    <div className='App'>
    <header className='App-header'>
    {user == null ? (
      <div>
        <h2>Login</h2>
        <form className='login-form'>
          <input type="email" 
                  name="email" 
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)} />

          <input type="password" 
                  name="password" 
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}/>

          <button type='submit'
                  onClick={(e) => handleLogin(e)}>Login
          </button>
        </form>
        <p>{error}</p>
      </div>
      ) : (
        <div>
          <h2>Olá, {user.name} </h2>
          <h2>seu email ai marmanjo, {user.email} </h2>
          <button onClick={() => handleLogOut()}>log out haha</button>
        </div>
      )}
      </header>  
    </div>
)
};

export default App