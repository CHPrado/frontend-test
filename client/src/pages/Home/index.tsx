import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { FiTrash2 } from 'react-icons/fi';

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    api.get('users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  async function handleDeleteUser(userId: UserProps['id']) {
    await api.delete(`users/${userId}`).then((response) => {
      alert('Usuário excluído!');
      console.log(response);

      setUsers(users.filter((user: UserProps) => user.id !== userId));
    });
  }

  return (
    <div id="page-home">
      <div className="content">
        <header>
          <h1>
            Lista de Usuários
          </h1>

          <Link to="/create-user">
            <strong>Cadastre um novo usuário</strong>
          </Link>
        </header>

        <main>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <img src={user.avatar} alt={user.username} />
                
                <span>{user.name}</span>
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.phone}</span>

                <button onClick={(): Promise<void> => handleDeleteUser(user.id)} type="button">
                  <FiTrash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
};

export default Home;
