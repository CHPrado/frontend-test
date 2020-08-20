import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Home from '../../../../pages/Home';

test('it matches the snapshot', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
