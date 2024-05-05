import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Livre = () => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getbiblio');
        setLivres(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
        toast.error('Erreur lors de la récupération des livres');
      }
    };
    fetchLivres();
  }, []);

  const handleDeleteLivre = async (livreId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletebiblio/${livreId}`);
      setLivres(livres.filter((livre) => livre._id !== livreId));
      toast.success('Livre supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du livre :', error);
      toast.error('Erreur lors de la suppression du livre');
    }
  };

  const handleEmprunter = async (livreId) => {
    const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    const userId = utilisateur ? utilisateur.id : '';
    console.log(`userId: ${userId}, livreId: ${livreId}`);
    try {
      const response = await axios.post(`http://localhost:8080/api/demande-emprunt/${userId}/${livreId}`);
      toast.success('Demande d\'emprunt envoyée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande d\'emprunt :', error);
      if (error.response && error.response.status === 404) {
        toast.error('Le livre demandé n\'existe pas ou est indisponible');
      } else {
        toast.error('Erreur lors de l\'envoi de la demande d\'emprunt');
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des livres</strong>
              </CCardHeader>
              <Link to="/forms/Addbibliotecaire">
                <CButton type="submit" color="primary" style={{ margin: '12px', width: '120px' }}>
                  Ajouter +
                </CButton>
              </Link>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Genre</th>
                        <th>Année de publication</th>
                        <th>Disponibilité</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {livres.map((livre) => (
                        <tr key={livre._id}>
                          <td>{livre.titre}</td>
                          <td>{livre.auteur}</td>
                          <td>{livre.genre}</td>
                          <td>{livre.anneePublication}</td>
                          <td>{livre.disponibilite ? 'Disponible' : 'Non disponible'}</td>
                          <td>
                            <CButton onClick={() => handleDeleteLivre(livre._id)}>
                              <FontAwesomeIcon icon={faTrash} style={{ marginRight: '10px' }} />
                            </CButton>
                            <Link to={`/forms/Updatebibliotecaire/${livre._id}`}>
                              <FontAwesomeIcon icon={faPenSquare} />
                            </Link>
                            <CButton onClick={() => handleEmprunter(livre._id)}>
                              Emprunter
                            </CButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Livre;
