const token = 'token';
const timer = 'timer';

export const saveUser = (user) => localStorage.setItem(token, user);
export const readUser = () => localStorage.getItem(token);

export const saveTimer = (countTimer) => localStorage.setItem(timer, countTimer);
export const readTimer = () => localStorage.getItem(timer);
