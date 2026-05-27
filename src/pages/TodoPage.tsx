import { TodoForm } from "@/todo/components/TodoForm";
import { TodoList } from "@/todo/components/TodoList";

export const TodoPage = () => {
  return (
    // TODO: Revisar el apartado responsivo
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 md:w-full">
        <TodoForm />
      </div>
      <div className="lg:w-3/4 md:my-5">
        <TodoList />
      </div>
    </div>
  );
};
