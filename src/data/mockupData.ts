import type { Todo } from "@/todo/types/todo-types";

const now = Date.now();

export const mockupData = (): Todo[] => {
  return [
    {
      id: "1",
      title: "Finish the Project",
      description: "Do a follow-up of the project and finish the current tasks",
      category: "urgent",
      completed: false,
      createdAt: new Date(now),
      dueDate: new Date(now + 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      title: "Walk the dog",
      category: "personal",
      completed: true,
      createdAt: new Date(now),
      dueDate: new Date(now - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      title: "Do the English homework",
      description: "Exercise from 1 - 10 of the Book",
      category: "personal",
      completed: false,
      createdAt: new Date(now),
      dueDate: new Date(now + 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "4",
      title: "Organize the meeting",
      category: "urgent",
      completed: false,
      createdAt: new Date(now),
      dueDate: new Date(now + 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "5",
      title: "Send the documents to HR",
      category: "work",
      completed: false,
      createdAt: new Date(now),
      dueDate: new Date(now - 3 * 24 * 60 * 60 * 1000),
    },
  ];
};
