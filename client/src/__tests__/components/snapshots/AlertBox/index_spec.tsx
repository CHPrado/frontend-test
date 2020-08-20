import React from 'react';
import renderer from 'react-test-renderer';

import AlertBox from '../../../../components/AlertBox';

test('it matches the snapshot', () => {
  const tree = renderer.create(
    <AlertBox 
      type='success'
      title='Test Title'
      message='Test Message'
      open={true}
      onClose={() => {}}
      onConfirm={() => {}}
    />
  ).toJSON()

  expect(tree).toMatchSnapshot();
});
