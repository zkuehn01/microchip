import React from 'react';

const Legend = () => {
  return (
    <div className="legend-container">
      <div className="legend-title">CDM::JS-002::Small Targer(6.8pF;6GHz)</div>
      <hr />
      <div className="legend-row">
        <div className="legend-label">IP [2.24≤ v ≤3.68 ] (A)</div>
      </div>
      <div className="legend-row">
        <div className="legend-label">Tr [0≤ v ≤250] (sP)</div>
      </div>
      <div className="legend-row">
        <div className="legend-label">FWHM [250≤ v ≤600] (sP)</div>
      </div>
      <div className="legend-row">
        <div className="legend-label">Ip2 [≤70] (%)</div>
      </div>
    </div>
  );
};

export default Legend;
