import React, { useState } from 'react';

const LineInfo = () => {
  const [ipValue, setIpValue] = useState(null);
  const [trValue, setTrValue] = useState(null);
  const [fwhmValue, setFwhmValue] = useState(null);
  const [ip2Value, setIp2Value] = useState(null);

  const handleIpChange = (event) => {
    if (event.target.checked) {
      setIpValue(7.823);
    } else {
      setIpValue(null);
    }
  };

  const handleTrChange = (event) => {
    if (event.target.checked) {
      setTrValue(10);
    } else {
      setTrValue(null);
    }
  };

  const handleFwhmChange = (event) => {
    if (event.target.checked) {
      setFwhmValue(1.753);
    } else {
      setFwhmValue(null);
    }
  };

  const handleIp2Change = (event) => {
    if (event.target.checked) {
      setIp2Value(-1.502);
    } else {
      setIp2Value(null);
    }
  };

  return (
    <div className="LineInfo-container">
      <div className="LineInfo-title">Positive Data</div>
      <hr />
      <div className="LineInfo-column">
        <div className="LineInfo-label">
          <input type="checkbox" onChange={handleIpChange} />
          <label>IP (A)</label>
          {ipValue !== null && <span>{ipValue}</span>}
        </div>
        <div className="LineInfo-label">
          <input type="checkbox" onChange={handleTrChange} />
          <label>Tr (sP)</label>
          {trValue !== null && <span>{trValue}</span>}
        </div>
        <div className="LineInfo-label">
          <input type="checkbox" onChange={handleFwhmChange} />
          <label>FWHM (sP)</label>
          {fwhmValue !== null && <span>{fwhmValue}</span>}
        </div>
        <div className="LineInfo-label">
          <input type="checkbox" onChange={handleIp2Change} />
          <label>Ip2 (%)</label>
          {ip2Value !== null && <span>{ip2Value}</span>}
        </div>
      </div>
    </div>
  );
};

export default LineInfo;
