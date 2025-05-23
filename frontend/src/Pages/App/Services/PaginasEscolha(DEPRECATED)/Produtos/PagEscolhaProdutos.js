import { useNavigate } from 'react-router-dom';
import Cabecalho from "../../../../../Components/Cabecalho/CabecalhoHome.js";
import "./PagEscolhaProdutos.css";
import { useContext } from "react";
import { UserContext } from "../../../../../Context/UserContext.js";



function PagEscolhaProdutos() {
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
                            <a onClick={() => { navigate("/PagProdutos") }} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">Gerir Produtos</div>
                            </a>
                        </div>
                       
                        <div className="ag-courses_item">
                            <a onClick={() => { navigate("/PagVenderProduto") }} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">Baixa produto</div>
                            </a>
                        </div>
                        
                        {User && User.userData && User.userData.Nivel_acesso && User.userData.Nivel_acesso == 2 ? (
                        <>
                            <div className="ag-courses_item">
                                <a onClick={() => { navigate("/PagGerirCategoria") }} className="ag-courses-item_link">
                                    <div className="ag-courses-item_bg"></div>
                                    <div className="ag-courses-item_title">Gerir Categorias</div>
                                </a>
                            </div>
                            
                            <div className="ag-courses_item">
                                <a onClick={() => { navigate("/PagGerirLotes") }} className="ag-courses-item_link">
                                    <div className="ag-courses-item_bg"></div>
                                    <div className="ag-courses-item_title">Gerir Lotes</div>
                                </a>
                            </div>
                            <div className="ag-courses_item">
                                <a onClick={() => { navigate("/PagMovimentos") }} className="ag-courses-item_link">
                                    <div className="ag-courses-item_bg"></div>
                                    <div className="ag-courses-item_title">Mostrar Movimentos</div>
                                </a>
                            </div>
                            <div className="ag-courses_item">
                                <a onClick={() => { navigate("/PagInventario") }} className="ag-courses-item_link">
                                    <div className="ag-courses-item_bg"></div>
                                    <div className="ag-courses-item_title">Inventário</div>
                                </a>
                            </div>
                        </>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagEscolhaProdutos;
