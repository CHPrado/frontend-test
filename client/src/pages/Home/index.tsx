import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { UserProps } from '../../interfaces';
import UserCard from '../../components/UserCard';
import Snack, { SnackProps } from '../../components/Snack';
import AlertBox from '../../components/AlertBox';

const Home = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState<SnackProps['type']>('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [deleteId, setDeletId] = useState<UserProps['id']>();

  const [snackState, setSnackState] = useState(false);
  const [snackType, setSnackType] = useState<SnackProps['type']>('');
  const [snackMessage, setSnackMessage] = useState('');


  useEffect(() => {
    api.get('users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleDeleteClick = (user: UserProps) => {
    setAlertTitle('Excluir Usuário');
    setAlertMessage(`Deseja excluir o usuário ${user.name}?`);
    setAlertType('warn');
    setAlertState(true);

    setDeletId(user.id);
  };

  const handleAlertConfirm = () => {
    if (typeof deleteId === 'number') handleDeleteUser(deleteId);
  }

  const handleCloseAlert = () => {
    setDeletId(undefined);
    setAlertState(false);
  };

  const handleCloseSnack = () => {
    setSnackState(false);
  };


  async function handleDeleteUser(userId: UserProps['id']) {
    await api.delete(`users/${userId}`).then((response) => {
      setSnackMessage('Usuário excluído!');
      setSnackType('success');
      setSnackState(true);

      setUsers(users.filter((user: UserProps) => user.id !== userId));
    });
  }

  return (
    <>
      <AlertBox 
        type={alertType}
        open={alertState}
        onConfirm={handleAlertConfirm}
        onClose={handleCloseAlert}
        title={alertTitle}
        message={alertMessage}
      />
      <Snack
        type={snackType}
        open={snackState}
        close={handleCloseSnack}
        message={snackMessage}
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
              {users.map((user) => <UserCard key={user.id} user={user} handleDeleteClick={() => handleDeleteClick(user)} />)}
            </ul>
          </main>
        </div>
      </div>
    </>
  )
};

export default Home;
