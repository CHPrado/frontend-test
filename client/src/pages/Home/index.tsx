import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { UserProps } from '../../interfaces';
import UserCard from '../../components/UserCard';

const Home = () => {
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
            {users.map((user) => <UserCard key={user.id} user={user} handleDeleteUser={handleDeleteUser} />)}
          </ul>
        </main>
      </div>
    </div>
  )
};

export default Home;
