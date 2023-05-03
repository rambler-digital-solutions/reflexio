import { getState, useTrigger } from '../../_redux/test-core';

test('letters test', () => {
  const trigger = useTrigger();
  trigger('lettersList', 'init', null);
  expect(getState()).toMatchSnapshot();
});
