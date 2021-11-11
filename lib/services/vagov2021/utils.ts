import { absenteeData, absenteeKey } from './types';

const countBy = (arr: absenteeData[], key: absenteeKey): { [key: string]: number } =>
  arr.reduce((acc, item) => ({
    ...acc,
    [item[key]]: ~~acc[item[key]] + ~~item.count
  }), {})
;

export { countBy }
