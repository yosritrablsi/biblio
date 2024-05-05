import React, { useState } from 'react'
import axios from 'axios'
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

export default function NewFormationForm() {
  const [formation, setFormation] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    formateurs: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormation({ ...formation, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/creatformation', formation)
      console.log(response.data) // Log the response if needed
      alert('Formation créée avec succès!')
      // Réinitialiser le formulaire après la création réussie
      setFormation({
        titre: '',
        description: '',
        date_debut: '',
        date_fin: '',
        formateurs: '',
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="6">
          <CCard className="mt-4">
            <CCardHeader>
              <strong>Créer une nouvelle formation</strong>
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Titre"
                    type="text"
                    name="titre"
                    value={formation.titre}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Description"
                    type="text"
                    name="description"
                    value={formation.description}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Date de début"
                    type="date"
                    name="date_debut"
                    value={formation.date_debut}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Date de fin"
                    type="date"
                    name="date_fin"
                    value={formation.date_fin}
                    onChange={handleChange}
                  />
                </CInputGroup>
                
                <CButton type="submit" color="primary">
                  Créer Formation
                </CButton>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
