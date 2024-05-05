import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react';


const WidgetsDropdown = (props) => {
  const [empruntsCount, setempruntsCount] = useState(0);
  const [livreCount, setlivreCount] = useState(0);
  const [averageParticipationRate, setaverageParticipationRate] = useState(0);
  const [userParticipationRate, setuserParticipationRate] = useState(0);
  const [widgetColors, setWidgetColors] = useState({
    emprunts: 'primary',
    livre: 'info',
    event: 'warning',
    averageRate: 'danger'
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responseemprunts = await axios.get('http://localhost:8080/api/count-emprunts');
        setempruntsCount(responseemprunts.data.empruntCount);

        const responselivre = await axios.get('http://localhost:8080/api/count-livres-disponibles');
        setlivreCount(responselivre.data.livreCount);

        const responseEvent = await axios.get('http://localhost:8080/api/average-participation-rate');
        setaverageParticipationRate(responseEvent.data.averageParticipationRate);

        const responseAveragePart = await axios.get('http://localhost:8080/api/user-participation-rate');
        setuserParticipationRate(responseAveragePart.data.userParticipationRate.toFixed(2));  
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={3} xxl={3}>
        <CWidgetStatsA
          color={widgetColors.emprunts}
          value={<> {empruntsCount} <span className="fs-6 fw-normal">(demande_emprunte)</span> </>}
          title="Emprunts"
        />
      </CCol>
      <CCol sm={6} xl={3} xxl={3}>
        <CWidgetStatsA
          color={widgetColors.livre}
          value={<> {livreCount} <span className="fs-6 fw-normal">(livres disponibles)</span> </>}
          title="Livres Disponibles"
        />
      </CCol>
      <CCol sm={6} xl={3} xxl={3}>
        <CWidgetStatsA
          color={widgetColors.event}
          value={
            <>
              {averageParticipationRate}% <span className="fs-6 fw-normal"></span>
            </>
          }
          title="le taux moyen de demande "
        />
      </CCol>
      <CCol sm={6} xl={3} xxl={3}>
        <CWidgetStatsA
          color={widgetColors.averageRate}
          value={
            <>
              {userParticipationRate}% <span className="fs-6 fw-normal"></span>
            </>
          }
          title="Taux d'emprunte accepter  "
        />
      </CCol>
    </CRow>
  );
}

export default WidgetsDropdown;
