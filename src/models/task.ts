type UUID = string;

export type Task = {
  id: UUID;
  name: string;
  comment: string;

  // creation date of the task
  createdAt: Date;
  // due date of the task
  dueAt: Date;
  // number of pomodoro 15 minute sessions required to complete the task
  numSessions: number;
  // ID of the tags associated with the task
  tags: UUID[];
};

export type Tag = {
  id: UUID;
  name: string;
  comment: string;

  // Color of the tag to display (if provided).
  colorHex?: string;
};
