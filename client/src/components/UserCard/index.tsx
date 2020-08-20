import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { UserProps } from '../../interfaces';

interface UserCardProps {
  user: UserProps;
  handleDeleteClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, handleDeleteClick }) => (
  <li>
    <img src={user.avatar} alt={user.username} />
    
    <span>{user.name}</span>
    <span>{user.username}</span>
    <span>{user.email}</span>
    <span>{user.phone}</span>

    <button onClick={handleDeleteClick} type="button">
      <FiTrash2 size={20} />
    </button>
  </li>
);

export default UserCard;