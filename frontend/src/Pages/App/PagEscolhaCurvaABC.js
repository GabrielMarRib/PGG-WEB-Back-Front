import { useNavigate } from 'react-router-dom';
import Cabecalho from '../../Components/Cabecalho';
import "../../Styles/App/PagEscolhaCurvaABC.css"
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Redirect from "../../Functions/Redirect";


function PagEscolhaCurvaABC() {
    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....

    Redirect(User);
    const navigate = useNavigate();

    return (
        <div className="PagEscolhaCurvaABC">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <div className="PagEscolhaCurvaABC">
                <div className="ag-format-container">

                    <h1>Escolha que tipo de visualização voce gostará de ver na Curva ABC</h1>

                    <div className="ag-courses_box">
                        <div className="ag-courses_item">
                            <a onClick={() => { navigate("/PagCurvaABC") }} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">CURVA ABC - Por Frequência</div>
                            </a>
                        </div>

                        <div className="ag-courses_item">
                            <a onClick={() => { navigate("/PagCurvaABCPorValor") }} className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>
                                <div className="ag-courses-item_title">CURVA ABC - Por Valor</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagEscolhaCurvaABC;