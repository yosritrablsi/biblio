import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react';
import Updateformation from './Updateformation'; // Assurez-vous d'importer le bon fichier

export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallformation');
        setFormations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    };
    fetchFormations();
  }, []);

  const handleDeleteFormation = async (formationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteformation/${formationId}`);
      setFormations(formations.filter((formation) => formation._id !== formationId));
      toast.success('Formation supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation :', error);
      toast.error('Erreur lors de la suppression de la formation');
    }
  };

  const openUpdateForm = (formationId) => {
    setShowUpdateForm(true);
    setSelectedFormationId(formationId);
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedFormationId(null);
  };

  return (
    <div>
      <ToastContainer />
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des formations</strong>
              </CCardHeader>
              <CCardBody>
                <Link to="/forms/Addformation" key="AddFormationLink"> 
                  <CButton color="primary"   style={{ margin: '9px' }}>
                    <FontAwesomeIcon icon={faPlus} /> Ajouter une formation
                  </CButton>
                </Link>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Date début</th>
                        <th>Date fin</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formations.map((formation, index) => (
                        <tr key={index}>
                          <td>{formation.titre}</td>
                          <td>{formation.date_debut}</td>
                          <td>{formation.date_fin}</td>
                          <td>{formation.description}</td>
                          <td>
                            <CButton onClick={() => handleDeleteFormation(formation._id)}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ marginRight: '10px' }}
                                title="Supprimer"
                              />
                            </CButton>
                            <Link to={`/forms/Updateformation/${formation._id}`} key={`editFormationLink${index}`}> {/* Ajout de la clé unique */}
                              <FontAwesomeIcon
                                icon={faPenSquare}
                                title="Modifier"
                              />
                            </Link>
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
      {showUpdateForm && (
        <Updateformation formationId={selectedFormationId} onClose={closeUpdateForm} />
      )}
      
    </div>
  );
}
