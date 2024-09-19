import React, { useEffect, useState, useContext, useRef } from "react";
import Cabecalho from "../../../Components/CabecalhoHome";
import '../../../Styles/App/Service/PagRelatorios.css';
import { UserContext } from "../../../Context/UserContext";
import Redirect from "../../../Functions/Redirect";
import RedirectAcesso from '../../../Functions/RedirectAcesso';
import { useNavigate } from "react-router-dom";
import { RelatorioPP, exibeData, RelatorioVendas, traduzData } from "../../../Functions/Functions";
import axios from "axios";
import ConfirmaModal from "../../../Components/ConfirmaModal";
import AlertaNotificação from "../../../Components/AlertaNotificação.js";
import { useAlerta } from "../../../Context/AlertaContext.js";
import Titulo from "../../../Components/Titulo.jsx";
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
        console.log("Relatório PP:", responsePP);
        console.log("Relatório Vendas:", responseVendas);
        setRelatorioPP(responsePP);
        setRelatorioVendas(responseVendas);
    };
    if(Array.isArray(relatorioPP)){
    relatorioPP.sort((a, b) => {
        const dataA = traduzData(a);
        const dataB = traduzData(b);

        return dataB - dataA;
    });
}

    if (Array.isArray(relatorioVendas)) {
        relatorioVendas.sort((a, b) => {
            const dataA = traduzData(a);
            const dataB = traduzData(b);
            return dataB - dataA;
        });
    }

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
        if (!tipoRelatorio || tipoRelatorio === 'nulo') {
            return null;
        }
    
        let relatorios = [];
        if (tipoRelatorio === 'PP') {
            relatorios = relatorioPP.map(item => ({
                tipo: 'PP',
                item
            }));
        } else if (tipoRelatorio === 'Vendas') {
            relatorios = relatorioVendas.map(item => ({
                tipo: 'Vendas',
                item
            }));
        } else if (tipoRelatorio === 'Todos') {
            relatorios = [
                ...relatorioPP.map(item => ({
                    tipo: 'PP',
                    item
                })),
                ...relatorioVendas.map(item => ({
                    tipo: 'Vendas',
                    item
                }))
            ];
        }
    
        return (
            <div className="PaiRelatorios">
                {relatorios.map(({ tipo, item }) => (
                    <div key={item.id} className="ItemRelatorio" onClick={() => handleRelatorioClick(item)}>
                        {tipo === 'PP' ? (
                            `Relatório PP de ${exibeData(item)} sobre o item '${item.produtoNome}' de id ${item.Produto_ID}`
                        ) : (
                            `Relatório de vendas de ${exibeData(item)} sobre o item '${item.Produto_Vendido_Nome}' de id ${item.Produto_id}`
                        )}
                    </div>
                ))}
            </div>
        );
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
        let colecao = '';
        if (relatorioSelecionado?.PP)
            colecao = 'PontoDePedido'
        else if (relatorioSelecionado?.Produto_ID)
            colecao = 'Vendas'

        setShowConfirmation(false);
        deletaRelatorio(colecao, relatorioSelecionado.id);
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
                        <li>Código do produto: {relatorioSelecionado.Produto_ID}</li>
                        <li>Estoque atual: {relatorioSelecionado.Qtd_At} {pegaQtde(relatorioSelecionado.Qtd_At)}</li>
                        <li>Ponto de pedido calculado (PP): {relatorioSelecionado.pp} {pegaQtde(relatorioSelecionado.data.pp)}</li>
                    </ul>
                </div>
                <hr />
                Cálculo utilizado:
                <h3>PP = (Consumo Médio * Tempo de Reposição) + Estoque de Segurança</h3>
                <div className="listaInfo">
                    <ul>
                        <li>Consumo Médio: {(relatorioSelecionado.QV / 30).toFixed(2)} itens</li>
                        <li>Tempo de Reposição: {relatorioSelecionado.TR} dias</li>
                        <li>Estoque de segurança: {relatorioSelecionado.ES} {pegaQtde(relatorioSelecionado.ES)}</li>
                        <li>Cálculo executado: ({(relatorioSelecionado.QV / 30).toFixed(2)} * {relatorioSelecionado.TR}) + {relatorioSelecionado.ES} = {relatorioSelecionado.pp} (arredondado)</li>
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

    const pegaQtde = (qtde) =>{
        if(qtde == 1){
            return "unidade"
        }else
            return "unidades"
    }

    const montaRelatorioVendas = () => (
        <div className="InfoRelaorio">
            <div className="btnFecharRel">
                <button onClick={() => setRelatorioSelecionado(null)} className="no-print">Fechar relatório</button>
            </div>
            <h2 className="titulo">Relatório de Vendas</h2>
            <h3>Data: {exibeData(relatorioSelecionado)}</h3>
            <hr />
            <h4> 
                Item: {relatorioSelecionado.Produto_Vendido_Nome} {/* n tem nome do produto */}
                <div className="listaInfo">
                    <ul>
                        <li>Código do produto: {relatorioSelecionado.Produto_Vendido_Id}</li>
                        <li>Quantidade Antes da venda: {relatorioSelecionado.Quantidade_Antes_Venda} {pegaQtde(relatorioSelecionado.data.Quantidade_Antes_Venda)}</li>
                        <li>Quantidade Vendida: {relatorioSelecionado.Quantidade_Vendida} {pegaQtde(relatorioSelecionado.data.Quantidade_Vendida)}</li>
                        <li>Quantidade Atual: {relatorioSelecionado.Quantidade_Disponivel} {pegaQtde(relatorioSelecionado.data.Quantidade_Disponivel)}</li>
                        <li>Custo unitário: R$ {Number(relatorioSelecionado.Produto_Custo_Unit).toFixed(2)}</li>
                        <li>Receita Total: R$ {Number(relatorioSelecionado.Receita).toFixed(2)}</li>
                    </ul>
                </div>
                <hr />
                <h3>Dados sobre o responsável da venda:</h3>
                <div className="listaInfo">
                    <ul>
                        <li>Nome do responsável: {relatorioSelecionado.data.Responsavel_Nome}</li>
                        <li>Responsavel Id: {relatorioSelecionado.data.Responsavel_Id} </li>
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
        if (relatorioAtual.pp) {
            return montaRelatorioPP();
        } else if (relatorioAtual.Produto_Vendido_Id) {
            return montaRelatorioVendas();
        }
    };

    return (
        <div className="PagRelatorios">
            <div className="Cabecalho">
                <Cabecalho />
            </div>
            <Titulo
                tituloMsg='Visualização de relatórios'
            />
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
                        <div className="infoRelatorioPai">
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
