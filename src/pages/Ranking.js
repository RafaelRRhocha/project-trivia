import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetCount } from '../Redux/actions';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  async componentDidMount() {
    const { name, email, score } = this.props;
    const userEmail = md5(email).toString();
    const objInfo = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${userEmail}`,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([objInfo]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...ranking, objInfo]));
    }
    const objUpdated = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking: objUpdated });
  }

  redirectLogin = () => {
    const { history, resetCountAssertions } = this.props;
    resetCountAssertions();
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking page</h1>
        {ranking
          && ranking.sort(
            (a, b) => parseFloat(b.score) - parseFloat(a.score),
          ).map(({ name, score, picture }, index) => (
            <div key={ index }>
              <img src={ picture } alt={ name } />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </div>
          ))}
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
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  resetCountAssertions: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  resetCountAssertions: () => dispatch(resetCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
