import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Importez toast et react-toastify
import 'react-toastify/dist/ReactToastify.css';
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

export default function UpdateEventForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    name: '',
    description: '',
    date: '',
    lieu: '',
    duree:'',
  });
  const [initialEvent, setInitialEvent] = useState({});
  const [errors, setErrors] = useState(null); // Nouvel état pour stocker les erreurs

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getoneevenent/${id}`);
        setInitialEvent(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'événement :', error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(JSON.stringify(formData)===JSON.stringify(initialEvent)){
      toast.info('aucune modification');
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/updateevent/${id}`,
        formData
      );
      toast.success('Événement mis à jour avec succès'); // Affichage de la notification de succès
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement :', error);
    }
  };

  return (
    <CContainer xl>
      <form onSubmit={handleSubmit}>
      {errors && ( // Afficher les erreurs si elles existent
          <div className="alert alert-danger" role="alert">
            {errors}
          </div>
        )}
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Mettre à jour un événement: {initialEvent.title}</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="name"
                    aria-label="Titre"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Description"
                    aria-label="Description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Date"
                    aria-label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Lieu"
                    aria-label="Lieu"
                    type="text"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="duree"
                    aria-label="duree"
                    type="text"
                    name="duree"
                    value={formData.duree}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CButton type="submit" color="primary" style={{"margin":"12px"}}>
                  Mettre à jour
                </CButton>
                <Link to="/forms/event">Retourner à la liste des événements</Link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
  );
}
