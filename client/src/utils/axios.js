import axios from 'axios';

const authFetch = axios.create({
  baseURL: '/api/v1',
});

export default authFetch;
