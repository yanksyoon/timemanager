interface IPomodoroProps {
  numPomodorosDone: number;
}

export default function Pomodoro({ numPomodorosDone }: IPomodoroProps) {
  const pomos = Array(5)
    .fill(0)
    .map((_, index) => {
      if (index < numPomodorosDone) {
        return "⏰";
      } else if (index === numPomodorosDone) {
        return "⌛";
      }
      return "⏳";
    });
  return <div>{pomos}</div>;
}
