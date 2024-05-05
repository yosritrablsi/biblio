import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels'; // Importez le plugin

const PieChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/pourcentage-emprunts-par-role');
        setData(response.data.pourcentagesEmpruntsParRole);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    const ctx = document.getElementById('pieChart').getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Pourcentage d\'emprunts par rôle',
          data: Object.values(data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
            // Ajoutez d'autres couleurs si nécessaire
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            // Ajoutez d'autres couleurs si nécessaire
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          datalabels: {
            color: 'white',
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(0) + '%';
              return percentage;
            }
          }
        }
      }
    });
  }, [data]);

  return (
    <canvas id="pieChart" width="15" height="15"></canvas>
  );
};

export default PieChart;
