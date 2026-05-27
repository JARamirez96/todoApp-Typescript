import { create } from "zustand";
import type { Inputs, Todo } from "../types/todo-types";
import { mockupData } from "@/data/mockupData";
import * as z from "zod";

interface TodoState {
  todos: Todo[];
  activeId: string | null;
  actions: {
    addTodo: (todo: Inputs) => void;
    setActiveId: (id: string | null) => void;
    updateTodo: (id: string, todoInputs: Inputs) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
  };
}

const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(["work", "personal", "urgent", ""]),
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  dueDate: z.coerce.date(),
});

const todoListSchema = z.array(todoSchema);

const getInitialTodos = (): Todo[] => {
  const data = localStorage.getItem("todos");

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      const result = todoListSchema.safeParse(parsedData);

      if (result.success) return result.data;
      console.log("Zod Validation Error");
    } catch (error) {
      console.log("Data couldn't be parsed", error);
    }
  }

  localStorage.setItem("todos", JSON.stringify(mockupData()));
  return mockupData();
};

export const useTodo = create<TodoState>((set) => ({
  todos: getInitialTodos(),
  activeId: null,
  actions: {
    setActiveId: (id: string | null) => set({ activeId: id ? id : null }),
    addTodo: (todo: Inputs) =>
      set((state) => {
        const newTodo: Todo = {
          ...todo,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: new Date(),
        };

        const result = todoSchema.safeParse(newTodo);

        if (!result.success) {
          console.log("Task couldn't be created: ", result.error);
          return state;
        }

        const newTodos = [...state.todos, result.data];
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return {
          todos: newTodos,
        };
      }),
    deleteTodo: (id: string) =>
      set((state) => {
        const newTodos = state.todos.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return {
          todos: newTodos,
        };
      }),
    updateTodo: (id: string, todoInputs: Inputs) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) => {
          if (todo.id === id) {
            const todoUpdated = {
              ...todo,
              ...todoInputs,
              completed: false,
            };

            const result = todoSchema.safeParse(todoUpdated);

            if (!result.success) {
              console.log("Tasks couldn't be updated: ", result.error);
              return todo;
            }

            return result.data;
          }
          return { ...todo };
        });
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return {
          todos: updatedTodos,
          activeId: null,
        };
      });
    },
    toggleTodo: (id: string) =>
      set((state) => {
        const findTodo = state.todos.find((todo) => todo.id === id);
        if (!findTodo) return { todos: state.todos };

        const newTodos = state.todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
          }
          return { ...todo };
        });
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return {
          todos: newTodos,
        };
      }),
  },
}));
