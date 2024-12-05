import React, { useEffect,useState } from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import axios from 'axios';

function GraficoTeste() {
  const [vendasInfo, setVendasInfo] = useState({});
  const [raw, setRaw] = useState(null);
  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.post('http://localhost:80/php/', {
          funcao: 'pegarVendaAcumulada',
          senha: '@7h$Pz!q2X^vR1&K'
        },
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
          },
        });
        const months = [
          { name: 'Jan', receita: 0, qtdeTotal: 0 },
          { name: 'Fev', receita: 0, qtdeTotal: 0 },
          { name: 'Mar', receita: 0, qtdeTotal: 0 },
          { name: 'Abr', receita: 0, qtdeTotal: 0 },
          { name: 'Maio', receita: 0, qtdeTotal: 0 },
          { name: 'Jun', receita: 0, qtdeTotal: 0 },
          { name: 'Jul', receita: 0, qtdeTotal: 0 },
          { name: 'Ago', receita: 0, qtdeTotal: 0 },
          { name: 'Set', receita: 0, qtdeTotal: 0 },
          { name: 'Out', receita: 0, qtdeTotal: 0 },
          { name: 'Nov', receita: 0, qtdeTotal: 0 },
          { name: 'Dez', receita: 0, qtdeTotal: 0 },
        ];
        setRaw(Number(response?.data[0].max_acc_valor));
        response.data.forEach(item => {
          const monthIndex = new Date(item.datas).getMonth(); 
          months[monthIndex] = {
            name: months[monthIndex].name,
            receita: item.acc_valor || 0,
            qtdeTotal: item.acc_qtde || 0,
          };
        });
        setVendasInfo(months);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchVendas();
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <ResponsiveContainer width={625} height={200}>
        <ComposedChart data={vendasInfo}>
          <XAxis dataKey="name" />  
          <YAxis domain={[0, raw]} tickCount={10} />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#ababab" />
          <Bar dataKey="qtdeTotal" barSize={20} fill="#413ea0" name="Quantidade vendida" />
          <Line type="monotone" dataKey="receita" stroke="#ff7300" name="Receita" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoTeste
