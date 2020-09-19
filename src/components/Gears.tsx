import React from 'react';

import Gear, { GearProps } from './Gear';

import classes from './Gears.module.scss';

interface GearsProps {
  gearArr: Array<GearProps>;
}

const Gears: React.FC<GearsProps> = (props) => {
  const { gearArr } = props;
  return (
    <div className={classes.gears}>
      {gearArr.map((el) => (
        <Gear {...el} />
      ))}
    </div>
  );
};

export default Gears;
