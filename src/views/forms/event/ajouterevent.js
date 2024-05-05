import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
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
} from '@coreui/react'

export default function Ajouterevent() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    lieu: '',
    description: '',
    duree: '',
  });
  const [errors, setErrors] = useState(null); // Nouvel état pour stocker les erreurs

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/createevent', formData)
      console.log(response.data) // Log the response if needed
      toast.success('Événement ajouté avec succès') // Display success notification
      // Clear form after successful submission if needed
      setFormData({
        name: '',
        date: '',
        lieu: '',
        description: '',
        duree: '',
      })
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors(error.response.data.error); // Stocker les erreurs dans l'état
      }
    }
  }

  return (
    <CContainer>
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
                <strong>Créer un nouvel événement</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Nom de l'événement"
                    aria-label="Nom de l'événement"
                    type="text"
                    name="name"
                    value={formData.name}
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
                    placeholder="Durée"
                    aria-label="Durée"
                    type="text"
                    name="duree"
                    value={formData.duree}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CButton type="submit" color="primary" style={{ marginRight: '10px' }}>
                  Créer événement
                </CButton>
                <Link to="/forms/event">
                  <CButton color="secondary">Retour à la liste</CButton>
                </Link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
  )
}
