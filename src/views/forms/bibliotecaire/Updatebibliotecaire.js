import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
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

export default function UpdateLivre() {
  const { id } = useParams()
  const [livreData, setLivreData] = useState({
    id: id,
    disponibilite: false,
    title: '',
    auteur: '',
    genre: '',
    anneePublication: '',
  })
  const [initialLivreData, setInitialLivreData] = useState({})

  useEffect(() => {
    const fetchLivre = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/getonebiblio/${id}`)
        setInitialLivreData(response.data)
        setLivreData({
          ...response.data,
          disponibilite: response.data.disponibilite ? "Disponible" : "Non disponible"
        })
      } catch (error) {
        console.error('Erreur lors de la récupération du livre :', error)
        toast.error('Erreur lors de la récupération du livre')
      }
    }
    fetchLivre()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLivreData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (JSON.stringify(livreData) === JSON.stringify(initialLivreData)) {
      toast.info('Aucune modification effectuée')
      return
    }
    try {
      await axios.put(`http://localhost:8080/api/updatebiblio/${id}`, {
        ...livreData,
        disponibilite: livreData.disponibilite === "Disponible" ? true : false
      })
      toast.success('Livre mis à jour avec succès')
    } catch (error) {
      console.error('Erreur lors de la mise à jour du livre :', error)
      toast.error('Erreur lors de la mise à jour du livre')
    }
  }

  return (
    <div>
      <ToastContainer/>
  
    <CContainer>
      <form onSubmit={handleSubmit}>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Mettre à jour un livre : {initialLivreData.titre}</strong>
              </CCardHeader>
              <CCardBody>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Titre"
                    aria-label="Titre"
                    type="text"
                    name="titre"
                    value={livreData.titre}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Auteur"
                    aria-label="Auteur"
                    type="text"
                    name="auteur"
                    value={livreData.auteur}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Genre"
                    aria-label="Genre"
                    type="text"
                    name="genre"
                    value={livreData.genre}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Année de publication"
                    aria-label="Année de publication"
                    type="text"
                    name="anneePublication"
                    value={livreData.anneePublication}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Disponibilité"
                    aria-label="Disponibilité"
                    type="text"
                    name="disponibilite"
                    value={livreData.disponibilite}
                    onChange={handleChange}
                  />
                </CInputGroup>
                <CButton type="submit" color="primary" style={{ margin: '10px' }}>
                  Mettre à jour
                </CButton>
                <Link to="/forms/bibliotecaire">Retourner à la liste des livres</Link>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </form>
    </CContainer>
    </div>
  )
}
