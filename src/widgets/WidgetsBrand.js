import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const MostDemandedBooksChart = () => {
  const [mostDemandedBooks, setMostDemandedBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/livres-les-plus-demandes');
        setMostDemandedBooks(response.data.livresLesPlusDemandes);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mostDemandedBooks.length === 0) return;

    const labels = mostDemandedBooks.map(book => book.titre); // Utiliser les titres des livres comme étiquettes
    const data = mostDemandedBooks.map(book => book.demandeCount);

    const ctx = document.getElementById('mostDemandedBooksChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre de demandes',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.4,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [mostDemandedBooks]);

  return (
    <canvas id="mostDemandedBooksChart" width="50" height="50"></canvas>
  );
};

export default MostDemandedBooksChart;
