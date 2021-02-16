import React from "react";

const Pomodoro = ({
  isTimerRunning,
  focusTime,
  minutesToDuration,
  incrementSessionLengthByFiveMinutes,
  decrementSessionLengthByFiveMinutes,
}) => {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          Focus Duration: {minutesToDuration(focusTime)}
        </span>
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={decrementSessionLengthByFiveMinutes}
            disabled={isTimerRunning || focusTime === 5}
          >
            <span className="oi oi-minus" />
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={incrementSessionLengthByFiveMinutes}
            disabled={isTimerRunning || focusTime === 60}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
