import {
  USER,
  API_REQUEST,
  HAS_ANSWER,
  DISABLE,
  UPDATE_COUNT,
} from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  requestTokenApi: {},
  finalApi: [],
  hasAnswer: false,
  disable: false,
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
  case HAS_ANSWER:
    return {
      ...state,
      hasAnswer: action.hasAnswer,
    };
  case DISABLE:
    return {
      ...state,
      disable: action.disable,
    };
  case UPDATE_COUNT:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
