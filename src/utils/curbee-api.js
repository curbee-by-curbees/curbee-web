import request from 'superagent';

const API = 'http://localhost:7890';


export async function signUp(credentials) {
  const response = await request
    .post(API + '/api/v1/auth/signup')
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
    .post(API + '/api/v1/auth/login')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function getFind(id) {
  const response = await request  
    .get(API + `/api/v1/finds/${id}`)
    .ok(res => res.status < 500);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}