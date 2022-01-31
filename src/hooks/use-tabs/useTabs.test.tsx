import {act, renderHook} from '@testing-library/react-hooks';
import {useTabs} from './useTabs';
import {Tab} from '../../components/tabs/tabs';

describe('Hook useTabs', () => {
  it('should change activeTab when fire tabClickHandler', () => {
    const {result} = renderHook(useTabs);

    expect(result.current.activeTab).toBe(Tab.Characteristics);

    act(() => {
      result.current.tabClickHandler('test');
    });

    expect(result.current.activeTab).toBe('test');
  });
});

