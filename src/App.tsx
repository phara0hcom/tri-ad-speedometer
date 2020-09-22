import React, { useState, useEffect } from 'react';

import Gears from './components/Gears';
import Speedometer from './components/Speedometer';
import Gauge from './components/Gauge';

import { gearsArr, speedUnitStr, maxSpeedObj } from './constants';

import classes from './App.module.scss';

let interval: number;

function App() {
  const [gearPos, setGear] = useState('P');
  const [speed, setSpeed] = useState(0);
  const [gasPedal, setGasPedal] = useState(false);
  const [accelerating, setAccelerating] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', keyPressDown);
    window.addEventListener('keyup', keyPressUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', keyPressDown);
      window.removeEventListener('keyup', keyPressUp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const maxSpeedNum = maxSpeedObj[speedUnitStr][gearPos] || 0;
    if (gasPedal && (gearPos === 'D' || gearPos === 'R') && !accelerating) {
      setAccelerating(true);
      if (speed === 0) setSpeed((prev) => prev + 1);
      clearInterval(interval);
      interval = window.setInterval(() => {
        setSpeed((prev) => (prev + 1 <= maxSpeedNum ? prev + 1 : maxSpeedNum));
      }, 200);
    } else if (
      accelerating &&
      speed > 0 &&
      ((!gasPedal && (gearPos === 'D' || gearPos === 'R')) ||
        (gasPedal && gearPos !== 'D' && gearPos !== 'R'))
    ) {
      setAccelerating(false);
      clearInterval(interval);
      interval = window.setInterval(() => {
        setSpeed((prev) => (prev - 1 > 0 ? prev - 1 : 0));
      }, 150);
    }
  }, [gasPedal, speed, gearPos, accelerating]);

  const keyPressDown = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      event.preventDefault();
      setGasPedal(true);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setGear((prev) => {
        const index = gearsArr.indexOf(prev) - 1;
        if (index >= 0) {
          return gearsArr[index];
        }

        return prev;
      });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setGear((prev) => {
        const index = gearsArr.indexOf(prev) + 1;
        if (index < gearsArr.length) {
          return gearsArr[index];
        }

        return prev;
      });
    }
  };

  const keyPressUp = ({ key }: KeyboardEvent) => {
    if (key === ' ') {
      setGasPedal(false);
    }
  };

  return (
    <div className={classes.app}>
      <Gears
        location="left"
        gearArr={gearsArr.map((el) => ({ label: el, active: gearPos === el }))}
      />
      <Speedometer
        width={500}
        height={500}
        gears="left"
        accelerating={accelerating}
        speed={speed}
        units={speedUnitStr}
      />
      <Gauge
        width={500}
        height={500}
        fill={32}
        location="bottom-right"
        type="electric"
      />
      <Gauge
        width={500}
        height={500}
        fill={70}
        location="top-right"
        type="gas"
      />
    </div>
  );
}

export default App;
