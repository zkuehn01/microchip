import React, { useState } from 'react';
import NavBar from './components/layout/NavBar';
import Parse from './components/Parse';
import Graph from './components/Graph';
import SidePanel from './components/layout/SidePanel';
import Legend from './components/layout/Legend';
import './App.css';
import ParseData from './components/ParseData';
import LineInfo from './components/layout/LineInfo';

function App() {
  const [waveformPoints, setWaveformPoints] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);

  const handlePointsParsed = (points) => {
    setWaveformPoints(points);
  };

  const handleToggleLine = (isChecked) => {
    if (isChecked) {
      setSelectedData(waveformPoints);
    } else {
      setSelectedData(null);
    }
  };

  const handleDataPointsParsed = (points) => {
    setDataPoints(points);
  };

  const handleExport = (content, title) => {
    const filename = `${title}.json`;

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="App">
      <NavBar title="Senior Project By: Gabriel Anaya, Zachary Kuehn, Aaron Orozco, Daniel White, Jane Perez, Ivana Mayberry, Johnathan Valdez" />
      <div className="main-container">
        <SidePanel data={waveformPoints} selectedData={selectedData} onToggleLine={handleToggleLine} onExport={handleExport} />
        <div className="graph-container">
          <Graph waveformPoints={waveformPoints} dataPoints={dataPoints} />
        </div>
        <div className='Legend'>
            <Legend />
        </div>
        <div className='LineInfo'> 
          <LineInfo/>
        </div>
      </div>
      <Parse onPointsParsed={handlePointsParsed} />
      <ParseData onDataParsed={handleDataPointsParsed} />
    </div>
  );
}

export default App;
