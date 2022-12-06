import { useState } from 'react';
import styled from 'styled-components';
import { Logo, FormRow, Alert } from '../components';

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    showAlert: false,
    isMember: true,
  };
  const [credentials, setCredentials] = useState(initialState);

  const toggleMember = () => {
    setCredentials({ ...credentials, isMember: !credentials.isMember });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //
  };

  const handleChange = (event) => {
    //
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h3>{credentials.isMember ? 'Login' : 'Register'}</h3>
        {credentials.showAlert && <Alert />}
        {!credentials.isMember && (
          <FormRow
            type="text"
            value={credentials.name}
            name="name"
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          value={credentials.email}
          name="email"
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          value={credentials.password}
          name="password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {credentials.isMember ? 'Not a member yet?' : 'Already a member?'}{' '}
          <button type="button" onClick={toggleMember} className="member-btn">
            {credentials.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Register;