import React from 'react';

import classes from './Gear.module.scss';

export interface GearProps {
  className?: string;
  label: string;
  active: boolean;
}

const Gear: React.FC<GearProps> = ({ label, active }) => {
  return (
    <div
      className={`${classes.gear} ${classes[`gear${label}`]} ${
        active ? classes.gearActive : ''
      }`}
    >
      {label}
    </div>
  );
};

export default Gear;
