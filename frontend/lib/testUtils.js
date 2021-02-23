import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const type = (wrapper, name, value) => {
  wrapper.find(`input[name='${name}']`).simulate('change', {
    target: { name, value }
  });
};

const fakeProduct = ({
  // __typename: 'Item',
  id: 'abc123',
  name: 'Test Product',
  description: 'This is a test product',
  price: 1499,
  photo: {
    altText: 'dog',
    image: {
      publicUrlTransformed: 'dog.jpg',
    },
  },
  user: null,
});

const fakeUser = overrides => ({
  // __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  orders: [],
  cart: [],
  ...overrides,
});

const fakeOrderItem = () => ({
  // __typename: 'OrderItem',
  id: casual.uuid,
  photo: {
    image: {
      publicUrlTransformed: `${casual.word}.jpg`
    }
  },
  name: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words(),
});

const fakeOrder = () => ({
  // __typename: 'Order',
  id: 'ord123',
  charge: 'ch_123',
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: '2022-12-11T20:16:13.797Z',
  user: fakeUser(),
});

const fakeCartItem = overrides => ({
  // __typename: 'CartItem',
  id: 'omg123',
  quantity: 3,
  product: fakeProduct,
  user: fakeUser(),
  ...overrides,
});


// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export {
  type,
  fakeProduct,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem,
  LocalStorageMock,
};