// import React from 'react';
// import '../../../Styles/App/Service/DashBoard.css';



// function TesteDashboard() {
//   // Dados fictícios

//   const data = {
//     user: {
//       name: "Nome exemplo",
//       email: "exemploEmail@company.com",
//     },
//     earnings: 628,
//     shares: 2434,
//     likes: 1259,
//     rating: 8.5,
//     progress: 45,
//     chartData: [
//       { year: '2019', value: 200 },
//       { year: '2020', value: 300 },
//       { year: '2021', value: 400 },
//       { year: '2022', value: 500 },
//       { year: '2023', value: 600 },
//     ],
//   };

//   return (
//     <div className="dashboard">
//       <div className="sidebar">
//         <div className="user-info">
//           <div className="user-avatar"></div>
//           <div className="user-details">
//             <h2>{data.user.name}</h2>
//             <p>{data.user.email}</p>
//           </div>
//         </div>
//         <ul className="nav-links">
//           <li>Home</li>
//           <li>Estoque</li>
//           <li>Curva ABC</li>
//           <li>Ponto de Pedido</li>
//           <li>Lote Econômico</li>
//           <li>Custo Médio</li>
//         </ul>
//       </div>
//       <div className="main-content">
//         <div className="stats-overview">
//           <div className="stat-item">
//             <h3>Renda</h3>
//             <p>${data.earnings}</p>
//           </div>
//           <div className="stat-item">
//             <h3>Compartilhamentos</h3>
//             <p>{data.shares}</p>
//           </div>
//           <div className="stat-item">
//             <h3>Curtidas</h3>
//             <p>{data.likes}</p>
//           </div>
//           <div className="stat-item">
//             <h3>Nota</h3>
//             <p>{data.rating}</p>
//           </div>
//         </div>
//         <div className="charts">
//           <div className="bar-chart">
//             {/* Adicione seu componente de gráfico de barras aqui */}
//           </div>
//           <div className="line-chart">
//             {/* Adicione seu componente de gráfico de linhas aqui */}
//           </div>
//         </div>
//         <div className="progress">
//           <h3>Progress</h3>
//           <div className="progress-circle">
//             <div className="circle" style={{ '--value': data.progress }}></div>
//             <p>{data.progress}%</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TesteDashboard;
