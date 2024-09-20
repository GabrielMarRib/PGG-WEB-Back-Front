import React, { useEffect, useState, useContext, useRef } from "react";
import Cabecalho from "../../../Components/CabecalhoHome";
import '../../../Styles/App/Service/PagRelatorios.css';
import { UserContext } from "../../../Context/UserContext";
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
        console.log(relatorio);
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
                            `Relatório PP de ${item.DATA} sobre o item '${item.nome_produto}' de id ${item.Produto_ID}`
                        ) : (
                            `Relatório de vendas de ${item.DATA_venda} sobre o item '${item.nome_produto}' de id ${item.Produto_id}`
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
        if (relatorioSelecionado.pp)
            colecao = 'PontoDePedido'
        else if (relatorioSelecionado.Produto_ID)
            colecao = 'Vendas'

        setShowConfirmation(false);
        deletaRelatorio(colecao, relatorioSelecionado.Produto_id);
        setRelatorioSelecionado(null);
        setTipoRelatorio('nulo');
        pegaRelatorios();

    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const montaRelatorioPP = () => {
        if (!relatorioSelecionado) {
            return <div>Nenhum relatório selecionado.</div>; 
        }
    
   
        const { nome_produto, Produto_ID, Qtd_At, pp, QV, TR, ES } = relatorioSelecionado;
        if (pp === undefined || Produto_ID === undefined) {
            return <div>Relatório inválido.</div>; 
        }
    
        return (
            <div className="InfoRelaorio">
                <div className="btnFecharRel">
                    <button onClick={() => setRelatorioSelecionado(null)} className="no-print">Fechar relatório</button>
                </div>
                <h2 className="titulo">Relatório de Ponto De Pedido</h2>
                <h3>Data: {relatorioSelecionado.DATA_venda}</h3>
                <hr />
                <h4>
                    Item: {nome_produto}
                    <div className="listaInfo">
                        <ul>
                            <li>Código do produto: {Produto_ID}</li>
                            <li>Estoque atual: {Qtd_At} {pegaQtde(Qtd_At)}</li>
                            <li>Ponto de pedido calculado (PP): {pp} {pegaQtde(pp)}</li>
                        </ul>
                    </div>
                    <hr />
                    Cálculo utilizado:
                    <h3>PP = (Consumo Médio * Tempo de Reposição) + Estoque de Segurança</h3>
                    <div className="listaInfo">
                        <ul>
                            <li>Consumo Médio: {(QV / 30).toFixed(2)} itens</li>
                            <li>Tempo de Reposição: {TR} dias</li>
                            <li>Estoque de segurança: {ES} {pegaQtde(ES)}</li>
                            <li>Cálculo executado: ({(QV / 30).toFixed(2)} * {TR}) + {ES} = {pp} (arredondado)</li>
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
    };

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
            <h3>Data: {relatorioSelecionado.DATA}</h3>
            <hr />
            <h4> 
                Item: {relatorioSelecionado.nome_produto} {/* n tem nome do produto */}
                <div className="listaInfo">
                    <ul>
                        <li>Código do produto: {relatorioSelecionado.nome_produto}</li>
                        <li>Quantidade Antes da venda: {relatorioSelecionado.Qtd_Disp} {pegaQtde(relatorioSelecionado.Qtd_Disp)}</li>
                        <li>Quantidade Vendida: {relatorioSelecionado.Qtd_Venda} {pegaQtde(relatorioSelecionado.Qtd_Venda)}</li>
                        <li>Quantidade Atual: {relatorioSelecionado.Qtd_Disp} {pegaQtde(relatorioSelecionado.Qtd_Disp)}</li>
                        <li>Custo unitário: R$ {Number(relatorioSelecionado.Custo_unitario).toFixed(2)}</li>
                        <li>Receita Total: R$ {Number(relatorioSelecionado.Receita).toFixed(2)}</li>
                    </ul>
                </div>
                <hr />
                <h3>Dados sobre o responsável da venda:</h3>
                <div className="listaInfo">
                    <ul>
                        <li>Nome do responsável: {relatorioSelecionado.Autor}</li>  {/* chegando só o id do autor ta fatando o nomezinho*/}
                        <li>Responsavel Id: {relatorioSelecionado.Responsavel_Id} </li> {/* chegando só o id do autor ta fatando o nomezinho*/}
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
        if (!relatorioAtual) return null; // Adicione esta verificação
        if (relatorioAtual.pp) {
            return montaRelatorioPP();
        } else if (relatorioAtual.Receita) {
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
