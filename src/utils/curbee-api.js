import request from 'superagent';

export async function signUp(credentials) {
  const response = await request
    .post('auth/signup/')
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
    .post('/auth/login')
    .ok(res => res.status < 500)
    .send(credentials);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}