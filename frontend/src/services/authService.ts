export const userLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}