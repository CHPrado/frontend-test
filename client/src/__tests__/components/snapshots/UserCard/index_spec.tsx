import React from 'react';
import renderer from 'react-test-renderer';

import UserCard from '../../../../components/UserCard';

test('it matches the snapshot', () => {
  const user = {
    id: 1,
    name: 'Test Name',
    username: 'Test Username',
    email: 'teste@email.com',
    phone: '123456',
    avatar: 'teste-avatar.png',
  }
  const tree = renderer.create(
    <UserCard user={user} handleDeleteClick={() => {}} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
