import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PEPS({ produto }) {
  const [produtosProximosVencimento, setProdutosProximosVencimento] = useState([]);

  useEffect(() => {
    const obterProdutosProximosVencimento = async () => {
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
          funcao: 'verificaProdutosProximosVencimento',
          senha: '@7h$Pz!q2X^vR1&K'
        });

        if (response.data.message) {
          setProdutosProximosVencimento(response.data.message);
        }
      } catch (error) {
        console.log("Erro ao obter produtos próximos ao vencimento: " + error);
      }
    };

    obterProdutosProximosVencimento();
  }, []);

  // Estrutura do calendário manual para o mês
  const diaValidade = produto && produto?.dataValidade && produto.dataValidade.split("-")[2] //O gostoso do thiago pediu pra por isso aqui: Teoricamente deveria ter ano e mes na validade também, mas fodasi (nois q voa bruxao)
  const mesValidade = produto && produto?.dataValidade && produto.dataValidade.split("-")[1] //O gostoso do thiago pediu pra por isso aqui: Teoricamente deveria ter ano e mes na validade também, mas fodasi (nois q voa bruxao)
  const AnoValidade = produto && produto?.dataValidade && produto.dataValidade.split("-")[0] //O gostoso do thiago pediu pra por isso aqui: Teoricamente deveria ter ano e mes na validade também, mas fodasi (nois q voa bruxao)

  const diaCompra = produto && produto?.dataCompra && produto.dataCompra.split("-")[2]
  const mesCompra = produto && produto?.dataCompra && produto.dataCompra.split("-")[1]
  const AnoCompra = produto && produto?.dataCompra && produto.dataCompra.split("-")[0]

  const bissextoCompra = (AnoCompra % 4 === 0 && AnoCompra % 100 !== 0) || (AnoCompra % 400 === 0);
  const bissextoValidade = (AnoValidade % 4 === 0 && AnoValidade % 100 !== 0) || (AnoValidade % 400 === 0);

  const meses = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro"
  }
  const dias = {
    "01": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31],
    "02": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      bissextoCompra ? 29 : null], // mudar depois
    "03": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31],
    "04": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30],
    "05": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31],
    "06": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30],
    "07": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31],
    "08": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31],
    "09": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30],
    "10": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31],
    "11": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30],
    "12": [1, 2, 3, 4, 5, 6, 7,
      8, 9, 10, 11, 12, 13, 14,
      15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
      29, 30, 31],
  };

  // Função que renderiza os dias do calendário
  const pegaCor = (dia, compra, data) => {
    if ((dia == diaCompra) && compra)
      return styles.diaCompra
    else if (dia == diaValidade && !compra)
      return styles.diaValidade
    else if (dia == diaValidade && Array.isArray(data.dia))
      return styles.diaValidade 
    else
      return styles.day
  }

  const defineCalendario = () => {
    if (mesCompra == mesValidade) {
      return renderCalendar(true, { dia: [diaCompra, diaValidade], mes: [mesCompra, mesValidade], ano: [AnoCompra, AnoValidade] }, true)
    } else {
      return [
        renderCalendar(false, { dia: diaCompra, mes: mesCompra, ano: AnoCompra }, true),
        renderCalendar(false, { dia: diaValidade, mes: mesValidade, ano: AnoValidade }, false)
      ]
    }
  }

  const renderCalendar = (mesmoMes, objData, compra) => { // mostra o calendário
    return (
      <div style={styles.calendarContainer}>
        {compra ?
          mesmoMes ?
            <>
              Compra: {objData.dia[0]}/{objData.mes[0]}/{objData.ano[0]}
              <br></br>
              Validade: {objData.dia[1]}/{objData.mes[1]}/{objData.ano[1]}
            </> :

            <>
              Compra: {objData.dia}/{objData.mes}/{objData.ano}
            </> :
          objData.dia ?
          <>
            Validade: {objData.dia}/{objData.mes}/{objData.ano}
          </>
          :
          <>
            Produto sem validade
          </>
        }
        <br></br>

        <h2 style={styles.title}>{meses[Array.isArray(objData.mes) ? objData.mes[0] : objData.mes]}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
  
             {objData.mes ? (
               dias[Array.isArray(objData.mes) ? objData.mes[0] : objData.mes].map(day => (
                <div key={day} style={pegaCor(day, compra, objData)}>{day}</div>
                ))
              ): null
          } 

        
        </div>
      </div>
    )
  };

  //pra colocar o outro calendário, duplica ou altera o renderCalendar 
  // muda de meses[mesCompra] pra meses[mesValidade]
  // muito fácil viu

  // Definindo estilos inline
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
    },
    calendarContainer: {
      flex: 1,
      marginRight: '10px', // Reduzido para dar espaço ao outro contêiner
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    day: {
      padding: '10px',
      border: '1px solid #ccc',
      textAlign: 'center',
      borderRadius: '3px',
      backgroundColor: '#f0f0f0',
      fontSize: '16px',
      margin: '2px',
    },
    title: {
      textAlign: 'center',
      fontSize: '20px',
      marginBottom: '10px',
    },
    produtosContainer: {
      flex: 1,
      marginLeft: '10px', // Reduzido para dar espaço ao outro contêiner
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    alerta: {
      color: 'red',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    produtoItem: {
      padding: '10px',
      borderBottom: '1px solid #eee',
    },
    produtoVencido: {
      color: 'red',
      fontWeight: 'bold',
    },
    produtoProximo: {
      color: 'orange',
      fontWeight: 'bold',
    },

    diaCompra: {
      color: "green",
      padding: '10px',
      border: '1px solid #ccc',
      textAlign: 'center',
      borderRadius: '3px',
      backgroundColor: '#A6FF7E',
      fontSize: '16px',
      margin: '2px',
    },
    diaValidade: {
      color: "red",
      padding: '10px',
      border: '1px solid #ccc',
      textAlign: 'center',
      borderRadius: '3px',
      backgroundColor: '#FF7E7E',
      fontSize: '16px',
      margin: '2px',
    }
  };

  return (
    <div style={styles.container}>
      {
        produto && defineCalendario()
      }
      {/* <button onClick={() => console.log(mesCompra)}>Testar BD</button> */}
      <div style={styles.produtosContainer}>
        <p className="card-title">Produtos que Vencem em Até 30 Dias.</p>
        <p className="contador">
          {produtosProximosVencimento.filter(produto => new Date(produto.dt_validade) < new Date()).length} Produtos Vencidos.
        </p>
        {produtosProximosVencimento.length > 0 ? (
          <div className="produtos-vencimento">
            <ul>
              {produtosProximosVencimento.map(produto => {
                const produtoVencido = new Date(produto.dt_validade) < new Date();
                return (
                  <li key={produto.numerolote} className="produto-item">
                    <div className="produto-nome" style={{ color: produtoVencido ? 'red' : 'inherit' }}>
                      {produto.nome}
                    </div>
                    <div className="produto-detalhes">
                      <span className={produtoVencido ? "produto-vencido" : ""} style={{ color: produtoVencido ? 'red' : 'inherit' }}>
                        Vencimento em: <strong>{new Intl.DateTimeFormat('pt-BR').format(new Date(produto.dt_validade))}</strong>
                      </span>
                      <span> Lote: <strong>{produto.numerolote}</strong></span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="alerta">Não há produtos próximos ao vencimento.</p>
        )}
      </div>
    </div>
  );
}

export default PEPS;
