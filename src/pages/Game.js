import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { createApiAction } from '../Redux/actions';
import Timer from '../components/Timer';

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

  getRandomAnswers = () => {
    const { finalApi } = this.props;
    const answers = finalApi.incorrect_answers
      && finalApi.incorrect_answers.map((e, i) => (
        <button key={ i } type="button" data-testid={ `wrong-answer-${i}` }>
          {e}
        </button>
      ));
    const answersPush = answers && answers.push(
      <button type="button" key="4" data-testid="correct-answer">
        {finalApi.correct_answer}
      </button>,
    );
    console.log(answersPush);
    const randomAnswers = answers && answers.sort(() => Math.random() - +'0.5');
    return randomAnswers;
  };

  render() {
    const {
      requestTokenApi: { response_code: response },
      finalApi,
    } = this.props;
    const n3 = 3;
    return (
      <>
        <Header />
        {response === n3 ? (
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
