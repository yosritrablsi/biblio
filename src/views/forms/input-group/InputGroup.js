import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';

const EmpruntsAcceptes = () => {
  const [empruntsAcceptes, setEmpruntsAcceptes] = useState([]);

  useEffect(() => {
    const fetchEmpruntsAcceptes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/emprunts-acceptes');
        setEmpruntsAcceptes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des emprunts acceptés :', error);
        toast.error('Erreur lors de la récupération des emprunts acceptés');
      }
    };
    fetchEmpruntsAcceptes();
  }, []);

  const handleRetournerLivre = async (livreId) => {
    try {
      await axios.put(`http://localhost:8080/api/retourner/${livreId}`);
      // Rafraîchir la liste des emprunts acceptés après le retour du livre
      const updatedEmprunts = empruntsAcceptes.filter(emprunt => emprunt.livreId && emprunt.livreId._id !== livreId);
      setEmpruntsAcceptes(updatedEmprunts);
      toast.success('Livre retourné avec succès');
    } catch (error) {
      console.error('Erreur lors du retour du livre :', error);
      toast.error('Erreur lors du retour du livre');
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
                <strong>Liste des emprunts acceptés</strong>
              </CCardHeader>
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Utilisateur</th>
                        <th>Livre</th>
                        <th>Date d'emprunt</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empruntsAcceptes.map((emprunt, index) => (
                        <tr key={index}>
                          <td>{emprunt.userId ? emprunt.userId.username : 'Utilisateur inconnu'}</td>
                          <td>{emprunt.livreId ? emprunt.livreId.titre : 'Livre inconnu'}</td>
                          <td>{emprunt.dateEmprunt}</td>
                          <td>
                            <CButton onClick={() => emprunt.livreId && handleRetournerLivre(emprunt.livreId._id)}>
                              <FontAwesomeIcon icon={faUndo} style={{ marginRight: '10px' }} title="Retourner le livre" />
                              Retourner le livre
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
}

export default EmpruntsAcceptes;
