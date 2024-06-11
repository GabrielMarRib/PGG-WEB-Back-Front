import React, { useEffect, useState } from "react";
import Cabecalho from "../../../Components/Cabecalho";
import '../../../Styles/App/Service/PagRelatorios.css';
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from '../../../Functions/RedirectAcesso';
import { useNavigate } from "react-router-dom";
import { RelatorioPP, exibeData } from "../../../Functions/Functions";


function PagRelatorios() {
    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const navigate = useNavigate()
    RedirectAcesso(User, 2);
    Redirect(User);

    const [tipoRelatorio, setTipoRelatorio] = useState(null);
    const [relatorioPP, setRelatorioPP] = useState([]);
    const [relatorioSelecionado, setRelatorioSelecionado] = useState(null)

    const handleRelatorioClick = (relatorio) => {
        setRelatorioSelecionado(relatorio);
    };

    const pegaRelatorios = async () => {
        const response = await RelatorioPP();
        console.log(response)
        setRelatorioPP(response)
    }

    useEffect(() => {
        pegaRelatorios();
    }, [])


    const handleChange = (event) => {
        setTipoRelatorio(event.target.value)
    };

    const mapeiaRelatorios = () => {
        if (tipoRelatorio) {
            let relatorioParaMapear = null;
            switch (tipoRelatorio) {
                case 'PP':
                    console.log("ok")
                    relatorioParaMapear = relatorioPP
                    break;
                default:
                    return;
            }
            return (
                <div>
                    {relatorioParaMapear.map((item) => {
                        return (
                            <div key={item.id} className="ItemRelatorio" onClick={() => { handleRelatorioClick(item) }}>
                                Relatório PP de {exibeData(item)} sobre o item {item.data.produtoNome} de id {item.id}
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }
    return (
        <div className="PagRelatorios">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <div className="btn">
                <button className="Voltar" onClick={() => { navigate("/PagPerfil") }}>
                    Voltar
                </button>
            </div>
            <div className="Conteudo">

                <div className="BarraLateral">
                    <label for="relatorios">Tipo de relatório:</label>
                    <select id="relatorios" onChange={handleChange}>
                        <option value="null">Selecione um tipo</option>
                        <option value="PP">Relatórios de Ponto de pedido</option>
                        <option value="Vendas">Relatórios de Vendas</option>
                        <option value="Todos">Todos os relatórios</option>
                    </select>

                    {mapeiaRelatorios()}


                </div>
                <div className="ConteudoPrincipal">
                    {relatorioSelecionado ? (
                        <div className="InfoRelaorio">
                            <div className="btnFecharRel">
                                <button onClick={()=> {setRelatorioSelecionado(null)}} className="no-print">Fechar relatótrio</button>
                            </div>
                            <h2 className="titulo">Relatório de Ponto De Pedido</h2>
                            <h3>Data: {exibeData(relatorioSelecionado)} </h3>
                            <hr />
                            <h4>
                                Item: {relatorioSelecionado.data.produtoNome}
                                <div className="listaInfo">
                                    <ul >
                                        <li>Código do produto: {relatorioSelecionado.id}</li>
                                        <li>Estoque atual: {relatorioSelecionado.data.QtdeAtual} unidades</li>
                                        <li>Ponto de pedido calculado (PP): {relatorioSelecionado.data.PP} unidades</li>
                                    </ul>
                                </div>
                                <hr />
                                Cálculo utilizado:
                                <h3>PP = (Consumo Médio * Tempo de Reposição) + Estoque de Segurança</h3>
                                <div className="listaInfo">
                                    <ul >
                                        <li>Consumo Médio: {(relatorioSelecionado.data.QV / 30).toFixed(2)} itens</li>
                                        <li>Tempo de Reposição: {relatorioSelecionado.data.TR} dias</li>
                                        <li>Estoque de segurança: {relatorioSelecionado.data.ES} unidades</li>
                                        <li>Cálculo executado: ({(relatorioSelecionado.data.QV / 30).toFixed(2)} * {relatorioSelecionado.data.TR}) + {relatorioSelecionado.data.ES} = {relatorioSelecionado.data.PP} (arredondado)</li>
                                    </ul>
                                </div>
                                <hr />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button className="no-print" onClick={() => { window.print() }}>Imprimir Relatório</button>
                                    <button className="no-print" >Deletar relatório</button>
                                </div>

                            </h4>
                        </div>
                    ) : (
                        <div className="EspacoReservado">
                            Selecione um relatório para ver as informações
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PagRelatorios;
