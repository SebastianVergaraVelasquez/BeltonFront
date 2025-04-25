import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2'];

export default function Dashboard() {
  const [salesData, setSalesData] = useState([]);
  const [membershipData, setMembershipData] = useState([]);

  useEffect(() => {
    fetchSalesData();
    fetchMembershipData();
  }, []);

  const fetchSalesData = async () => {
    const res = await fetch('http://localhost:8080/belton/sales');
    const sales = await res.json();

    const grouped = sales.reduce((acc, sale) => {
      const date = new Date(sale.date);
      const month = date.toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + sale.total;
      return acc;
    }, {});

    const formatted = Object.entries(grouped).map(([month, total]) => ({ month, total }));
    setSalesData(formatted);
  };

  const fetchMembershipData = async () => {
    const res = await fetch('http://localhost:8080/belton/membership');
    const memberships = await res.json();

    const grouped = memberships.reduce((acc, m) => {
      const type = m.membershipType?.name || 'Desconocido';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const formatted = Object.entries(grouped).map(([type, value]) => ({ type, value }));
    setMembershipData(formatted);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <h5>Ventas por Mes</h5>
          <BarChart width={400} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="col-md-6">
          <h5>Tipos de Membresías</h5>
          <PieChart width={400} height={300}>
            <Pie
              data={membershipData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ type, value }) => `${type} (${value})`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {membershipData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
