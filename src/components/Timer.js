import React from "react";

class Timer extends React.Component {
  state = {
    count: 30
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let { count } = this.state;
      this.setState({
        count: count -1
      })
    }, 1000)
  }

  componentDidUpdate() {
    if (this.state.count === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        {count}
      </div>
    )
  }
}

export default Timer;
