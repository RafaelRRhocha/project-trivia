import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { createApiAction } from '../Redux/actions';
import Timer from '../components/Timer';
import '../Css/Game.css';
import { readUser } from '../localStorage';


class Game extends React.Component {
  state = {
    hasAnswer: false,
  }

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

  clickAnswers = () => {
    const { hasAnswer } = this.state;
    return (!hasAnswer) ? this.setState({ hasAnswer: true })
      : this.setState({ hasAnswer: false });
  }

  getRandomAnswers = () => {
    const { finalApi } = this.props;
    const { hasAnswer } = this.state;
    const answers = finalApi.incorrect_answers
      && finalApi.incorrect_answers.map((e, i) => (
        <button
          className={ (!hasAnswer) ? 'black' : 'red' }
          key={ i }
          type="button"
          data-testid={ `wrong-answer-${i}` }
          onClick={ this.clickAnswers }
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
      >
        {finalApi.correct_answer}
      </button>,
    );
    console.log(answersPush);
    const randomAnswers = answers && answers.sort(() => Math.random() - +'0.5');
    return randomAnswers;
  };

  render() {
    const {
      // requestTokenApi: { response_code: response },
      finalApi,
    } = this.props;
    const tok = JSON.stringify(readUser());
    console.log(tok);
    const n3 = 3;
    return (
      <>
        <Header />
        {tok.length === tok.length - n3 ? (
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
  finalApi: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  requestTokenApi: state.player.requestTokenApi,
  finalApi: state.player.finalApi,
});

const mapDispatchToProps = (dispatch) => ({
  filterApi: (api) => dispatch(createApiAction(api)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
