import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import classes from './Speedometer.module.scss';

const electricBarBg = {
  data: { value: 69, label: 'electricBG' },
  endAngle: 2.792526803190927,
  index: 0,
  padAngle: 0,
  startAngle: 0,
  value: 69,
};

const gasBarBg = {
  data: { value: 31, label: 'gasBG' },
  endAngle: 4.5553093477052,
  index: 1,
  maxMpH: 100,
  padAngle: 0,
  startAngle: 2.8099800957108703,
  value: 31,
};

const electricBar = {
  data: { value: 0, label: 'electricBar' },
  endAngle: 0,
  index: 2,
  maxMpH: 69,
  padAngle: 0,
  startAngle: 0,
  value: 0,
};

const gasBar = {
  data: { value: 0, label: 'gasBar' },
  endAngle: 2.8099800957108703,
  index: 3,
  maxMpH: 100,
  padAngle: 0,
  startAngle: 2.8099800957108703,
  value: 0,
};

const Speedometer = ({ width, height, speed }) => {
  const ref = useRef(null);
  const size = 500;
  const fourth = size / 4;
  const half = size / 2;

  const arc = d3
    .arc()
    .innerRadius(fourth * 0.9)
    .outerRadius(fourth);

  const arc2 = d3
    .arc()
    .startAngle(gasBar.startAngle)
    .innerRadius(fourth * 0.9)
    .outerRadius(fourth);

  useEffect(() => {
    // initialize speedometer
    const container = d3.select(ref.current);

    const chart = container.style('width', width).style('height', height);

    const bgBars = chart
      .append('g')
      .attr('class', 'bgBars')
      .attr('transform', `translate(${half}, ${half + 30}) scale(1.9)`);

    const bars = chart
      .append('g')
      .attr('class', 'valueBars')
      .attr('transform', `translate(${half}, ${half + 30}) scale(1.9)`);

    const color = d3.scaleOrdinal().range(['#424147']);

    const arcsBG = [electricBarBg, gasBarBg];
    const arcs = [electricBar, gasBar];

    bgBars
      .selectAll('path')
      .data(arcsBG)
      .enter()
      .append('path')
      .attr('class', (d) => d.data.label)
      .attr('fill', (d) => color(d.data.label))
      .attr('d', arc)
      .attr('transform', `rotate(229.5)`);

    bars
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('class', (d) => d.data.label)
      .attr('fill', (d) => color(d.data.label))
      .attr('d', arc)
      .attr('transform', `rotate(229.5)`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (speed >= 0 && speed <= 100) draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  const draw = () => {
    const electricBarPath = d3.select('.electricBar');
    const gasBarPath = d3.select('.gasBar');
    let fillPercentage = 0;

    let color = d3.scaleOrdinal().range(['#CFE0F4']);

    let newElectricBar = { ...electricBar };
    let newGasBar = { ...gasBar };

    if (speed > electricBar.maxMpH) {
      // make the color yellow and
      color = d3.scaleOrdinal().range(['#FBFF59']);
      const gas100 = gasBar.maxMpH - electricBar.maxMpH;
      const gas100Angle = gasBarBg.endAngle - gasBar.startAngle;
      const addToGas = speed - electricBar.maxMpH;
      fillPercentage = addToGas / gas100;
      const addToAngle = gas100Angle * fillPercentage;
      const endAngle = gasBar.startAngle + addToAngle;

      newElectricBar = {
        ...electricBarBg,
        index: 2,
        data: { value: 69, label: 'electricBar' },
      };

      newGasBar = { ...gasBar, endAngle };
    } else {
      fillPercentage = speed / electricBar.maxMpH;
      const endAngle = electricBarBg.endAngle * fillPercentage;
      newElectricBar = { ...electricBar, endAngle };
    }

    if (speed > electricBar.maxMpH) {
      gasBarPath.attr('fill', (d) => color(d.data.label));
      electricBarPath.attr('fill', (d) => color(d.data.label));
      gasBarPath
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .attrTween('d', arcTween(newGasBar.endAngle, arc2));
    } else {
      gasBarPath
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .attrTween('d', arcTween(newGasBar.startAngle, arc2));
      electricBarPath.attr('fill', (d) => color(d.data.label));
      electricBarPath
        .transition()
        .ease(d3.easeLinear)
        .duration(200)
        .attrTween('d', arcTween(newElectricBar.endAngle, arc));
    }

    function arcTween(newAngle, pathArc) {
      return (d) => {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return (t) => {
          d.endAngle = interpolate(t);
          return pathArc(d);
        };
      };
    }
  };

  return (
    <div className={classes.speedometer}>
      <svg ref={ref}></svg>
    </div>
  );
};

export default Speedometer;
