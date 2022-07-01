import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetCount } from '../Redux/actions';
import '../Css/Ranking.css';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.createRanking();
  }

  createRanking = async () => {
    const { name, email, score } = this.props;
    const userEmail = md5(email).toString();
    const obj = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${userEmail}`,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([obj]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...ranking, obj]));
    }
    const finalObj = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking: finalObj });
  }

  redirectLogin = () => {
    const { history, resetCountAssertions } = this.props;
    resetCountAssertions();
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking
          && ranking.sort(
            (a, b) => parseFloat(b.score) - parseFloat(a.score),
          ).map(({ name, score, picture }, i) => (
            <div key={ i } className="player">
              <img src={ picture } alt={ name } />
              <div className="player-info">
                <p data-testid={ `player-name-${i}` }>{`Player: ${name}`}</p>
                <p data-testid={ `player-score-${i}` }>{`Score: ${score}`}</p>
              </div>
            </div>
          ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectLogin }
          className="playAgainRank"
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  resetCountAssertions: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  resetCountAssertions: () => dispatch(resetCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
