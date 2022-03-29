export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
}

export const removeToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const setToken = (val) => {
  localStorage.setItem('accessToken', val.accessToken);
  localStorage.setItem('refreshToken', val.refreshToken);
}
