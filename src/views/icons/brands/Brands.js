import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function UpdateFormation() {
  const { id } = useParams()

  const [formationData, setFormationData] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    formateurs: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormationData({
      ...formationData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:7000/api/updateformation/${id}`, formationData)
      console.log('Formation updated successfully')
    } catch (error) {
      console.error('Error updating formation:', error)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Modifier la Formation</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Titre:</label>
          <input
            type="text"
            name="titre"
            value={formationData.titre}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <input
            type="text"
            name="description"
            value={formationData.description}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date de début:</label>
          <input
            type="date"
            name="date_debut"
            value={formationData.date_debut}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date de fin:</label>
          <input
            type="date"
            name="date_fin"
            value={formationData.date_fin}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Formateurs:</label>
          <input
            type="text"
            name="formateurs"
            value={formationData.formateurs}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Modifier la Formation
        </button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    width: '100%',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
}
