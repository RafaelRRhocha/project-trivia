const token = 'token';

export const saveUser = (user) => localStorage.setItem(token, user);
export const readUser = () => localStorage.getItem(token);
