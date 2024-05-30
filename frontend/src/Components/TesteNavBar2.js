import '../Styles/TesteNavBar2.css'
import { Component } from 'react';
import React from 'react';

import AddPerfil from '../Assets/add-user2.png';
import ImageProfile from '../Assets/user.png';
import { Link } from 'react-router-dom';


class TesteNavBar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }
  render() {
    return (
      <div className="TesteNavBar2">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"></link>

        <nav>
          <a id='logo'>
            PGG
            <br />
            Pequeno Grande Gestor
          </a>

          <a id='NomeEmpresa'>- Zetta -</a>

          <div>
            {/* pelo amor de Deus gente, nao se usa href em react... se usa Navigate('/path'), arrumem isso */}
            <ul id='navbar' className={this.state.clicked ? "#navbar active" : "#navbar"}>
              <li><a href="/PagInicial" className='active'>Home</a></li>
              <li><a href="/Produtos" className='active'>Produtos</a></li>
              <li><a href="/EscolhaCurvaABC" className='active'>Curva ABC</a></li>
              <li><a href="/PontoPedido" className='active'>Ponto de Pedido</a></li>
              <li><a href="Peps" className='active'>Peps</a></li>
              <li><a href="LoteEco" className='active'>Lote Econômico</a></li>

            </ul>
          </div>
          <div id="mobile" onClick={this.handleClick}>
            <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>
      </div>
    )
  }
}

export default TesteNavBar;