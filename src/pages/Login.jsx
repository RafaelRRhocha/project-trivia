import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveUser } from '../localStorage';
import { createUserState } from '../Redux/actions';
import '../Css/Login.css';

class Login extends React.Component {
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
    const { name, email } = this.state;
    const { history, sendUserState } = this.props;
    const requestToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const dataToken = await requestToken.json();
    saveUser(dataToken.token);
    sendUserState(name, email, dataToken);
    history.push('/game');
  };

  settings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, disable } = this.state;
    const n3 = 3;
    return (
      <div className="body-login">
        <form className="form">
          <div className="title">Welcome to Trivia!</div>
          <div className="subtitle">Lets Create Your Account!</div>
          <div className="input-container">
            <input
              type="text"
              value={ name }
              name="name"
              id="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              placeholder=" "
              className="input"
              autoComplete="off"
            />
            <div className="cut cut-short" />
            <p className="placeholder">
              Name
            </p>
          </div>
          <div className="input-container">
            <input
              type="email"
              value={ email }
              name="email"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.verifyInputEmail }
              placeholder=" "
              className="input"
              autoComplete="off"
            />
            <div className="cut cut-short" />
            <p className="placeholder">
              Email
            </p>
          </div>
          <div className="btn-container">
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.settings }
              className="settings-btn"
            >
              Settings
            </button>
            <button
              type="button"
              disabled={ !disable || name.length <= n3 }
              data-testid="btn-play"
              onClick={ this.fetchApi }
              className="play-btn"
            >
              Play
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(() => ({
    push: PropTypes.func,
  })).isRequired,
  sendUserState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendUserState: (name,
    gravatarEmail,
    token) => dispatch(createUserState(name, gravatarEmail, token)),
});

export default connect(null, mapDispatchToProps)(Login);
