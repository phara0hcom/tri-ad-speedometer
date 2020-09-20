import React, { useState, useEffect } from 'react';

import Gears from './components/Gears';
import Speedometer from './components/Speedometer';

import classes from './App.module.scss';

let interval: number;

function App() {
  const [speed, setSpeed] = useState(0);
  const [accelerate, setAccelerate] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', keyPressDown);
    window.addEventListener('keyup', keyPressUp);

    return () => {
      window.removeEventListener('keydown', keyPressDown);
      window.removeEventListener('keyup', keyPressUp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accelerate) {
      if (speed === 0) setSpeed((prev) => prev + 1);
      interval = window.setInterval(() => {
        setSpeed((prev) => (prev + 1 <= 100 ? prev + 1 : 100));
        if (speed > 100 || speed <= 0) {
          clearInterval(interval);
        }
      }, 200);
    } else if (speed > 0) {
      interval = window.setInterval(() => {
        setSpeed((prev) => (prev - 1 > 0 ? prev - 1 : 0));
        if (speed > 100 || speed <= 0) {
          clearInterval(interval);
        }
      }, 200);
    }

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accelerate, speed]);

  const keyPressDown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === ' ') {
      setAccelerate(true);
    }
  };

  const keyPressUp = ({ key }: KeyboardEvent) => {
    if (key === ' ') {
      setAccelerate(false);
    }
  };

  return (
    <div className={classes.app}>
      <Gears
        gearArr={[
          { active: false, label: 'R' },
          { active: false, label: 'N' },
          { active: true, label: 'D' },
          { active: false, label: 'P' },
          { active: false, label: 'B' },
        ]}
      />
      <Speedometer width={500} height={500} speed={speed} />
    </div>
  );
}

export default App;
