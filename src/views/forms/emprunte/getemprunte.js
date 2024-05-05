import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CContainer, CListGroup, CListGroupItem } from '@coreui/react';

const DemandeListe = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getdemande');
        setDemandes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <CContainer>
      <h1>Liste des demandes d'emprunt</h1>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <CListGroup>
          {demandes.map((demande) => (
            <CListGroupItem key={demande._id}>
              <strong>Utilisateur :</strong> {demande.userId}<br />
              <strong>Livre :</strong> {demande.livreId}<br />
              <strong>Date de demande :</strong> {formatDate(demande.dateDemande)}
            </CListGroupItem>
          ))}
        </CListGroup>
      )}
    </CContainer>
  );
};

export default DemandeListe;
