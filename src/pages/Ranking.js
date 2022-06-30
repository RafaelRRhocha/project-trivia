import PropTypes from 'prop-types';
import React from 'react';

class Ranking extends React.Component {
    redirectLogin = () => {
      const { history } = this.props;
      history.push('/');
    };

    render() {
      return (
        <div>
          <h1 data-testid="ranking-title">ranking-title</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.redirectLogin }
          >
            Play Again
          </button>
        </div>
      );
    }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
