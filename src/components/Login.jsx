import React from 'react';

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
            type="submit"
            disabled={ !disable || name.length <= n3 }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
