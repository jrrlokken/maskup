import formatMoney from '../lib/formatMoney';


describe('formatMoney function', () => {
  it('works with fractional amounts', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
  });
  it('includes cents for whole dollar amounts', () => {
    expect(formatMoney(100)).toEqual('$1.00');
    expect(formatMoney(10000)).toEqual('$100.00');
    expect(formatMoney(12345600)).toEqual('$123,456.00');
  });
  it('works with whole and fractional amounts', () => {
    expect(formatMoney(5012)).toEqual('$50.12');
    expect(formatMoney(101)).toEqual('$1.01');
    expect(formatMoney(110)).toEqual('$1.10');
    expect(formatMoney(23456423423422343)).toEqual('$234,564,234,234,223.44');
  });
});
