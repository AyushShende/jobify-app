import { useState } from 'react';
import Wrapper from './dashobardFormStyle';
import { useAlertContext } from '../../context/alertContext/alertContext';
import { useUserContext } from '../../context/userContext/userContext';
import { Alert, FormRow } from '../../components';

const Profile = () => {
  const { user, updateUser, isLoading } = useUserContext();
  const { showAlert, displayAlert } = useAlertContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert('danger', 'Please provide all values');
      return;
    }
    const currentUser = { name, lastName, email, location };

    updateUser({ currentUser, alertText: 'User Profile Updated!' });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
