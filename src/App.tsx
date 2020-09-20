import React, { useState, useEffect } from 'react';

import Gears from './components/Gears';
import Speedometer from './components/Speedometer';

import classes from './App.module.scss';

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

  const keyPressDown = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === ' ') {
      setSpeed((prev) => prev + 1);
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
