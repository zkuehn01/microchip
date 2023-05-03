import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Graph = ({ points }) => {
  const svgRef = useRef();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 70, left: 70 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(points, d => parseFloat(d.x)))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(points, d => parseFloat(d.y)))
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(parseFloat(d.x)))
      .y(d => y(parseFloat(d.y)));

    const path = g.append('path')
      .datum(points)
      .attr('class', 'line')
      .attr('d', line)
      .style('stroke', 'steelblue')
      .style('stroke-width', '2px')
      .style('fill', 'none');

    const bisect = d3.bisector(d => parseFloat(d.x)).left;

    function findNearestPoint(mouseX) {
      const x0 = x.invert(mouseX);
      const i = bisect(points, x0, 1);
      const d0 = points[i - 1];
      const d1 = points[i];
      return x0 - parseFloat(d0.x) < parseFloat(d1.x) - x0 ? d0 : d1;
    }

    // Add a circle to represent the hovered point
    const focus = g.append('circle')
      .style('display', 'none')
      .attr('r', 4.5)
      .style('fill', 'none')
      .style('stroke', 'black');

      path
      .on('mousemove', function (event) {
        const [mouseX] = d3.pointer(event);
        const nearestPoint = findNearestPoint(mouseX);
    
        setTooltipPosition({ x: mouseX + margin.left, y: y(parseFloat(nearestPoint.y)) + margin.top });
        setTooltipData({ x: parseFloat(nearestPoint.x).toFixed(2), y: parseFloat(nearestPoint.y).toFixed(2) }); // Add toFixed(2) to limit decimal points
        setTooltipVisible(true);
    
        focus
          .style('display', null)
          .attr('cx', x(parseFloat(nearestPoint.x)))
          .attr('cy', y(parseFloat(nearestPoint.y)));
      })
      .on('mouseout', function () {
        setTooltipVisible(false);
        focus.style('display', 'none');
      });
    

  

    const xAxis = g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const yAxis = g.append('g')
      .call(d3.axisLeft(y));

    // Add x-axis label
    g.append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom / 2)
      .text('X-Axis Label');

    // Add y-axis label
    g.append('text')
      .attr('class', 'axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left / 2}, ${height / 2}) rotate(-90)`)
      .text('Y-Axis Label');

      g.insert('rect', ':first-child')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'transparent');
    


    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        const newX = event.transform.rescaleX(x);
        const newY = event.transform.rescaleY(y);

        const updatedLine = line
          .x(d => newX(parseFloat(d.x)))
          .y(d => newY(parseFloat(d.y)));

        path.attr('d', updatedLine);

        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));
      });

    svg.call(zoom);
  }, [points]);

  return (
    <div className="GraphContainer">
      <svg ref={svgRef}></svg>
      {tooltipVisible && (
        <div className="tooltip" style={{ left: tooltipPosition.x, top: tooltipPosition.y }}>
          <div>x-value: {tooltipData.x}</div>
          <div>y-value: {tooltipData.y}</div>
        </div>
      )}
    </div>
  );
  
  
  
};

export default Graph;