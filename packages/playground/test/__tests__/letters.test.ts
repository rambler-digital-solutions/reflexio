import { getState, useTrigger } from '../core';

test('some test', () => {
  const trigger = useTrigger();
  trigger('lettersList', 'init', null);
  expect(getState()).toMatchSnapshot();
});
