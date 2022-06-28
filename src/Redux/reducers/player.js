import USER from '../actions/actionsType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      name: action.name,
      token: action.token,
      gravatarEmail: action.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
