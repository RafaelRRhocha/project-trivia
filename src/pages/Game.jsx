import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import {
  createApiAction,
  createAnswerAction,
  createCountAction,
  createDisableAction,
} from '../Redux/actions';
import Timer from '../components/Timer';
import '../Css/Game.css';
import { readTimer, readUser } from '../localStorage';
import {
  decodeEntity,
  difficulty,
  n05,
  n10,
  n5,
  n63,
  n67,
} from '../components/main';

class Game extends React.Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    this.getApiRequest();
  }

  redirectErrorToken = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  getApiRequest = async () => {
    const {
      requestTokenApi: { token },
      filterApi,
    } = this.props;
    const { index } = this.state;
    const requestApi = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const dataApi = await requestApi.json();
    filterApi(dataApi.results[index]);
  };

  nextButton = () => {
    const {
      history,
      changeHasAnswer,
      checkDisable,
    } = this.props;
    this.getApiRequest();
    changeHasAnswer(false);
    checkDisable(false);
    const { index } = this.state;
    this.setState(({ index: i }) => ({ index: i + 1 }));
    if (index === n5) {
      history.push('/feedback');
    }
  }

  clickAnswers = ({ target: { textContent } }) => {
    const { changeHasAnswer, finalApi, checkDisable, sendCount } = this.props;
    const setTimer = readTimer();
    if (textContent === finalApi.correct_answer) {
      sendCount(+n10 + setTimer * difficulty[finalApi.difficulty]);
    }
    changeHasAnswer(true);
    checkDisable(true);
  };

  checkAnswers = (isCorrect) => (isCorrect
    ? 'correctAnswer' : 'wrongAnswer');

  getRandomAnswers = () => {
    const { finalApi, hasAnswer, disable } = this.props;
    const answers = finalApi.incorrect_answers
      && finalApi.incorrect_answers.map((e, i) => (
        <button
          className={ !hasAnswer ? 'defaultAnswer' : this.checkAnswers(false) }
          key={ i }
          type="button"
          data-testid={ `wrong-answer-${i}` }
          onClick={ this.clickAnswers }
          disabled={ disable }
        >
          {e}
        </button>
      ));
    const answersPush = answers
      && answers.push(
        <button
          className={ !hasAnswer ? 'defaultAnswer' : this.checkAnswers(true) }
          type="button"
          key="4"
          data-testid="correct-answer"
          onClick={ this.clickAnswers }
          disabled={ disable }
        >
          {finalApi.correct_answer}
        </button>,
      );
    console.log(answersPush);
    const randomAnswers = answers && answers.sort(() => Math.random() - n05);
    return randomAnswers;
  };

  render() {
    const { finalApi, hasAnswer } = this.props;
    const verifyToken = JSON.stringify(readUser());
    return (
      <>
        <Header />
        {verifyToken.length <= n63 || verifyToken.length >= n67 ? (
          this.redirectErrorToken()
        ) : (
          <div className="game-container">
            <div className="game">
              {finalApi && (
                <div>
                  <h1 data-testid="question-category" className="titleGame">
                    {finalApi.category}
                  </h1>
                  <Timer />
                  <p data-testid="question-text">
                    {decodeEntity(finalApi.question)}
                  </p>
                  <div data-testid="answer-options" className="btn-container">
                    {this.getRandomAnswers()}
                  </div>
                </div>
              )}
              {hasAnswer && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextButton }
                  className="next-btn"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

Game.propTypes = {
  changeHasAnswer: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  filterApi: PropTypes.func.isRequired,
  finalApi: PropTypes.objectOf().isRequired,
  hasAnswer: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  requestTokenApi: PropTypes.objectOf(PropTypes.string).isRequired,
  sendCount: PropTypes.func.isRequired,
  checkDisable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  requestTokenApi: state.player.requestTokenApi,
  finalApi: state.player.finalApi,
  hasAnswer: state.player.hasAnswer,
  disable: state.player.disable,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  filterApi: (api) => dispatch(createApiAction(api)),
  changeHasAnswer: (answer) => dispatch(createAnswerAction(answer)),
  sendCount: (count) => dispatch(createCountAction(count)),
  checkDisable: (btnDisa) => dispatch(createDisableAction(btnDisa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
