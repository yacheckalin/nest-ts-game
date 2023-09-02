import { calculate } from './helpers';

describe('calculate logic', () => {
  it('should return 1', () => {
    expect(calculate(3)).toEqual(1);
  });

  it('should use +1 before devide', () => {
    expect(calculate(26)).toEqual(9);
  });

  it('should use -1 before devide', () => {
    expect(calculate(25)).toEqual(8);
  });

  it('should return value devided by 3', () => {
    expect(calculate(9)).toEqual(3);
  });

  it('should return zero', () => {
    expect(calculate(0)).toEqual(0);
  });
});
