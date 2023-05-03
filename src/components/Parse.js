import xml2js from 'xml2js';
import { useEffect, useState } from 'react';

import waveform from './waveform.xml';
/*
This code is a React component that parses an XML file called "waveform.xml" and extracts specific data points from it. 
It uses the xml2js library to convert the XML data into a JavaScript object and then retrieves the desired data points from it. 
The component fetches the XML file using the fetch API and stores the parsed data points in the component state using the useState hook.
It also calls a callback function, "onPointsParsed", with the parsed data points whenever they are updated. 
The component does not have any visual output and returns null.
*/
const Parse = ({ onPointsParsed }) => {
  const [waveformPoints, setWaveformPoints] = useState([]);

  useEffect(() => {
    const parseXml = (xml) => {
      const parser = new xml2js.Parser();
      parser.parseString(xml, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
        } else {
          const points = getPoints(result);
          setWaveformPoints(points);
        }
      });
    };

    // Load the waveform.xml file using fetch API
    fetch(waveform)
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
        console.error('Error fetching waveform XML:', error);
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
      source: 'waveform',
    }));
  };

  useEffect(() => {
    onPointsParsed(waveformPoints);
  }, [waveformPoints, onPointsParsed]);

  return null;
};

export default Parse;
