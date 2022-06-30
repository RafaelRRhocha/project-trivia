import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">dasdasd</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
