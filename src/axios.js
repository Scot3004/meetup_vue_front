import axios from 'axios'

let token = window.localStorage.getItem('token');
const instance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {'Authorization': 'JWT '+token}
});

export default instance;
