import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { UserProps } from '../../interfaces';
import UserCard from '../../components/UserCard';
import Snack, { SnackProps } from '../../components/Snack';

const Home = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState<SnackProps['type']>('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    api.get('users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleCloseAlert = () => {
    setAlertState(false);
  };

  async function handleDeleteUser(userId: UserProps['id']) {
    await api.delete(`users/${userId}`).then((response) => {
      setAlertMessage('Usuário excluído!');
      setAlertType('success');
      setAlertState(true);

      setUsers(users.filter((user: UserProps) => user.id !== userId));
    });
  }

  return (
    <>
      <Snack
        type={alertType}
        open={alertState}
        close={handleCloseAlert}
        message={alertMessage}
      />
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
    </>
  )
};

export default Home;
