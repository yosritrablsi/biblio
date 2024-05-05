import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmprunterPage = ({ livreId }) => {
  const [loading, setLoading] = useState(false);

  const handleEmprunter = async () => {
    setLoading(true);

    try {
      // Récupérer l'utilisateur depuis le local storage
      const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
      if (!utilisateur || !utilisateur.userId) {
        console.error('Utilisateur non trouvé dans le stockage local');
        toast.error('Impossible d\'effectuer l\'emprunt. Veuillez vous connecter.');
        return;
      }
       const userId=utilisateur.userId;
      // Envoyer la demande d'emprunt au backend
      const response = await axios.post(`http://localhost:8080/api/demande-emprunt/${userId}/${livreId}`);
      console.log('Demande d\'emprunt réussie :', response.data);
      toast.success('Demande d\'emprunt envoyée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande d\'emprunt :', error);
      if (error.response && error.response.status === 404) {
        toast.error('Le livre demandé n\'existe pas ou est indisponible');
      } else {
        toast.error('Erreur lors de l\'envoi de la demande d\'emprunt');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <button onClick={handleEmprunter} disabled={loading}>
        {loading ? 'En cours...' : 'Emprunter'}
      </button>
    </div>
  );
};

export default EmprunterPage;
