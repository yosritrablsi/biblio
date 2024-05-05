import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';

export default function UpdateEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getevent');
        setEvents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteevent/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
      toast.success('Événement supprimé avec succès'); 
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
      toast.error('Erreur lors de la suppression de l\'événement');
    }
  }

  return (
    <div>
      <ToastContainer /> 
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Liste des événements</strong>
              </CCardHeader>
              <Link  to={"/forms/Ajouterevent"}>
              <CButton type="submit" color="primary" style={{ margin: '12px', width: '120px' }}>
                ajouter + </CButton> </Link>                
              <CCardBody>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Date</th>
                        <th>Lieu</th>
                        <th>Description</th>
                        <th>Durée</th>
                        <th>Actions</th> 
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event, index) => (
                        <tr key={index}>
                          <td>{event.name}</td>
                          <td>{event.date}</td>
                          <td>{event.lieu}</td>
                          <td>{event.description}</td>
                          <td>{event.duree}</td>
                          <td>
                            <CButton onClick={() => handleDeleteEvent(event._id)}>
                              <FontAwesomeIcon 
                                icon={faTrash} 
                                style={{ marginRight: '10px' }} 
                                title="Supprimer" 
                              />
                            </CButton>
                            <Link to={`/forms/UpdateEventForm/${event._id}`}>
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
    </div>
  );
}
