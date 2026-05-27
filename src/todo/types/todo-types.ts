export interface Inputs {
  title: string;
  description: string;
  category: Category;
  dueDate: Date;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  category: Category;
  completed: boolean;
  createdAt: Date;
  dueDate: Date;
}

export type Category = "" | "work" | "personal" | "urgent";
