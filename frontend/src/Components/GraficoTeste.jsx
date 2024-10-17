import React, { useEffect,useState } from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import axios from 'axios';

function GraficoTeste() {
  const [vendasInfo, setVendasInfo] = useState({});
  const [raw, setRaw] = useState(null);
  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {
          funcao: 'pegarVendaAcumulada',
          senha: '@7h$Pz!q2X^vR1&K'
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
          const monthIndex = new Date(item.data).getMonth(); 
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
