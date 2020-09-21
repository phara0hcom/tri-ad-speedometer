import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import classes from './Speedometer.module.scss';
import {
  electricBar,
  electricBarBg,
  gasBar,
  gasBarBg,
  gradientArcsEmpty,
  gradientArcsEnds,
  gradientArr,
} from '../constants';

const Speedometer = ({ width, height, speed, units, accelerating }) => {
  const ref = useRef(null);
  const size = Math.min(width, height);
  const fourth = size / 4;
  const half = size / 2;

  const arc = d3
    .arc()
    .innerRadius(fourth * 0.9)
    .outerRadius(fourth);

  const arcGradient = d3
    .arc()
    .innerRadius(fourth * 0.6)
    .outerRadius(fourth);

  const arc2 = d3
    .arc()
    .startAngle(gasBar.startAngle)
    .innerRadius(fourth * 0.9)
    .outerRadius(fourth);

  useEffect(() => {
    // initialize speedometer
    const container = d3.select(ref.current);

    const meter = container.style('width', width).style('height', height);

    const gradientBg = meter
      .append('g')
      .attr('class', 'gradientBg')
      .attr('transform', `translate(${half}, ${half + 30}) scale(1.9)`);

    const bgBars = meter
      .append('g')
      .attr('class', 'bgBars')
      .attr('transform', `translate(${half}, ${half + 30}) scale(1.9)`);

    const bars = meter
      .append('g')
      .attr('class', 'valueBars')
      .attr('transform', `translate(${half}, ${half + 30}) scale(1.9)`);

    gradientArr.forEach((el, i) => {
      const curEl = gradientBg
        .append('linearGradient')
        .attr('id', `linearGradient${i + 1}`)
        .attr('class', `linearGradients`)
        .attr('x1', el.x1)
        .attr('y1', el.y1)
        .attr('x2', el.x2)
        .attr('y2', el.y2);

      el.stop.forEach((stop) => {
        curEl
          .append('stop')
          .attr('offset', stop.offset)
          .attr('stop-color', stop['stop-color'])
          .attr('stop-opacity', stop['stop-opacity']);
      });
    });

    meter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('class', classes.speedCounter)
      .attr('dy', '0.5em')
      .attr('transform', `translate(${half}, ${half}) scale(1.9)`);

    meter
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('class', classes.speedUnit)
      .attr('dy', '3.3em')
      .text(units)
      .attr('transform', `translate(${half}, ${half}) scale(1.9)`);

    const color = d3.scaleOrdinal().range(['#424147']);

    const arcsBG = [electricBarBg, gasBarBg];
    const arcs = [electricBar, gasBar];

    gradientBg
      .selectAll('path')
      .data(gradientArcsEmpty)
      .enter()
      .append('path')
      .attr('class', (d) => `linearGradientPath${d.index}`)
      .attr('fill', (d) => `url(#linearGradient${d.index + 1}`)
      .attr('d', arcGradient)
      .attr('transform', `rotate(229.5)`);

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
    const transitionDuration = accelerating ? 200 : 150;
    const electricBarPath = d3.select('.electricBar');
    const gasBarPath = d3.select('.gasBar');
    const speedCounterText = d3.select(`.${classes.speedCounter}`);

    let color = d3.scaleOrdinal().range(['#CFE0F4']);

    let newElectricBar = { ...electricBar };
    let newGasBar = { ...gasBar };

    function arcTween(newAngle, pathArc) {
      return (d) => {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        return (t) => {
          d.endAngle = interpolate(t);
          return pathArc(d);
        };
      };
    }

    if (speed > electricBar.maxMpH) {
      // make the color yellow and
      color = d3.scaleOrdinal().range(['#FBFF59']);
      const gas100 = gasBar.maxMpH - electricBar.maxMpH;
      const gas100Angle = gasBarBg.endAngle - gasBar.startAngle;
      const addToGas = speed - electricBar.maxMpH;
      const fillPercentage = addToGas / gas100;
      const addToAngle = gas100Angle * fillPercentage;
      const endAngle = gasBar.startAngle + addToAngle;

      newElectricBar = {
        ...electricBarBg,
        index: 2,
        data: { value: 69, label: 'electricBar' },
      };

      newGasBar = { ...gasBar, endAngle };
    } else {
      const fillPercentage = speed / electricBar.maxMpH;
      const endAngle = electricBarBg.endAngle * fillPercentage;
      newElectricBar = { ...electricBar, endAngle };
    }

    if (speed > electricBar.maxMpH) {
      gasBarPath.attr('fill', (d) => color(d.data.label));
      electricBarPath.attr('fill', (d) => color(d.data.label));

      gasBarPath
        .transition()
        .ease(d3.easeLinear)
        .duration(transitionDuration)
        .attrTween('d', arcTween(newGasBar.endAngle, arc2));

      electricBarPath
        .transition()
        .ease(d3.easeLinear)
        .duration(transitionDuration)
        .attrTween('fill', function () {
          return d3.interpolateRgb(this.getAttribute('fill'), '#FBFF59');
        });
    } else {
      const gradientFilter = gradientArcsEnds.filter(
        (el) => newElectricBar.endAngle < el
      );
      const gradientPathIndex = gradientArcsEnds.length - gradientFilter.length;
      const gradientPath = d3.select(`.linearGradientPath${gradientPathIndex}`);

      gasBarPath
        .transition()
        .ease(d3.easeLinear)
        .duration(transitionDuration)
        .attrTween('d', arcTween(newGasBar.startAngle, arc2));
      electricBarPath.attr('fill', (d) => color(d.data.label));
      const electricBarPathTransition = electricBarPath
        .transition()
        .ease(d3.easeLinear)
        .duration(transitionDuration);

      electricBarPathTransition
        .attrTween('fill', function () {
          return d3.interpolateRgb(this.getAttribute('fill'), '#CFE0F4');
        })
        .attrTween('d', arcTween(newElectricBar.endAngle, arc));

      gradientPath
        .transition()
        .ease(d3.easeLinear)
        .duration(transitionDuration)
        .attrTween('d', arcTween(newElectricBar.endAngle, arcGradient));
    }

    speedCounterText.text(speed);
  };

  return (
    <div className={classes.speedometer}>
      <svg ref={ref}></svg>
    </div>
  );
};

export default Speedometer;
