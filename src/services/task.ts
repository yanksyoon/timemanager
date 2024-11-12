import { Task } from "../models";

const TASKS_KEY = "TIME_MANAGER_TASKS";
const COMPLETED_TASKS_KEY = "TIME_MANAGER_COMPLETED_TASKS";

export function addTask(task: Task) {
  const tasksString = localStorage.getItem(TASKS_KEY);
  if (!tasksString) {
    localStorage.setItem(TASKS_KEY, JSON.stringify([task]));
    return;
  }
  const tasks: Task[] = JSON.parse(tasksString);
  const newTasks = tasks.concat([task]);
  localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
}

export function deleteTask(task: Task) {
  const tasksString = localStorage.getItem(TASKS_KEY);
  if (!tasksString) {
    return;
  }
  const tasks: Task[] = JSON.parse(tasksString);
  const newTasks = tasks.filter((savedTask) => savedTask.id !== task.id);
  localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
}

export function editTask(task: Task) {
  const tasksString = localStorage.getItem(TASKS_KEY);
  if (!tasksString) {
    return;
  }
  const tasks: Task[] = JSON.parse(tasksString);
  const newTasks = tasks.map((savedTask) => {
    if (savedTask.id === task.id) {
      return task;
    }
    return savedTask;
  });
  localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
}

export function reorderTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function completeTask(task: Task) {
  deleteTask(task);
  const tasksString = localStorage.getItem(COMPLETED_TASKS_KEY);
  if (!tasksString) {
    localStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify([task]));
    return;
  }
  const tasks: Task[] = JSON.parse(tasksString);
  const newTasks = tasks.concat([task]);
  localStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(newTasks));
}

export function clearCompletedTasks() {
  localStorage.removeItem(COMPLETED_TASKS_KEY);
}
