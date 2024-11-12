import { SECOND, MINUTE } from "../utils";

interface ITimerProps {
  onTimerStartPause: () => void;
  onTimerStop: () => void;
  isPaused: boolean;
  // remaining time in milliseconds;
  remainingTime: number;
}

export default function Timer({
  onTimerStartPause,
  onTimerStop,
  isPaused,
  remainingTime,
}: ITimerProps) {
  const min = Math.trunc(remainingTime / MINUTE);
  const sec = Math.trunc((remainingTime - min * MINUTE) / SECOND);
  return (
    <div>
      <span style={STYLES.title}>
        {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}
      </span>
      <div style={STYLES.buttonWrapper}>
        <button onClick={onTimerStartPause} style={STYLES.button}>
          {isPaused ? "Start" : "Pause"}
        </button>
        <button onClick={onTimerStop} style={STYLES.button}>
          Stop
        </button>
      </div>
    </div>
  );
}

const STYLES: { [key: string]: React.CSSProperties } = {
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  buttonWrapper: {
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    margin: 6,
  },
};
