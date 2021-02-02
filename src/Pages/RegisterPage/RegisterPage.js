import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../Context/AuthContext';
import './style/regStyle.css';
import back from '../../images/arrow-left-solid.svg';

export default function RegisterPage() {
  const auth = useContext(AuthContext);
  const { request, backError, clearError } = useHttp();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    login: '',
    password: '',
    confirm: '',
    btnStatus: false,
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const btnStatusHandler = () => {
    setForm({ ...form, btnStatus: !form.btnStatus });
  };

  const registerHandler = async () => {
    clearError();

    if (form.password !== form.confirm) {
      return setError('Passwords don\'t match');
    }

    const userData = {
      login: form.login,
      password: form.password,
    };

    const data = await request('app/auth/createUser', 'post', userData);

    auth.login(data.token, data.userId, data.userName, data.filter);

    return setForm({
      ...form,
      login: '',
      password: '',
      confirm: '',
    });
  };

  return (
    <div className="registerHolder">
      <div className="appName">
        <strong>TODO</strong>
      </div>
      <div
        className="regPage"
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            registerHandler();
          }
        }}
      >
        <Link to="/sign_in">
          <img className="backImg" src={back} alt={back} />
        </Link>
        <div className="pageHeader" id="regHeader">registration</div>
        <input
          className="inputForm"
          name="login"
          type="text"
          placeholder="login"
          value={form.login}
          onChange={changeHandler}
        />
        <input
          className="inputForm"
          name="password"
          type={form.btnStatus ? 'text' : 'password'}
          placeholder="password"
          value={form.password}
          onChange={changeHandler}
        />
        <input
          className="inputForm"
          name="confirm"
          type={form.btnStatus ? 'text' : 'password'}
          placeholder="confirm password"
          value={form.confirm}
          onChange={changeHandler}
        />
        <input
          className="showPass"
          type="button"
          value={form.btnStatus ? 'hide password' : 'show password'}
          onClick={btnStatusHandler}
        />
        <button type="button" id="btn2" className="btn" onClick={registerHandler}>register</button>
      </div>
      <div className="errorHolder">{backError || error}</div>
    </div>
  );
}
