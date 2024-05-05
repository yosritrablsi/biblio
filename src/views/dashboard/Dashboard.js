import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WidgetsDropdown from '../../widgets/WidgetsDropdown';
import PieChart from '../../widgets/Widgets';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import MostDemandedBooksChart from '../../widgets/WidgetsBrand';

const Dashboard = () => {
  const [empruntCount, setEmpruntCount] = useState(0);
  const [livreCount, setLivreCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empruntResponse = await axios.get('http://localhost:8080/api/count-emprunts');
        const livreResponse = await axios.get('http://localhost:8080/api/count-livres-disponibles');

        setEmpruntCount(empruntResponse.data.empruntCount);
        setLivreCount(livreResponse.data.livreCount);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow style={{ padding: '12px' }}>
            <CCol sm={12}>
              <h4 id="traffic" className="card-title mb-0">Suivi bibliothèque</h4>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={6}>
              <h7 id="traffic" className="card-title mb-3" style={{ paddingLeft: '50px', marginTop: '50px' }}>Les livres les plus demandés</h7>
              <div style={{ width: '70%', marginBottom: '50px', marginLeft: '50px' }}>
                <MostDemandedBooksChart />
              </div>
            </CCol>
            <CCol sm={6}>
              <h7 id="traffic" className="card-title mb-3" style={{ marginTop: '50px' }}>Taux de demande par rôle</h7>
              <div style={{ width: '60%', marginBottom: '50px', marginLeft: '50px' }}>
                <PieChart />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Dashboard;
