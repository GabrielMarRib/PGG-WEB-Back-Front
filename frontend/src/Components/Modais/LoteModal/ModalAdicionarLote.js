import React, { useState, memo, useEffect } from 'react';
import './ModalLote.css';
import axios from 'axios';
import { useAlerta } from "../../../Context/AlertaContext.js";
import AlertaNotificação from "../../NotificacaoAlert/AlertaNotificação.js";
import ConfirmaModal from '../ConfirmaModal/ConfirmaModal.js';
import { Link } from 'react-router-dom';

const LoteMemo = memo(function ModalAddLote({ Produto, fechar }) { // teoricamente faria não ter reRender, mas ta tendo, ou seja, fds

  const { Alerta } = useAlerta();

  const [fornecedor, setFornecedor] = useState('');
  const [FornecedorSelect, setFornecedorSelect] = useState([]);
  const [dataCompra, setDataCompra] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [valorCompra, setValorCompra] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [quantidade, setQuantidade] = useState(0);


  const pegarTodosFornecedores = async () => {
    try {
      const response = await axios.post('http://discordia.com.br/', {  // acessa via post (SEMPRE SERÁ POST)                
        funcao: 'pegarTodosFornecedores', // dita qual função deve ser utilizada da api. (a gente te fala o nome) // ---> parâmetros da consulta... SÃO necessários.
        senha: '@7h$Pz!q2X^vR1&K' // teoricamente essa senha tem q ser guardada em um .env, mas isso é trabalho do DEIVYD :)
      },
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Connection": "keep-alive",
        },
      });
      setFornecedorSelect(response.data.fornecedores); // coloca a LISTA de categorias em uma useState
      console.log(response.data) // log para sabermos o que foi pego
    } catch (error) {
      console.log("deu ruim: " + error) // log para sabermos qual foi o erro
    }
  };
  useEffect(() => {
    pegarTodosFornecedores();
  }, [])





  const CadastrarLote = async (e) => {
    
    // setShowConfirma(true);
    if(fornecedor == '' || dataCompra == '' || dataValidade == '' || quantidade == 0 || valorCompra == '' || valorVenda == ''){
      Alerta(1, "Preencha todos os valores");
      return
    }


   
    try {
        const response = await axios.post('http://discordia.com.br/', {
          funcao: 'inserelote', 
          senha: '@7h$Pz!q2X^vR1&K',
          dt_compra: dataCompra,
          dt_validade: dataValidade,
          qtde: quantidade,
          vlr_compra: valorCompra,
          vlr_venda: valorVenda,
          produto: Produto.id_produtos,
          fornecedor: fornecedor.id_fornecedor,
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
        console.log(response.data) 
        Alerta(2, "Cadastrado!");
        setFornecedor('')
        setDataCompra('')
        setValorCompra('')
        setValorVenda('')
        setQuantidade(0)
        setDataValidade('')
        fechar()
      } catch (error) {
        Alerta(3, "Ocorreu um problema!");
        console.log("Não cadastrou: " + error) 
      }

  


  }




const handleChangeFornecedor = (e) => {
    const val = e.target.value
    if (val === 'Vazio') {
      setFornecedor('')
    } else {
    setFornecedor(val);
    }
   

  };
  const MapearFornecedor = (Fornecedor) => {
    return (
      <option value={JSON.stringify(Fornecedor)}>{Fornecedor.id_fornecedor} - {Fornecedor.nome}</option>
    );
  }

  return (
    <div className='ModalAtualizarLote'>
        <AlertaNotificação />
    <div className='conteudo-modal'>
      <div className='cabecalho-modal'>
      <h1>Cadastrar Novo Lote</h1>
      <button onClick={fechar} className='botao-fechar'>X</button>
      </div>

    <center className='testeH1'><h1> "{Produto.nome}" </h1></center>
    
  



    <form className="formCat" onSubmit={(e) => {e.preventDefault(); CadastrarLote();}}>
      
                    Fornecedor:
                    <br />
                    <select
                      onChange={handleChangeFornecedor}
                      value={fornecedor}
                    >
                      <option value="Vazio">Selecione um fornecedor</option>
                      <option value="Vazio">Sem fornecedor</option>
                      {Array.isArray(FornecedorSelect) ? (
                        FornecedorSelect?.map(MapearFornecedor)
                      ) : (
                        null
                      )


                      }
                    </select>
                    
                    <br />
                    Data de Compra: <span style={{ color: "red" }}> *</span>
                    <input
                      type="date"
                      id="dataCompra"
                      rows="3"
                      required value={dataCompra}
                      onChange={(e) => setDataCompra(e.target.value)}
                    />
               
                  
                    Data de Validade:
                    <input
                      type="date"
                      id="dataVenda"
                      rows="3"
                      value={dataValidade}
                      onChange={(e) => setDataValidade(e.target.value)}
                    />
             

                
                    Quantidade: <span style={{ color: "red" }}> *</span>
                    <input
                      type="int"
                      id="quantidadeProduto"
                      required value={quantidade}
                      onChange={(e) => setQuantidade(e.target.value === '' ? 0 : parseInt(e.target.value))}
                    />
                


                 
                    Valor da Compra (Unitário):
                    <input
                      type="number"
                      id="valorCompra"
                      required value={valorCompra}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          setValorCompra(value);
                        }
                      }}
                    />
              

                 
                  
                      Valor da Venda (Unitário): <span style={{ color: "red" }}> *</span>
                
                    <input
                      type="number"
                      id="valorVenda"
                      required value={valorVenda}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          setValorVenda(value);
                        }
                      }}
                    />
             



      
      <button className='botao-testar'>Cadastrar</button>


      </form>

    </div>

    </div>


  )

});

export default LoteMemo;
