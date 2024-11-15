import { useNavigate } from 'react-router-dom';
import Cabecalho from '../../../../../Components/Cabecalho/CabecalhoHome'; // Utilize o mesmo componente de cabeçalho
import "./PagEscolhaCurvaABC.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../Context/UserContext";
import RedirectAcesso from '../../../../../Functions/RedirectAcesso';
import axios from 'axios';
function PagEscolhaCurvaABC() {

    useEffect(()=>{
        const pegaDados = async () =>{  
            try{
                const response = await axios.get('http://pggzettav3.mooo.com/api/index.php');
                console.log(response.data);
            }catch(err){
                console.log(err)
            }
        };
        pegaDados();
    },[])
    const UserOBJ = useContext(UserContext);
    const User = UserOBJ.User;


    RedirectAcesso(User,1)
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="PagEscolhaCurvaABC">
            <div className="CabecalhoHome">
                <Cabecalho />
            </div>
            <div className="conteudoPaginaMaster">
                <div className="ag-format-container">
                    <h1>Escolha que tipo de visualização você gostará de ver na Curva ABC</h1>
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
