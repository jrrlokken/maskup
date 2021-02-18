import { configure, mount } from 'enzyme';
import Adapter from '@hteker/enzyme-adapter-react-17';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import Pagination, { PAGINATION_QUERY } from '../components/Pagination';

configure({ adapter: new Adapter() });

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: { 
        data: {
          _allProductsMeta: {
            count: length
          }
        }
      }
    }
  ];
}

describe('<Pagination/>', () => {
  it('displays a loading message', () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    const pagination = wrapper.find('Pagination');
    expect(toJSON(pagination)).toMatchSnapshot();
    expect(pagination.text()).toContain('Loading...');
  });
  it('renders pagination for 18 items', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
    
      expect(wrapper.text()).toContain('18 Items Total');
      expect(wrapper.text()).toContain('Page 1 of 5');
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });
  it('disables prev button on first page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      const prevButton = wrapper.find('a').first();
      expect(prevButton.prop('aria-disabled')).toEqual(true);
    });
  });
  it('disables next button on last page', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={5} />
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      const nextButton = wrapper.find('a').at(1);
      expect(nextButton.prop('aria-disabled')).toEqual(true);
    });
  });
  it('enables both buttons on middle pages', async () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(18)}>
        <Pagination page={3} />
      </MockedProvider>
    );
    await act(async () => {
      await wait();
      wrapper.update();
      const prevButton = wrapper.find('a').at(0);
      const nextButton = wrapper.find('a').at(1);
      expect(prevButton.prop('aria-disabled')).toEqual(false);
      expect(nextButton.prop('aria-disabled')).toEqual(false);
    });
  })
});
