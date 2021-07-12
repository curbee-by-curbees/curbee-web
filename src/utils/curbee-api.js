import request from 'superagent';
// const API = 'https://curbee-dev.herokuapp.com/api/v1';

export async function signUp(credentials) {
  const response = await request
    .post('http://localhost:7890/api/v1/auth/signup')
    .ok(res => res.status < 500)
    .send({
      username: credentials.username,
      password: credentials.password,
      phoneNumber: credentials.phoneNumber 
    });

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function login(credentials) {
  const response = await request 
    .post('http://localhost:7890/api/v1/auth/login')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}