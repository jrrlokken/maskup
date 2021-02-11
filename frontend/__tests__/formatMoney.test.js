import formatMoney from '../lib/formatMoney';

describe('formatMoney function', () => {
  it('works with fractional amounts', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(45)).toEqual('$0.45');
    
  });

  it('includes cents for whole dollars', () => {
    expect(formatMoney(100)).toEqual('$1.00');
    expect(formatMoney(1000)).toEqual('$10.00')
    expect(formatMoney(50000)).toEqual('$500.00');
    expect(formatMoney(1000000)).toEqual('$10,000.00');
  })

  it('correctly formats whole and fractional amounts', () => {
    expect(formatMoney(9913)).toEqual('$99.13');
    expect(formatMoney(101)).toEqual('$1.01');
  })
});
