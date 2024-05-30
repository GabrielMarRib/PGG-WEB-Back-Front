import React, { Component, useContext, useState } from 'react';
import '../Styles/TesteNavBar.css';
import AddPerfil from '../Assets/add-user2.png';
import ImageProfile from '../Assets/user.png';
import { UserContext } from "../Context/UserContext.js";
import { Link } from 'react-router-dom';

const TesteNavBar = () => {

  const UserOBJ = useContext(UserContext);
  const User = UserOBJ.User;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleNomeUltimoNome = () =>{
    if(User && User.userData && User.userData.Nome){
      const primeiroNome = User.userData.Nome.split(' ')[0]
      const len = User.userData.Nome.split(' ').length;
      const ultimoNome = User.userData.Nome.split(' ')[len-1]
      return primeiroNome + " " + ultimoNome;
    }
  }

  return (
    <div className="TesteNavBar">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"></link>

      <nav>
        <a id='logo'>
          PGG
          <br />
          Pequeno Grande Gestor
        </a>

        <a id='NomeEmpresa'>- Zetta - </a>

        <div>
          <ul id='navbar' className={clicked ? "#navbar active" : "#navbar"}>
            <li><a href="">Olá, {handleNomeUltimoNome()}</a></li>
          </ul>
          <br />
          <div id='FigurasAlado'>
            <Link to="/PagPerfil">
              <div className='ImageProfile' >
                <img src={ImageProfile} alt="Userimg" />
              </div>
            </Link>
            <Link to="/PagAddFunc">
              <div className='AddPerfil'>
                <img src={AddPerfil} alt="AddUserimg" />
              </div>
            </Link>
          </div>
        </div>
        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </div>
  );
};

export default TesteNavBar;
