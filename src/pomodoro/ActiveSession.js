import React from "react";

function ActiveSession({
  isTimerRunning,
  focusTime,
  breakTime,
  sessionTime,
  sessionType,
  minutesToDuration,
  secondsToDuration,
}) {
  let sessionWidth;
  if (sessionType === "Focus") {
    sessionWidth = 100 - (sessionTime / (focusTime * 60)) * 100;
  } else {
    sessionWidth = 100 - (sessionTime / (breakTime * 60)) * 100;
  }

  if (!isTimerRunning) {
    return null;
  } else if (isTimerRunning) {
    return (
      <>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {sessionType === "Focus"
                ? `Focusing for ${minutesToDuration(focusTime)} minutes`
                : `On Break for ${minutesToDuration(breakTime)} minutes`}
            </h2>
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(sessionTime)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={sessionWidth}
                style={{ width: `${sessionWidth}%` }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ActiveSession;
