import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react';

export default function AddBookForm() {
  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    genre: '',
    anneePublication: '',
    disponibilite: 'true', // Initialisé à 'true' par défaut
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/createbiblio', formData);
      console.log(response.data);
      toast.success('Livre ajouté avec succès');
      setFormData({
        titre: '',
        auteur: '',
        genre: '',
        anneePublication: '',
        disponibilite: 'true', // Réinitialisé à 'true' après la soumission
      });
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error);
      }
    }
  };

  return (<div>
    <ToastContainer/>
    <CContainer>
      <form onSubmit={handleSubmit}>
        {errors && (
          <div className="alert alert-danger" role="alert">
            {errors}
          </div>
        )}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Ajouter un nouveau livre</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Titre du livre"
                    aria-label="Titre du livre"
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Auteur"
                    aria-label="Auteur"
                    type="text"
                    name="auteur"
                    value={formData.auteur}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Genre"
                    aria-label="Genre"
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Année de publication"
                    aria-label="Année de publication"
                    type="text"
                    name="anneePublication"
                    value={formData.anneePublication}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Disponibilité"
                    aria-label="Disponibilité"
                    type="text" // Champ de texte désactivé pour la disponibilité
                    name="disponibilite"
                    value={formData.disponibilite}
                    onChange={handleChange}
                    disabled // Champ désactivé
                  />
                </CInputGroup>
                <CButton type="submit" color="primary" style={{ marginRight: '10px' }}>
                  Ajouter le livre
                </CButton>
                <Link to="/forms/bibliotecaire">
                  <CButton color="secondary">Retour à la liste des livres</CButton>
                </Link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
    </div>
  );
}
