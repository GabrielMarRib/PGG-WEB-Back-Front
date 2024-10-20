import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';  
import Cabecalho from "../../../Components/CabecalhoHome.js";
import { UserContext } from "../../../Context/UserContext"; 


function PagEscolhaPontoDePedido() {
    const navigate = useNavigate();
    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....

    return (
        <div className="PagEscolhaProdutos">
            <div>
                <Cabecalho/>
            </div>

            <div className="conteudoPaginaMaster">
                <div className="ag-format-container">
                    <h1>Escolha a ação que você deseja realizar</h1>
                    <div className="ag-courses_box">
                        <div className="ag-courses_item">
                            <a onClick={() => { navigate("/PagPontoPedido") }} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">Ponto de Pedido</div>
                            </a>
                        </div>
                       
                        <div className="ag-courses_item">
                            <a onClick={() => { navigate("/PagPesquisaFornecedor") }} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">Pesquisa Produtos</div>
                            </a>
                        </div>

                        <div className="ag-courses_item">
                            <a onClick={() => { navigate("/PagCadFornecedor") }} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">Cadastrar Fornecedores</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagEscolhaPontoDePedido;

