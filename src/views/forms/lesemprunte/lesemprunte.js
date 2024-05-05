import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CContainer, CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react';

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

  const handleDeleteDemande = async (demandeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deletedemande/${demandeId}`);
      setDemandes(demandes.filter((demande) => demande._id !== demandeId));
      toast.success("Demande d'emprunt supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de la demande d'emprunt :", error);
      toast.error("Erreur lors de la suppression de la demande d'emprunt");
    }
  };

  const handleAcceptDemande = async (demandeId) => {
    try {
      await axios.post(`http://localhost:8080/api/accepterDemande/${demandeId}`);
      setDemandes(demandes.filter((demande) => demande._id !== demandeId));
      toast.success("Demande d'emprunt acceptée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'acceptation de la demande d'emprunt :", error);
      toast.error("Erreur lors de l'acceptation de la demande d'emprunt");
    }
  };

  return (
    <div>
      <ToastContainer />
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Liste des demandes d'emprunt</strong>
              </CCardHeader>
              <CCardBody>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Utilisateur</th>
                      <th>Livre</th>
                      <th>Date de demande</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {demandes.map((demande) => (
                    <tr key={demande._id}>
                    <td>{demande.userId ? demande.userId.username : 'Utilisateur inconnu'}</td>
                   <td>{demande.livreId? demande.livreId.titre:'liver inconnu'}</td>
                    <td>{new Date(demande.dateEmprunt).toLocaleDateString()}</td>
                  <td>
                <CButton onClick={() => handleAcceptDemande(demande._id)} color="success" className="mr-2">
                   Accepter
               </CButton>
                <CButton onClick={() => handleDeleteDemande(demande._id)} color="danger">
                Refuser
               </CButton>
        </td>
    </tr>
))}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default DemandeListe;
