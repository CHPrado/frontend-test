import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    avatar: ''
  });

  const history = useHistory();
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, username, email, phone, avatar } = formData;

    const data = {
      name,
      username,
      email,
      phone,
      avatar
    };

    await api.post('users', data);

    alert('Usuário criado!');

    history.push('/');
  }

  return (
    <div id="page-create-user">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de usuário</h1>

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
  );
};

export default CreateUser;
