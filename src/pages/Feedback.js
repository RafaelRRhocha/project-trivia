import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
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
    const { assertions, score } = this.props;
    const n3 = 3;
    return (
      <div>
        <Header />
         <p data-testid="feedback-text">
          {
            (assertions < n3)
              ? ('Could be better...')
              : ('Well Done!')
          }

        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
        >
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
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
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
