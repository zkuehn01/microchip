import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-moment';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

const Graph = ({ waveformPoints, dataPoints }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Parse the waveform and data points
    const parsedWaveformPoints = waveformPoints.map(point => {
      return {
        x: parseFloat(point.x),
        y: parseFloat(point.y),
      };
    });
    const parsedDataPoints = dataPoints.map(point => {
      return {
        x: parseFloat(point.x),
        y: parseFloat(point.y),
      };
    });

    // Create the waveform dataset
    const waveformDataset = {
      label: "Positive Data",
      data: parsedWaveformPoints,
      borderColor: 'steelblue',
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
    };

    // Create the data points dataset
    const dataDataset = {
      label: "Negative Data",
      data: parsedDataPoints,
      borderColor: 'orange',
      backgroundColor: 'transparent',
      borderWidth: 2,
      pointRadius: 0,
    };

    // Destroy the previous chart instance, if there is one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance and store it in the ref for later use
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [waveformDataset, dataDataset], // Add both datasets
      },
      options: {
        animation: {
          duration: 0, // Disable animation
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Time (nS)',
            },
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Current (A)',
            },
            beforeDataLimits: (scale) => {
              scale.min = 0;
            },
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            },
            pan: {
              enabled: true,
              mode: 'xy',
              speed: 10,
              threshold: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const { parsed } = context; // use parsed property instead of raw
                return `x-value: ${parsed.x.toFixed(2)}, y-value: ${parsed.y.toFixed(2)}`;
              },
            },
          },
        },
      },
      plugins: [zoomPlugin], // Add zoom plugin instance
    });

  }, [waveformPoints, dataPoints]);

  return (
    <div className="GraphContainer">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default Graph;
