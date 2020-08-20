import React from 'react';
import renderer from 'react-test-renderer';

import Snack from '../../../../components/Snack';

test('it matches the snapshot', () => {
  const tree = renderer.create(
    <Snack 
      type='success'
      message='Test Message'
      open={true}
      close={() => {}}
    />
  ).toJSON()

  expect(tree).toMatchSnapshot();
});
