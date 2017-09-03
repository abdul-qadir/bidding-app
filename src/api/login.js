import AuthService from './auth';

export default (email, name) => {
  const idToken = AuthService.getToken();
  return fetch('/api/user', {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email,
      name,
    }),
  })
        .then(response => response.json());
};
