import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDisableAction, createAnswerAction } from '../Redux/actions';
import { saveTimer } from '../localStorage';

class Timer extends React.Component {
  state = {
    count: 31,
  };

  componentDidMount() {
    const n1000 = 1000;
    this.timer = setInterval(() => {
      const { count } = this.state;
      this.setState({
        count: count - 1,
      });
    }, n1000);
  }

  componentDidUpdate() {
    const { checkDisable, changeHasAnswer } = this.props;
    const changeDisable = true;
    const { count } = this.state;
    saveTimer(count);
    if (count === 0) {
      clearInterval(this.timer);
      checkDisable(changeDisable);
      changeHasAnswer(changeDisable);
    }
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        {count}
      </div>
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
