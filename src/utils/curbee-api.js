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
  
  console.log(response);

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function getFind(id) {
  const response = await request  
    .get(API + `/api/v1/finds/${id}`)
    .ok(res => res.status < 500)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function claimFind(id) {
  const response = await request  
    .patch(API + `/api/v1/finds/${id}`)
    .ok(res => res.status < 500)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function getFinds() {
  const response = await request
    .get(API + '/api/v1/finds')
    .ok(res => res.status < 500)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function getNearby(location) {
  const response = await request
    .post(API + '/api/v1/finds/nearby')
    .ok(res => res.status < 500)
    .send(location)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function alertAboutFind(id) {
  const response = await request
    .get(API + `/api/v1/finds/${id}/alert`)
    .ok(res => res.status < 500)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  if (response.status === 400) {
    throw response.body;
  }

  return response.body;
}

export async function addFind(find) {
  const response = await request
    .post(API + '/api/v1/finds')
    .send(find)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;
}

export async function addSpot(spot) {
  const response = await request
    .post(API + '/api/v1/spots')
    .send(spot)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;

}

export async function addPhoto(photo) {
  const response = await request
    .post(API + '/api/v1/photos')
    .send(photo)
    .set('Authorization', window.localStorage.getItem('TOKEN'));

  return response.body;

}
