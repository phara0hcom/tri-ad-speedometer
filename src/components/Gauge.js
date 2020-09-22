import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import classes from './Gauge.module.scss';
import {
  barBgColor,
  barBlueColor,
  barGreenColor,
  electricSvgPath,
  gasSvgPath,
} from '../constants';

const Gauge = ({ width, height, fill, location, type }) => {
  const ref = useRef();
  const radius = Math.min(width, height) / 2;
  const xAxes = location.split('-')[1];

  const arc = d3
    .arc()
    .innerRadius(radius - 50)
    .outerRadius(radius - 38);

  useEffect(() => {
    // initialize Gauge
    const container = d3.select(ref.current);
    const meter = container.style('width', width).style('height', height);

    let transform = 'rotate(100)';
    let transformIcon = `translate(${width * 0.78}, ${height * 0.77} )`;

    switch (location) {
      case 'top-left':
        transform = 'rotate(104)';
        transformIcon = `translate(${width * 0.075}, ${height * 0.44} )`;
        break;

      case 'bottom-left':
        transform = 'rotate(53)';
        transformIcon = `translate(${width * 0.18}, ${height * 0.77} )`;
        break;

      case 'top-right':
        transform = 'rotate(-135)';
        transformIcon = `translate(${width * 0.886}, ${height * 0.44} )`;
        break;

      default:
        transform = 'rotate(-85)';
        transformIcon = `translate(${width * 0.78}, ${height * 0.77} )`;
        break;
    }

    const iconPath = type === 'electric' ? electricSvgPath : gasSvgPath;
    const iconScale = type === 'electric' ? 'scale(0.12)' : 'scale(0.08)';

    meter
      .append('g')
      .attr('class', `${type}Icon`)
      .attr('transform', `${transformIcon} ${iconScale}`)
      .append('path')
      .attr('fill', '#fff')
      .attr('d', iconPath);

    const bars = meter
      .append('g')
      .attr('class', `${type}_gaugeBars`)
      .attr('transform', `translate( ${width / 2}, ${width / 2}) ${transform}`);

    const newData = createData(fill);
    const pieData = returnPieData(newData);

    bars
      .selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('fill', (d) => {
        if (d.data.empty) return barBgColor;
        if (d.data.gap) return 'none';
        return type === 'electric' ? barBlueColor : barGreenColor;
      })
      .attr('d', arc);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const returnPieData = (data) => {
    return d3
      .pie()
      .value((d) => {
        return d.full || d.empty || d.gap;
      })
      .sort(null)
      .startAngle(Math.PI)
      .endAngle(Math.PI + 0.5513973285781058)(data);
  };

  const createData = (percentage) => {
    let dashes = 4;
    const factor = percentage / 25;
    const part = factor % 1;
    const data = [];

    for (let i = 0; i < factor - part; i++) {
      data.push({ full: 25 }, { gap: 2 });
      dashes--;
    }

    const partBar = 25 * part;
    if (part > 0) {
      data.push({ full: partBar }, { empty: 25 - partBar }, { gap: 2 });
      dashes--;
    }

    if (dashes > 0) {
      for (let j = dashes; j > 0; j--) {
        if (j === 1) {
          data.push({ empty: 25 });
        } else {
          data.push({ empty: 25 }, { gap: 2 });
        }
      }
    }
    if (xAxes === 'right') return data.reverse();
    return data;
  };

  return (
    <div className={classes[`gauge-${xAxes}`]} style={{ width, height }}>
      <svg ref={ref}></svg>
    </div>
  );
};

export default Gauge;
