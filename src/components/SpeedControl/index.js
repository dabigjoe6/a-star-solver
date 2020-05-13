import React from "react";
import "./styles.css";

class SpeedControl extends React.Component {
  constructor(props) {
	super(props)
	this.state = {
		currentSpeed: window.localStorage.getItem("speed") || "1x"
	};
  }
  
  toggleActiveSpeed = e => {
    const clickedSpeed = e.target.getAttribute("name");
    // window.localStorage.setItem("speed", clickedSpeed);
	this.props.onChangeSpeed(clickedSpeed)
    this.setState({
      currentSpeed: clickedSpeed
    });
  };
  buildClassName = speed => {
    const { currentSpeed } = this.state;
    if (currentSpeed == speed) {
      return `active speed-ctrl`;
    }
    return `speed-ctrl`;
  };
  render() {
    const { currentSpeed } = this.state;
    return (
      <div className="speed-ctrl-container">
        <span
          name="0.5x"
          className={this.buildClassName("0.5x")}
          onClick={this.toggleActiveSpeed}
        >
          .5X
        </span>
        <span
          name="1x"
          className={this.buildClassName("1x")}
          onClick={this.toggleActiveSpeed}
        >
          1X
        </span>
        <span
          name="2x"
          className={this.buildClassName("2x")}
          onClick={this.toggleActiveSpeed}
        >
          2X
        </span>
      </div>
    );
  }
}

export default SpeedControl;
