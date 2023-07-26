const getToken = (): string | null => localStorage.getItem('token');
const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};
const deleteToken = (): void => {
  localStorage.removeItem('token');
};
export { getToken, setToken, deleteToken };
