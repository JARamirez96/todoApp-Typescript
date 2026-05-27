import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle2, ListTodo, Search } from "lucide-react";
import { TodoItem } from "./TodoItem";
import { useTodo } from "../hooks/useTodo";
import { Button } from "@/components/ui/button";

import type { Todo } from "../types/todo-types";

import { isExpired } from "@/utils/date-util";

type TabValue = "all" | "pending" | "completed";

// TODO: Agregar paginacion o limitante para que no se extienda la página
export const TodoList = () => {
  const todos = useTodo((state) => state.todos);
  const [searchParams, setSearchParams] = useSearchParams();

  const tabSelected = searchParams.get("status") || "all";
  const query = searchParams.get("q") || "";
  const selectedDate = searchParams.get("date") || "";

  const [searchInput, setSearchInput] = useState(query);

  const filteredTodos = todos.filter((todo) => {
    const matchesQuery = query
      ? todo.title.toLocaleLowerCase().includes(query)
      : true;

    const matchesDate = selectedDate
      ? todo.dueDate.toISOString().split("T")[0] === selectedDate
      : true;

    return matchesQuery && matchesDate;
  });

  const todoStatus = {
    all: filteredTodos.length,
    pending: filteredTodos.filter(
      (todo) => !todo.completed && !isExpired(todo.dueDate),
    ).length,
    completed: filteredTodos.filter((todo) => todo.completed).length,
    expired: filteredTodos.filter(
      (todo) => !todo.completed && isExpired(todo.dueDate),
    ).length,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchInput) {
        searchParams.delete("q");
      } else {
        searchParams.set("q", searchInput);
      }
      setSearchParams(searchParams);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchParams, setSearchParams, searchInput]);

  const handleTabChanged = (tab: TabValue) => {
    if (tab === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", tab);
    }
    setSearchParams(searchParams);
  };

  const handleSearchInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchInput(e.target.value);
  };

  const handleSelectDate = (date: string) => {
    const dateParam = searchParams.get("date");

    if (date === dateParam) {
      handleClearDate();
      return;
    }

    searchParams.set("date", date);
    setSearchParams(searchParams);
  };

  const handleClearDate = () => {
    searchParams.delete("date");
    setSearchParams(searchParams);
  };

  const todoDates = todos
    .filter((todo) => todo.dueDate && !todo.completed)
    .map((todo) => todo.dueDate as Date);

  const renderTodoList = (todos: Todo[]) => {
    if (!todos.length) {
      const title = query
        ? `No tasks where found containing '${query}' on this tab`
        : "No tasks";
      const subtitle = query ? "Please do a new search" : "Add a new Task";

      return (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CheckCircle2 />
            </EmptyMedia>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>
              {subtitle}
              {/* {selectedDate
                  ? "No hay tareas para esta fecha"
                  : "Agrega una nueva tarea para comenzar"} */}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    );
  };

  // TODO: Agregar un filtro del tipo de tarea
  return (
    <div className="flex md:flex-col-reverse">
      <div className="flex flex-1 flex-col gap-3 px-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            onChange={(e) => handleSearchInput(e)}
            placeholder="Search tasks..."
            className="pl-9"
          />
        </div>

        <Tabs
          defaultValue={tabSelected}
          onValueChange={(value) => handleTabChanged(value as TabValue)}
        >
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <ListTodo className="size-4" />
              All
              <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {todoStatus.all}
              </span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {todoStatus.pending}
              </span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              Completed
              <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {todoStatus.completed}
              </span>
            </TabsTrigger>
            <TabsTrigger value="expired" className="gap-2">
              Expired
              <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs">
                {todoStatus.expired}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">{renderTodoList(filteredTodos)}</TabsContent>
          <TabsContent value="pending">
            {renderTodoList(
              filteredTodos.filter(
                (todo) => !todo.completed && !isExpired(todo.dueDate),
              ),
            )}
          </TabsContent>
          <TabsContent value="completed">
            {renderTodoList(filteredTodos.filter((todo) => todo.completed))}
          </TabsContent>
          <TabsContent value="expired">
            {renderTodoList(
              filteredTodos.filter(
                (todo) => !todo.completed && isExpired(todo.dueDate),
              ),
            )}
          </TabsContent>
        </Tabs>
      </div>
      {/* Calendar Sidebar */}
      <div className="shrink-0 pr-5">
        <div className="sticky top-6 rounded-xl border bg-card p-6">
          <h3 className="mb-5 text-lg font-medium text-foreground">Calendar</h3>
          <Calendar
            mode="single"
            key={selectedDate ? `calendar-${selectedDate}` : "calendar-empty"}
            selected={
              selectedDate ? new Date(`${selectedDate}T00:00:00`) : undefined
            }
            onDayClick={(e) => handleSelectDate(e.toISOString().split("T")[0])}
            modifiers={{
              hasTodo: todoDates,
            }}
            modifiersClassNames={{
              hasTodo: "bg-primary/20 text-primary font-semibold",
            }}
            className="mx-auto p-0 [--cell-size:44px]"
          />
          {selectedDate && (
            <Button
              onClick={handleClearDate}
              className="mt-5 w-full rounded-md bg-muted px-3 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Clear date filter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
