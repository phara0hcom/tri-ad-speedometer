import React from 'react';

import classes from './Gear.module.scss';

interface GearProps {
  label: string;
  active: boolean;
  isRight: boolean;
}

const Gear: React.FC<GearProps> = ({ label, active, isRight }) => {
  console.log(`gear${label}${isRight ? '_Right' : ''}`);
  return (
    <div
      className={`${classes.gear} ${
        classes[`gear${label}${isRight ? '_Right' : ''}`]
      } ${active ? classes.gearActive : ''}`}
    >
      {label}
    </div>
  );
};

export default Gear;
