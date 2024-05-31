import { useNavigate } from 'react-router-dom';
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagPontoPedido.css';

function PagPontoPedido() {
    const navigate = useNavigate();
    return (
        <div className="PagPontoPedido">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
        </div>
    );
}

export default PagPontoPedido;