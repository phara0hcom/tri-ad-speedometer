import * as d3 from 'd3';

export const barBgColor = '#424147';
export const barBlueColor = '#CFE0F4';
export const barGreenColor = '#6EBBB9';
export const barYellowColor = '#FBFF59';

export const gasSvgPath = `M134.475,8.551c-6.8-11.6-14-11.2-20.8,0c-31.2,46.4-78.4,116-78.4,150.8c0,24.4,10,46.8,26,62.8s38.4,26,62.8,26
c24.4,0,46.8-10,62.8-26s26-38.4,26-62.8C212.875,124.151,165.675,54.951,134.475,8.551z M188.075,198.951
c-6.4,10.4-15.6,19.6-26.8,26c-5.2,2.8-11.6,1.2-14.4-4c-3.2-5.6-1.2-12,4-14.8c8-4.4,14.4-10.8,19.2-18.4
c4.8-7.6,7.6-16.4,8-25.6c0.4-6,5.2-10.4,11.2-10c6,0.4,10.4,5.2,10,11.2C198.475,176.151,194.475,188.151,188.075,198.951z`;

export const electricSvgPath = `m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z`;

export const leafSvgPath = `M15.787 7.531c-5.107 2.785-12.72 9.177-15.787 15.469h2.939c.819-2.021 2.522-4.536 3.851-5.902 8.386 3.747 17.21-2.775 17.21-11.343 0-1.535-.302-3.136-.92-4.755-2.347 3.119-5.647 1.052-10.851 1.625-7.657.844-11.162 6.797-8.764 11.54 3.506-3.415 9.523-6.38 12.322-6.634z`;

export const gearsArr = ['R', 'N', 'D', 'P', 'B'];
export const maxSpeedObj: {
  [key: string]: {
    [key: string]: number;
  };
} = {
  MPH: { D: 100, R: 20 },
  KPH: { D: 160, R: 32 },
};

export const speedUnitStr = 'MPH';
export const fuelEffUnitObj = { MPH: 'MPG', KPH: 'KPL' };

export const gradientArr = [
  {
    x1: '0',
    y1: '0',
    x2: '1',
    y2: '0.5',
    stop: [
      { offset: '0%', 'stop-color': '#CFE0F4', 'stop-opacity': '0' },
      { offset: '30%', 'stop-color': '#CFE0F4', 'stop-opacity': '0' },
      { offset: '100%', 'stop-color': '#CFE0F4', 'stop-opacity': '0.4' },
    ],
  },
  {
    x1: '1',
    y1: '1',
    x2: '0',
    y2: '0.5',
    stop: [],
  },
];

export const gradientArcs = d3.pie()([10, 10]);
export const gradientArcsEnds: Array<number> = [];
export const gradientArcsEmpty = gradientArcs.map((el) => {
  gradientArcsEnds.push(el.endAngle);
  return { ...el, endAngle: el.startAngle };
});

export const electricBarBg = {
  data: { value: 65, label: 'electricBG' },
  endAngle: 2.792526803190927,
  index: 0,
  padAngle: 0,
  startAngle: 0,
  value: 65,
};

export const gasBarBg = {
  data: { value: 31, label: 'gasBG' },
  endAngle: 4.5553093477052,
  index: 1,
  maxMpH: 100,
  padAngle: 0,
  startAngle: 2.8099800957108703,
  value: 31,
};

export const electricBar = {
  data: { value: 0, label: 'electricBar' },
  endAngle: 0,
  index: 2,
  maxMpH: 65,
  padAngle: 0,
  startAngle: 0,
  value: 0,
};

export const gasBar = {
  data: { value: 0, label: 'gasBar' },
  endAngle: 2.8099800957108703,
  index: 3,
  maxMpH: 100,
  padAngle: 0,
  startAngle: 2.8099800957108703,
  value: 0,
};
