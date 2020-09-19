import React from 'react';

import Gears from './components/Gears';

import classes from './App.module.scss';

function App() {
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
    </div>
  );
}

export default App;
