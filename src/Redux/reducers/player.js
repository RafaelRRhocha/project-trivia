import { USER, API_REQUEST } from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  requestTokenApi: {},
  finalApi: [],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      name: action.name,
      requestTokenApi: action.requestTokenApi,
      gravatarEmail: action.gravatarEmail,
    };
  case API_REQUEST:
    return {
      ...state,
      finalApi: action.finalApi,
    };
  default:
    return state;
  }
};

export default player;
