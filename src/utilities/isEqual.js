export const isObjectsEqual = (objFirst, objSecond) => (typeof objFirst === 'object' && Object.keys(objFirst).length > 0
  ? Object.keys(objFirst).length === Object.keys(objSecond).length
  && Object.keys(objFirst).every((key) => isObjectsEqual(objFirst[key], objSecond[key]))
  : objFirst === objSecond);

export const isArraysOfObjectsEqual = (arrFirst, arrSecond) => arrFirst.length === arrSecond.length
  && arrFirst.every((element, index) => isObjectsEqual(element, arrSecond[index]));
