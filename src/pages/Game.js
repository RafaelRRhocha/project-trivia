import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import {
  createApiAction,
  createAnswerAction,
  createCountAction,
} from '../Redux/actions';
import Timer from '../components/Timer';
import '../Css/Game.css';
import { readTimer, readUser } from '../localStorage';

class Game extends React.Component {
  state = {
    index: 0,
  };

  componentDidMount() {
    this.getApiRequest();
  }

  decodeEntity = (formatText) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = formatText;
    return textarea.value;
  };

  errorToken = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  getApiRequest = async () => {
    const {
      requestTokenApi: { token },
      filterApi,
      history,
    } = this.props;
    const { index } = this.state;
    const requestApi = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const dataApi = await requestApi.json();
    filterApi(dataApi.results[index]);
    this.setState(({ index: i }) => ({ index: i + 1 }));
    const n5 = 5;
    if (index === n5) {
      history.push('/feedback');
    }
  };

  clickAnswers = ({ target: { textContent } }) => {
    const { changeHasAnswer, finalApi, sendCount } = this.props;
    const setTimer = readTimer();
    const difficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (textContent === finalApi.correct_answer) {
      sendCount(+'10' + setTimer * difficulty[finalApi.difficulty]);
    }
    changeHasAnswer(true);
  };

  getRandomAnswers = () => {
    const { finalApi, hasAnswer, disable } = this.props;
    const answers = finalApi.incorrect_answers
      && finalApi.incorrect_answers.map((e, i) => (
        <button
          className={ !hasAnswer ? 'defaultAnswer' : 'wrongAnswer' }
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
          className={ !hasAnswer ? 'defaultAnswer' : 'correctAnswer' }
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
    const randomAnswers = answers && answers.sort(() => Math.random() - +'0.5');
    return randomAnswers;
  };

  render() {
    const { finalApi, hasAnswer } = this.props;
    const tok = JSON.stringify(readUser());
    const n63 = 63;
    const n67 = 67;
    return (
      <>
        <Header />
        {tok.length <= n63 || tok.length >= n67 ? (
          this.errorToken()
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
                    {this.decodeEntity(finalApi.question)}
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
                  onClick={ this.getApiRequest }
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
  // sendAssertions: (correctAnswers) => dispatch(createAssertionsAction(correctAnswers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
