import {renderHook} from '@testing-library/react-hooks';
import useEscapeEventListener from './use-escape-event-listener';

const onClose = jest.fn();

describe('Hook useEscapeEventListener',  () => {
  it('should fire onClose when press Esc', () => {
    renderHook(() => useEscapeEventListener(onClose));
    const evt = new KeyboardEvent('keydown', {key: 'Escape'});
    document.dispatchEvent(evt);

    expect(onClose).toBeCalled();
  });
});
