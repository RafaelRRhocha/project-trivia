import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { createApiAction, createAnswerAction, createCountAction } from '../Redux/actions';
import Timer from '../components/Timer';
import '../Css/Game.css';
import { readTimer, readUser } from '../localStorage';

class Game extends React.Component {
  componentDidMount() {
    this.getApiRequest();
  }

  errorToken = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  };

  getApiRequest = async () => {
    const {
      requestTokenApi: { token },
      filterApi,
    } = this.props;
    const requestApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const dataApi = await requestApi.json();
    const n6 = 6;
    const randomIndex = Math.floor(Math.random() * n6);
    filterApi(dataApi.results[randomIndex]);
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
      sendCount(+'10' + (setTimer * difficulty[finalApi.difficulty]));
    }
    const verifyAction = true;
    changeHasAnswer(verifyAction);
  }

  getRandomAnswers = () => {
    const { finalApi, hasAnswer, disable } = this.props;
    console.log(hasAnswer);
    const answers = finalApi.incorrect_answers
      && finalApi.incorrect_answers.map((e, i) => (
        <button
          className={ (!hasAnswer) ? 'black' : 'red' }
          key={ i }
          type="button"
          data-testid={ `wrong-answer-${i}` }
          onClick={ this.clickAnswers }
          disabled={ disable }
        >
          {e}
        </button>
      ));
    const answersPush = answers && answers.push(
      <button
        className={ (!hasAnswer) ? 'black' : 'green' }
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
    const { finalApi } = this.props;
    const tok = JSON.stringify(readUser());
    const n63 = 63;
    const n67 = 67;
    return (
      <>
        <Header />
        {tok.length <= n63 || tok.length >= n67 ? (
          this.errorToken()
        ) : (
          <div>
            <Timer />
            <h1 data-testid="question-category">{finalApi.category}</h1>
            <p data-testid="question-text">{finalApi.question}</p>
            <div data-testid="answer-options">{this.getRandomAnswers()}</div>
          </div>
        )}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape(() => ({
    push: PropTypes.func,
  })).isRequired,
  requestTokenApi: PropTypes.objectOf(PropTypes.string).isRequired,
  filterApi: PropTypes.func.isRequired,
  changeHasAnswer: PropTypes.func.isRequired,
  finalApi: PropTypes.objectOf.isRequired,
  hasAnswer: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
  sendCount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  requestTokenApi: state.player.requestTokenApi,
  finalApi: state.player.finalApi,
  hasAnswer: state.player.hasAnswer,
  disable: state.player.disable,
});

const mapDispatchToProps = (dispatch) => ({
  filterApi: (api) => dispatch(createApiAction(api)),
  changeHasAnswer: (answer) => dispatch(createAnswerAction(answer)),
  sendCount: (answer) => dispatch(createCountAction(answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
