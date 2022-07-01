import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDisableAction, createAnswerAction } from '../Redux/actions';
import { saveTimer } from '../localStorage';
import '../Css/Game.css';
import { n1000 } from './main';

class Timer extends React.Component {
  state = {
    count: 31,
  };

  componentDidMount() {
    this.createTimer();
  }

  componentDidUpdate() {
    this.updateTimer();
  }

  componentWillUnmount() {
    this.createTimer();
    this.updateTimer();
  }

  createTimer = () => {
    this.timer = setInterval(() => {
      const { count } = this.state;
      this.setState({
        count: count - 1,
      });
    }, n1000);
  }

  updateTimer = () => {
    const { checkDisable, changeHasAnswer } = this.props;
    const { count } = this.state;
    saveTimer(count);
    if (count === 0) {
      clearInterval(this.timer);
      checkDisable(true);
      changeHasAnswer(true);
    }
  }

  render() {
    // const timer = readTimer();
    const { count } = this.state;
    return (
      <p className="timer">
        {count}
      </p>
    );
  }
}

Timer.propTypes = {
  checkDisable: PropTypes.func.isRequired,
  changeHasAnswer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  checkDisable: (btnDisa) => dispatch(createDisableAction(btnDisa)),
  changeHasAnswer: (answer) => dispatch(createAnswerAction(answer)),
});

export default connect(null, mapDispatchToProps)(Timer);
