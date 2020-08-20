import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Snack, { SnackProps } from '../../components/Snack';
import portrait from '../../assets/portrait.png';

const CreateUser = () => {
  const [avatar, setAvatar] = useState<string>(portrait);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  const history = useHistory();

  const [alertState, setAlertState] = useState(false);
  const [alertType, setAlertType] = useState<SnackProps['type']>('');
  const [alertMessage, setAlertMessage] = useState('');

  let inputPic: HTMLInputElement;

  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (alertType === 'success') {
      if (!alertState) history.push('/');
    }
  }, [alertState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setAvatar(event?.target?.result as string);
      };
    }
  }, [file]);

  function getRef(input: HTMLInputElement) { inputPic = input; };

  function handlePicClick() {
    inputPic.click();
  };

  function handleCloseAlert() {
    setAlertState(false);
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function stopSubmit() {
    let msg = '';
    const { name, username, email, phone } = formData;

    if (name === '') msg = 'Preencha o campo Nome';
    else if (username === '') msg = 'Preencha o campo Nome de Usuário';
    else if (email === '') msg = 'Preencha o campo E-Mail';
    else if (phone === '') msg = 'Preencha o campo Telefone';
    else if (avatar === portrait) msg = 'Adicione uma Foto';

    if (msg !== '') {
      setAlertMessage(msg);
      setAlertType('warn');
      setAlertState(true);
      return true;
    }

    return false;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, username, email, phone } = formData;

    const data = {
      name,
      username,
      email,
      phone,
      avatar
    };

    if (stopSubmit()) return;

    await api.post('users', data).then(() => {
      setAlertMessage('Usuário criado! Você será redirecionado.');
      setAlertType('success');
      setAlertState(true);

      window.setTimeout(() => {
        history.push('/');
      }, 2000);
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
      <div id="page-create-user">
        <form onSubmit={handleSubmit}>
          <h1>Cadastro de usuário</h1>

          <div
            className="avatar"
            onClick={handlePicClick}
          >
            <img src={avatar} alt="avatar" />
            <strong>Adicione uma Foto</strong>

            <input
              hidden
              type="file"
              accept="image/*"
              ref={getRef}
              onChange={(e) => {
                setFile(e?.target?.files ? e?.target?.files[0] : undefined);
              }}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Nome de Usuário"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="E-Mail"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Telefone"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button type="submit">
            Cadastrar usuário
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
