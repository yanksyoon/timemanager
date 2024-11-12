import { useState } from "react";
import { Task } from "../models";

const TRUNCATE_CHAR_LIMIT = 300;

interface ITaskProps {
  task: Task;
}

export default function TaskDisplay({ task }: ITaskProps) {
  const [isCommentTruncated, setIsCommentTruncated] = useState(true);
  const onCommentClick = () => {
    setIsCommentTruncated((prev) => !prev);
  };
  return (
    <div style={STYLES.taskWrapper}>
      <span style={STYLES.taskName}>{task.name}</span>
      <span style={STYLES.taskComment} onClick={onCommentClick}>
        {isCommentTruncated
          ? `${task.comment.substring(0, TRUNCATE_CHAR_LIMIT)}...`
          : task.comment}
      </span>
    </div>
  );
}

const STYLES: { [key: string]: React.CSSProperties } = {
  taskWrapper: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 12,
    maxWidth: 800,
  },
  taskName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  taskComment: {
    fontWeight: 300,
    fontSize: 16,
  },
};
