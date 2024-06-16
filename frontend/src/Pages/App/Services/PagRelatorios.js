import React, { useEffect, useState, useContext, useRef } from "react";
import Cabecalho from "../../../Components/CabecalhoHome";
import '../../../Styles/App/Service/PagRelatorios.css';
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from '../../../Functions/RedirectAcesso';
import { useNavigate } from "react-router-dom";
import { RelatorioPP, exibeData, RelatorioVendas,traduzData } from "../../../Functions/Functions";
import axios from "axios";
import ConfirmaModal from "../../../Components/ConfirmaModal";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";

function PagRelatorios() {
    const UserOBJ = useContext(UserContext); // pega o UserOBJ inteiro, q tem tanto o User quanto o setUser...
    const User = UserOBJ.User; //Pega só o User....
    const navigate = useNavigate();
    RedirectAcesso(User, 2);
    Redirect(User);

    // Referente a style:
    const { Alerta } = useAlerta(); // alertinha...
    // Referente a relatorios:
    const [tipoRelatorio, setTipoRelatorio] = useState("nulo");
    const [relatorioPP, setRelatorioPP] = useState([]);
    const [relatorioVendas, setRelatorioVendas] = useState([]);
    const [relatorioSelecionado, setRelatorioSelecionado] = useState(null);

    // Referente a update e delete:
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);

    const handleRelatorioClick = (relatorio) => {
        setRelatorioSelecionado(relatorio);
    };

    const pegaRelatorios = async () => {
        const responsePP = await RelatorioPP();
        const responseVendas = await RelatorioVendas();
        setRelatorioPP(responsePP);
        setRelatorioVendas(responseVendas);
    };

    relatorioPP.sort((a, b) => {
        const dataA = traduzData(a);
        const dataB = traduzData(b);

        return dataB - dataA;
    });

    relatorioVendas.sort((a, b) => {
        const dataA = traduzData(a);
        const dataB = traduzData(b);

        return dataB - dataA;
    });

    useEffect(() => {
        pegaRelatorios();
    }, [forceUpdate]);

    const handleChange = (event) => {
        const value = event.target.value;
        if (value === 'nulo') {
            setRelatorioSelecionado(null);
            setTipoRelatorio('nulo');
            return;
        }
        setTipoRelatorio(value);
    };

    const mapeiaRelatorios = () => {
        if (tipoRelatorio && tipoRelatorio !== 'nulo') {
            let relatorioParaMapear = null;
            switch (tipoRelatorio) {
                case 'PP':
                    relatorioParaMapear = relatorioPP;
                    break;
                case 'Vendas':
                    relatorioParaMapear = relatorioVendas;
                    break;
                case 'Todos':
                    relatorioParaMapear = relatorioPP;
                    break;
                default:
                    return null;
            }

            return (
                <div className="PaiRelatorios">
                    {relatorioParaMapear.map((item) => { // específicos...
                        if (item.data?.PP) {
                            return (
                                <div key={item.id} className="ItemRelatorio" onClick={() => handleRelatorioClick(item)}>
                                    Relatório PP de {exibeData(item)} sobre o item '{item.data.produtoNome}' de id {item.data.produtoID}
                                </div>
                            )
                        }
                        else if (item.data?.Data_Venda) {
                            return (
                                <div key={item.id} className="ItemRelatorio" onClick={() => handleRelatorioClick(item)}>
                                    Relatório de vendas de {exibeData(item)} sobre o item '{item.data.Produto_Vendido_Nome}' de id {item.data.Produto_Vendido_Id}
                                </div>
                            )
                        }
                    })}
                </div>
            );
        }
    };

    const deletaRelatorio = async (tipo, id) => {
        try {
            await axios.post('http://localhost:4000/deletaRelatorio', {
                TipoRelatorio: tipo,
                Id: id
            });
            setForceUpdate(prevState => !prevState);
            Alerta(2, "Deletado com sucesso");
        } catch (error) {
            console.log(error);
            Alerta(3, "Erro ao deletar o relatório");
        }
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        deletaRelatorio('PontoDePedido', relatorioSelecionado.id);
        setRelatorioSelecionado(null);
        setTipoRelatorio('nulo');
        pegaRelatorios();

    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const montaRelatorioPP = () => (
        <div className="InfoRelaorio">
            <div className="btnFecharRel">
                <button onClick={() => setRelatorioSelecionado(null)} className="no-print">Fechar relatório</button>
            </div>
            <h2 className="titulo">Relatório de Ponto De Pedido</h2>
            <h3>Data: {exibeData(relatorioSelecionado)}</h3>
            <hr />
            <h4>
                Item: {relatorioSelecionado.data.produtoNome}
                <div className="listaInfo">
                    <ul>
                        <li>Código do produto: {relatorioSelecionado.data.produtoID}</li>
                        <li>Estoque atual: {relatorioSelecionado.data.QtdeAtual} unidades</li>
                        <li>Ponto de pedido calculado (PP): {relatorioSelecionado.data.PP} unidades</li>
                    </ul>
                </div>
                <hr />
                Cálculo utilizado:
                <h3>PP = (Consumo Médio * Tempo de Reposição) + Estoque de Segurança</h3>
                <div className="listaInfo">
                    <ul>
                        <li>Consumo Médio: {(relatorioSelecionado.data.QV / 30).toFixed(2)} itens</li>
                        <li>Tempo de Reposição: {relatorioSelecionado.data.TR} dias</li>
                        <li>Estoque de segurança: {relatorioSelecionado.data.ES} unidades</li>
                        <li>Cálculo executado: ({(relatorioSelecionado.data.QV / 30).toFixed(2)} * {relatorioSelecionado.data.TR}) + {relatorioSelecionado.data.ES} = {relatorioSelecionado.data.PP} (arredondado)</li>
                    </ul>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className="no-print" onClick={() => window.print()}>Imprimir Relatório</button>
                    <button className="no-print" onClick={() => setShowConfirmation(true)}>Deletar relatório</button>
                </div>
            </h4>
        </div>
    );

    const escolheRelatorio = (relatorioAtual) => {
        if (tipoRelatorio === "Todos" || relatorioAtual.data?.PP) {
            return montaRelatorioPP();
        }
    };

    return (
        <div className="PagRelatorios">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <AlertaNotificação />
            {showConfirmation && (
                <ConfirmaModal
                    message="Tem certeza que deseja excluir este relatório? Esta ação removerá a notificação atrelada ao relatório, e não poderá ser desfeita"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            <div className="btn">
                <button className="Voltar" onClick={() => navigate("/PagPerfil")}>
                    Voltar
                </button>
            </div>
            <div className="Conteudo">
                <div className="BarraLateral">
                    <label htmlFor="relatorios">Tipo de relatório:</label>
                    <select className="selectRelatorio" value={tipoRelatorio} onChange={handleChange}>
                        <option value="nulo">Selecione um tipo</option>
                        <option value="PP">Relatórios de Ponto de pedido</option>
                        <option value="Vendas">Relatórios de Vendas</option>
                        <option value="Todos">Todos os relatórios</option>
                    </select>
                    {mapeiaRelatorios()}
                </div>
                <div className="ConteudoPrincipal">
                    {relatorioSelecionado ? (
                        <div>
                            {escolheRelatorio(relatorioSelecionado)}
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
