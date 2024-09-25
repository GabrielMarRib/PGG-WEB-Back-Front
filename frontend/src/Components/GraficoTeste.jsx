import React from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';

function GraficoTeste() {
  const data = [
    { name: 'Jan', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Fev', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Mar', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Abr', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Mai', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Jun', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Jul', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Ago', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Set', receita: 1200, encomendas: 100, custo: 8500 },
    { name: 'Out', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Nov', receita: 0, encomendas: 0, custo: 0 },
    { name: 'Dez', receita: 0, encomendas: 0, custo: 0 }
  ];

  return (
    <div>
      <ComposedChart width={625} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#ababab" />
        <Area type="monotone" dataKey="custo" fill="#8884d8" stroke="#8884d8" name="Custo" />
        <Bar dataKey="encomendas" barSize={20} fill="#413ea0" name="Encomendas" />
        <Line type="monotone" dataKey="receita" stroke="#ff7300" name="Receita" />
      </ComposedChart>
    </div>
  )
}

export default GraficoTeste
