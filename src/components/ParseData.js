import xml2js from 'xml2js';
import { useEffect, useState } from 'react';

import data from './data.xml';

const ParseData = ({ onDataParsed }) => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const parseXml = (xml) => {
      const parser = new xml2js.Parser();
      parser.parseString(xml, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
        } else {
          const Dpoints = getPoints(result);
          setDataPoints(Dpoints);
        }
      });
    };

    // Load the data.xml file using fetch API
    fetch(data)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(xml => {
        parseXml(xml);
      })
      .catch(error => {
        console.error('Error fetching data XML:', error);
      });
  }, []);

  const getPoints = (result) => {
    const dataSection = result['result']['dataSection'][0];
    const resElements = dataSection['res'];
    const lastRes = resElements[resElements.length - 1];
    const waveformContainer = lastRes['waveForm'][0]['waveformContainer'][0];
    const dataPoints = waveformContainer['rawWaveForm'][0]['dp'];
    return dataPoints.map(dp => ({
      x: Number(dp['$']['x']),
      y: Number(dp['$']['y']),
      source: 'data',
    }));
  };

  useEffect(() => {
    onDataParsed(dataPoints);
  }, [dataPoints, onDataParsed]);

  return null;
};

export default ParseData;
