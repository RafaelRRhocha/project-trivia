import React from 'react';
import PropTypes from 'prop-types';
import { saveUser } from '../localStorage';

export default class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disable: false,
  };

  handleChange = ({ target: { value } }) => this.setState({ name: value });

  verifyInputEmail = ({ target: { value } }) => {
    const { email } = this.state;
    const regexValidation = /\S+@\w+\.\w+/i;
    const finalValidation = regexValidation.test(email);
    this.setState({ email: value, disable: finalValidation });
  };

  fetchApi = async () => {
    const { history } = this.props;
    const requestToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const dataToken = await requestToken.json();
    // const requestApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${dataToken.token}`);
    // const dataApi = await requestApi.json();
    saveUser(dataToken.token);
    history.push('/game');
  }

  settings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, disable } = this.state;
    const n3 = 3;
    return (
      <div>
        <form>
          <input
            type="text"
            value={ name }
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.verifyInputEmail }
          />
          <button
            type="button"
            disabled={ !disable || name.length <= n3 }
            data-testid="btn-play"
            onClick={ this.fetchApi }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-setting"
            onClick={ this.settings }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(() => ({
    push: PropTypes.func,
  })).isRequired,
};
