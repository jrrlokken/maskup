import calcTotalPrice from '../lib/calcTotalPrice';
import { fakeCartItem } from '../lib/testUtils';

const cart1 = [
  fakeCartItem(),
  fakeCartItem(),
];

const cart2 = [
  { ...fakeCartItem(),
    quantity: 1
  },
  fakeCartItem()
];

describe('calcTotalPrice function', () => {
  it('calculates total price of cart items', () => {
    expect(calcTotalPrice(cart1)).toEqual(8994);
    expect(calcTotalPrice(cart2)).toEqual(5996);
  });
});
