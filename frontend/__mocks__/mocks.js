export default () => jest.mock('next/router', () => ({
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn()
  },
  beforePopState: jest.fn(() => null)
}));