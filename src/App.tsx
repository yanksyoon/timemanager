import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Timer from "./timer";
import { MINUTE, SECOND } from "./utils";
import Pomodoro from "./pomodoro";
import TaskDisplay from "./task";

const POMODORO_CYCLES = [15, 15, 15, 15];
const BREAK_CYCLES = [5, 5, 5, 15];

function App() {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [isBreak, setIsBreak] = useState(false);

  const onTimeUp = useCallback(() => {
    // If break time is up, increment cycle number
    // If pomodoro time is up, go into break mode.
    setIsPaused(true);
    setTimeSpent(0);
    if (isBreak) {
      setIsBreak(false);
      setCurrentCycle((prev) => prev + 1);
      return;
    }
    setIsBreak(true);
  }, [isBreak]);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (isPaused) return;
      setTimeSpent((prev) => {
        const timeSpent = prev + 1;
        if (checkTimeUp(isBreak, currentCycle, timeSpent)) {
          onTimeUp();
          return 0;
        }
        return timeSpent;
      });
    }, 1000);
    return () => {
      clearInterval(countdownTimer);
    };
  }, [currentCycle, isBreak, isPaused, onTimeUp]);

  const onTimerStartPause = () => {
    setIsPaused((prev) => !prev);
  };

  const onTimerStop = () => {
    onTimeUp();
  };

  const sampleTask = {
    id: "abcd",
    name: "test task",
    comment:
      // eslint-disable-next-line no-multi-str
      "test task comment that is super long and may go over line and need to test what is a good \
      length in pixels to allow test task comment that is super long and may go over line and \
      need to test what is a good length in pixels to allow test task comment that is super long \
      and may go over line and need to test what is a good length in pixels to allow",
    createdAt: new Date(),
    dueAt: new Date(),
    numSessions: 5,
    tags: [],
  };

  return (
    <div className="App">
      <TaskDisplay task={sampleTask} />
      <Timer
        onTimerStartPause={onTimerStartPause}
        onTimerStop={onTimerStop}
        isPaused={isPaused}
        remainingTime={getTimeLeft(isBreak, currentCycle, timeSpent)}
      />
      <Pomodoro numPomodorosDone={currentCycle} />
    </div>
  );
}

function getTimeLeft(
  isBreak: boolean,
  cycleNumber: number,
  timeSpent: number
): number {
  const cycleIndex = cycleNumber % 4;
  if (isBreak) {
    return BREAK_CYCLES[cycleIndex] * MINUTE - timeSpent * SECOND;
  }
  return POMODORO_CYCLES[cycleIndex] * MINUTE - timeSpent * SECOND;
}

function checkTimeUp(
  isBreak: boolean,
  cycleNumber: number,
  timeSpent: number
): boolean {
  return getTimeLeft(isBreak, cycleNumber, timeSpent) <= 0;
}

export default App;
