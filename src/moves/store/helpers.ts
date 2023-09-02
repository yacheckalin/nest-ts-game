export const calculate = (val: number): number => {
  if (val % 3 === 0) {
    return val / 3;
  }
  if ((val - 1) % 3 === 0) {
    return (val - 1) / 3;
  }
  return (val + 1) / 3;
};
