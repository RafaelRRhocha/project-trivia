const token = 'token';

export const saveUser = (user) => localStorage.setItem(token, JSON.stringify(user));
export const readUser = () => JSON.parse(localStorage.getItem(token));
