import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import classes from './Gauge.module.scss';

const Gauge = ({ width, height, fill }) => {
  const ref = useRef(null);
  const radius = Math.min(width, height) / 2;

  const arc = d3
    .arc()
    .innerRadius(radius - 50)
    .outerRadius(radius - 30);

  useEffect(() => {
    // initialize Gauge
    const container = d3.select(ref.current);
    const meter = container.style('width', width).style('height', height);
    const bgBars = meter
      .append('g')
      .attr('class', 'bgBars')
      .attr(
        'transform',
        'translate(' + width / 2 + ',' + height / 2 + ') scale(-1, 1) rotate(2)'
      );

    // const bars = meter
    //   .append('g')
    //   .attr('class', 'valueBars')
    //   .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const color = d3.scaleOrdinal().range(['#424147', 'none']);

    const arcsTest = d3
      .pie()
      .startAngle(Math.PI + Math.PI / 4)
      .endAngle(Math.PI + Math.PI / 4 + 1.2023973285781058)
      .padAngle(0.01)([5, 5, 5, 5]);

    let startAngle = 0;
    let lastI = 0;
    const arcsBG = [];
    for (let i = 0; i < 4; i++) {
      arcsBG.push(
        {
          index: lastI,
          value: 5,
          startAngle: startAngle,
          endAngle: startAngle + 0.2855993321445265,
          data: 5,
        },
        {
          index: 1 + lastI,
          value: 1,
          startAngle: startAngle + 0.2855993321445265,
          endAngle: startAngle + 0.2855993321445265 + 0.015,
          data: 1,
        }
      );

      lastI += 2;
      startAngle = startAngle + 0.2855993321445265 + 0.015;
    }

    console.log({ arcsBG, arcsTest });

    // const arcs = [electricBar, gasBar];

    bgBars
      .selectAll('path')
      .data(arcsTest)
      .enter()
      .append('path')
      .attr('class', (d) => d.data.label)
      .attr('fill', (d) => color(1))
      .attr('d', arc);

    // bars
    //   .selectAll('path')
    //   .data(arcs)
    //   .enter()
    //   .append('path')
    //   .attr('class', (d) => d.data.label)
    //   .attr('fill', (d) => color(d.data.label))
    //   .attr('d', arc)
    //   .attr('transform', `rotate(229.5)`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fill >= 0 && fill <= 100) draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill]);

  const draw = () => {};

  return (
    <div className={classes.Gauge}>
      <svg ref={ref}></svg>
    </div>
  );
};

export default Gauge;
