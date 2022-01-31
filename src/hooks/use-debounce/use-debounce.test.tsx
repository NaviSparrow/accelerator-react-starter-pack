import {renderHook} from '@testing-library/react-hooks';
import useDebounce from './use-debounce';

describe('Hook useDebounce',  () => {
  it('should return string by the end of time out', async() => {
    const {result} = renderHook(() => useDebounce('test', 1000));

    expect(result.current).toBe('test');
  });
});
