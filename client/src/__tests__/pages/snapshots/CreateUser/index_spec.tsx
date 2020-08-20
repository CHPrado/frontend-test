import React from 'react';
import renderer from 'react-test-renderer';

import CreateUser from '../../../../pages/CreateUser';

test('it matches the snapshot', () => {
  const tree = renderer.create(<CreateUser />).toJSON();

  expect(tree).toMatchSnapshot();
});
