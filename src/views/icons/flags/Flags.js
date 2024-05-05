import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'

export default function UpdateFormation() {
  const [formations, setFormations] = useState([])

  useEffect(() => {
    fetchFormations()
  }, [])

  const fetchFormations = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/getallformation')
      setFormations(response.data)
    } catch (error) {
      console.error('Error fetching formations:', error)
    }
  }

  const handleDeleteFormation = async (formationId) => {
    try {
      await axios.delete(`http://localhost:7000/api/deleteformation/${formationId}`)
      setFormations(formations.filter((formation) => formation._id !== formationId))
      console.log('Formation deleted successfully')
    } catch (error) {
      console.error('Error deleting formation:', error)
    }
  }

  return (
    <CContainer>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Liste des formations</strong>
            </CCardHeader>
            <CCardBody>
              {formations.map((formation, index) => (
                <div key={index}>
                  <p>Titre: {formation.titre}</p>
                  <p>Description: {formation.description}</p>
                  <p>Date de début: {formation.date_debut}</p>
                  <p>Date de fin: {formation.date_fin}</p>
                  <p>Formateurs: {formation.formateurs}</p>
                  <CButton color="danger" onClick={() => handleDeleteFormation(formation._id)}>
                    Supprimer
                  </CButton>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
