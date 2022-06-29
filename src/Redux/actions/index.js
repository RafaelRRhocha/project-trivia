import { USER, API_REQUEST } from './actionsType';

export const createUserState = (name, gravatarEmail, requestTokenApi) => ({
  type: USER,
  name,
  gravatarEmail,
  requestTokenApi,
});

export const createApiAction = (finalApi) => ({
  type: API_REQUEST,
  finalApi,
});
