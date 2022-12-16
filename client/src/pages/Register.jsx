import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Logo, FormRow, Alert } from '../components';
import { useAlertContext } from '../context/alertContext/alertContext';
import { useUserContext } from '../context/userContext/userContext';

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

const Register = () => {
  const { showAlert, displayAlert } = useAlertContext();
  const { setupUser, isLoading, user } = useUserContext();
  const navigate = useNavigate();
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  };
  const [credentials, setCredentials] = useState(initialState);

  const toggleMember = () => {
    setCredentials({ ...credentials, isMember: !credentials.isMember });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, isMember } = credentials;
    if (!email || !password || (!isMember && !name)) {
      displayAlert('danger', 'Please provide all values');
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        alertText: 'Login Successful! Redirecting...',
        endPoint: 'login',
      });
    } else {
      setupUser({
        currentUser,
        alertText: 'User Created! Redirecting...',
        endPoint: 'register',
      });
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h3>{credentials.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
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
        <button disabled={isLoading} type="submit" className="btn btn-block">
          Submit
        </button>
        <button
          disabled={isLoading}
          type="button"
          className="btn btn-block btn-hipster"
          onClick={() => {
            setupUser({
              currentUser: { email: 'testuser@test.com', password: 'test1234' },
              alertText: 'Login Successful! Redirecting...',
              endPoint: 'login',
            });
          }}
        >
          {isLoading ? 'loading...' : 'demo app'}
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

export default Register;
