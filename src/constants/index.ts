import * as d3 from 'd3';

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

export const gradientArr = [
  {
    x1: '0',
    y1: '0',
    x2: '1',
    y2: '1',
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
    y2: '0',
    stop: [
      { offset: '0%', 'stop-color': '#CFE0F4', 'stop-opacity': '0.4' },
      { offset: '30%', 'stop-color': '#CFE0F4', 'stop-opacity': '0' },
      { offset: '100%', 'stop-color': '#CFE0F4', 'stop-opacity': '0' },
    ],
  },
];

export const gradientArcs = d3.pie()([10, 10]);
export const gradientArcsEnds: Array<number> = [];
export const gradientArcsEmpty = gradientArcs.map((el) => {
  gradientArcsEnds.push(el.endAngle);
  return { ...el, endAngle: el.startAngle };
});

export const electricBarBg = {
  data: { value: 69, label: 'electricBG' },
  endAngle: 2.792526803190927,
  index: 0,
  padAngle: 0,
  startAngle: 0,
  value: 69,
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
  maxMpH: 69,
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
