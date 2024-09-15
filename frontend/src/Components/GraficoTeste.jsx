import React from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';

function GraficoTeste() {
  const data = [
    { name: 'Jan', receita: 12000, encomendas: 150, custo: 9000 },
    { name: 'Fev', receita: 13000, encomendas: 160, custo: 9500 },
    { name: 'Mar', receita: 12500, encomendas: 155, custo: 9200 },
    { name: 'Abr', receita: 14000, encomendas: 170, custo: 9800 },
    { name: 'Mai', receita: 15000, encomendas: 180, custo: 10000 },
    { name: 'Jun', receita: 16000, encomendas: 190, custo: 10500 },
    { name: 'Jul', receita: 15500, encomendas: 185, custo: 10200 },
    { name: 'Ago', receita: 16500, encomendas: 200, custo: 10800 },
    { name: 'Set', receita: 17000, encomendas: 210, custo: 11000 },
    { name: 'Out', receita: 17500, encomendas: 220, custo: 11500 },
    { name: 'Nov', receita: 18000, encomendas: 230, custo: 12000 },
    { name: 'Dez', receita: 19000, encomendas: 240, custo: 12500 }
  ];

  return (
    <div>
      <ComposedChart width={700} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="custo" fill="#8884d8" stroke="#8884d8" name="Custo" />
        <Bar dataKey="encomendas" barSize={20} fill="#413ea0" name="Encomendas" />
        <Line type="monotone" dataKey="receita" stroke="#ff7300" name="Receita" />
      </ComposedChart>
    </div>
  )
}

export default GraficoTeste
