import React, { useState } from "react";
import Pomodoro from "./pomodoro/Pomodoro";
import Break from "./pomodoro/Break";
import TimerControl from "./pomodoro/TimerControl";
import ActiveSession from "./pomodoro/ActiveSession";
import useInterval from "./utils/useInterval";
import classNames from "./utils/class-names";
import { minutesToDuration, secondsToDuration } from "./utils/duration";
import "./App.css";

function App() {
  const defaultFocusTime = 25;
  const defaultBreakTime = 5;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [focusTime, setFocusTime] = useState(defaultFocusTime);
  const [sessionTime, setSessionTime] = useState(focusTime * 60);
  const [sessionType, setSessionType] = useState("Focus");

  const incrementBreakLengthByOneMinute = () => {
    let newTime = breakTime + 1;
    setBreakTime(newTime);
    if (sessionType === "Break") setSessionTime(breakTime * 60);
  };

  const decrementBreakLengthByOneMinute = () => {
    let newTime = breakTime - 1;
    setBreakTime(newTime);
    if (sessionType === "Break") setSessionTime(breakTime * 60);
  };

  const incrementSessionLengthByFiveMinutes = () => {
    let newTime = focusTime + 5;
    setFocusTime(newTime);
    setSessionTime(newTime * 60);
  };

  const decrementSessionLengthByFiveMinutes = () => {
    let newTime = focusTime - 5;
    setFocusTime(newTime);
    setSessionTime(newTime * 60);
  };

  const stopTimer = () => {
    setSessionType("Focus");
    setSessionTime(focusTime * 60);
    setIsTimerRunning((prevState) => !prevState);
  };

  useInterval(
    () => setSessionTime(sessionTime - 1),
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }

  if (sessionTime === 0 && sessionType === "Focus") {
    const focusDoneAudio = new Audio(
      `${process.env.PUBLIC_URL}/alarm/submarine-dive-horn.mp3`
    );
    focusDoneAudio.play();
    setSessionTime(breakTime * 60);
    setSessionType("Break");
  }

  if (sessionTime === 0 && sessionType === "Break") {
    const breakDoneAudio = new Audio(
      `${process.env.PUBLIC_URL}/alarm/alarm-clock-buzzer-beeps.mp3`
    );
    breakDoneAudio.play();
    setSessionType("Focus");
    setSessionTime(focusTime * 60);
  }

  return (
    <div className="App">
      <header className="App-header container">
        <h1>Pomodoro Timer</h1>
      </header>
      <div className="container">
        <div className="pomodoro">
          <div className="row">
            <Pomodoro
              isTimerRunning={isTimerRunning}
              focusTime={focusTime}
              minutesToDuration={minutesToDuration}
              incrementSessionLengthByFiveMinutes={
                incrementSessionLengthByFiveMinutes
              }
              decrementSessionLengthByFiveMinutes={
                decrementSessionLengthByFiveMinutes
              }
            />
            <TimerControl
              isTimerRunning={isTimerRunning}
              playPause={playPause}
              classNames={classNames}
              stopTimer={stopTimer}
            />
            <Break
              isTimerRunning={isTimerRunning}
              breakTime={breakTime}
              minutesToDuration={minutesToDuration}
              incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
              decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
              sessionType={sessionType}
            />
          </div>
          <ActiveSession
            isTimerRunning={isTimerRunning}
            focusTime={focusTime}
            breakTime={breakTime}
            sessionTime={sessionTime}
            sessionType={sessionType}
            minutesToDuration={minutesToDuration}
            secondsToDuration={secondsToDuration}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
