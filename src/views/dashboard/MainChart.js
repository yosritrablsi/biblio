import React from 'react';
import { Line } from 'react-chartjs-2';

const MainChart = ({ livreCount, empruntCount, empruntAccepteCount }) => {
  const data = {
    labels: ['Livre disponibles', 'Demandes empruntées', 'Demandes acceptées'],
    datasets: [
      {
        label: 'Quantité',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [livreCount, empruntCount, empruntAccepteCount],
      },
    ],
  };

  return (
    <div>
      <h2>Main Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default MainChart;
