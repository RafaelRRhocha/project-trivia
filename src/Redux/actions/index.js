import {
  USER,
  API_REQUEST,
  HAS_ANSWER,
  DISABLE,
  UPDATE_COUNT,
} from './actionsType';

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

export const createAnswerAction = (hasAnswer) => ({
  type: HAS_ANSWER,
  hasAnswer,
});

export const createDisableAction = (disable) => ({
  type: DISABLE,
  disable,
});

export const createCountAction = (count) => ({
  type: UPDATE_COUNT,
  score: count,
});
