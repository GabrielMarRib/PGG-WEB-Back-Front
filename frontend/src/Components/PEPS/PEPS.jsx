import React from 'react';

function PEPS({ produto }) {
  // Estrutura do calendário manual para o mês
  const dias = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, 31,
  ];

  // Função que renderiza os dias do calendário
  const renderCalendar = () => {
    return dias.map(day => (
      <div key={day} style={styles.day}>{day}</div>
    ));
  };

  // Definindo estilos inline
  const styles = {
    calendarContainer: {
      position: 'absolute',
      bottom: '50px',
      left: '20px',
      backgroundColor: '#f0f0f0',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      width: '400px', // Ajuste este valor conforme necessário para o seu design
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      display: 'grid',                // Use grid para organização
      gridTemplateColumns: 'repeat(7, 1fr)', // Define 7 colunas
      gap: '5px',                    // Adiciona espaço entre os itens
    },
    day: {
      padding: '5px',                // Reduzindo o padding das células
      border: '1px solid #ccc',
      textAlign: 'center',
      borderRadius: '3px',
      backgroundColor: '#fff',
      fontSize: '16px',              // Mantendo o tamanho de texto
      margin: '2px',                 // Margem entre os dias
      height: '50px',                // Altura fixa para os dias
    },
    title: {
      textAlign: 'center',
      fontSize: '18px',              // Ajuste do tamanho do título
      marginBottom: '10px',
    },
  };

  return (
    <>
    
      <div style={styles.calendarContainer}>
        <h2 style={styles.title}>Janeiro</h2>
        {renderCalendar()}
      </div>
      <button onClick={()=>console.log(produto)}>Sexo</button>
    </>
  );
}

export default PEPS;
