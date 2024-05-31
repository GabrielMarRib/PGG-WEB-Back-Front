import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../Styles/Components/Cabecalho.css";
import ImageProfile from "../Assets/Options.png";
import ImageAddUser from "../Assets/add-user.svg";

class Cabecalho extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <div className="Cabecalho">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"></link>
        <nav>
          <a id='logo'>
            PGG
            <br />
            Pequeno Grande Gestor
          </a>

          <a id='NomeEmpresa'>- Zetta -</a>

          <div>
            <ul id='navbar' className={this.state.clicked ? "#navbar active" : "#navbar"}>
              <li><Link to="/PagInicial" className='active'>Home</Link></li>
              <li><Link to="/Produtos" className='active'>Produtos</Link></li>
              <li><Link to="/EscolhaCurvaABC" className='active'>Curva ABC</Link></li>
              <li><Link to="/PontoPedido" className='active'>Ponto de Pedido</Link></li>
              <li><Link to="/Peps" className='active'>Peps</Link></li>
              <li><Link to="/LoteEco" className='active'>Lote Econômico</Link></li>
            </ul>
          </div>

          <div id="mobile" onClick={this.handleClick}>
            <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>
      </div>
    );
  }
}

export default Cabecalho;
