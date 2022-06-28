import USER from './actionsType';

const createUserState = (name, gravatarEmail, token) => ({
  type: USER,
  name,
  gravatarEmail,
  token,
});

export default createUserState;
