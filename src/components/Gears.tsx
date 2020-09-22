import React from 'react';

import Gear from './Gear';

import classes from './Gears.module.scss';

interface GearsProps {
  gearArr: Array<{ label: string; active: boolean }>;
  location: 'left' | 'right';
}

const Gears: React.FC<GearsProps> = ({ gearArr, location }) => {
  const isRight = location === 'left' ? false : true;
  return (
    <div className={classes[`gears${location === 'left' ? '' : 'Right'}`]}>
      {gearArr.map((el, i) => (
        <Gear key={`gear_${el.label}${i + 1}`} {...el} isRight={isRight} />
      ))}
    </div>
  );
};

export default Gears;
