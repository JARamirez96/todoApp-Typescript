import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, CalendarDays, ChevronDown, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Todo } from "../types/todo-types";
import { useTodo } from "../hooks/useTodo";
import { formatDate, isExpired } from "@/utils/date-util";

type TodoItemProps = {
  todo: Todo;
};

const categoryColors = {
  "": "bg-gray-500/20 text-black-400 border-gray-500/30",
  work: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  personal: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  urgent: "bg-red-500/20 text-red-400 border-red-500/30",
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const activeId = useTodo((state) => state.activeId);

  const { setActiveId, deleteTodo, toggleTodo } = useTodo(
    (state) => state.actions,
  );

  const editingTodo = activeId === todo.id;

  const completedStyles = todo.completed ? "opacity-60" : "";

  return (
    <div
      className={cn(
        "group rounded-lg border bg-card transition-colors hover:bg-accent/50",
        editingTodo && "ring-2 ring-primary border-primary",
      )}
    >
      <div className="flex items-center gap-4 p-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
          className={cn("size-5", completedStyles)}
        />

        <div
          className={cn(
            "flex flex-1 items-center gap-2 min-w-0",
            completedStyles,
          )}
        >
          <span
            className={cn(
              "text-sm font-medium leading-none",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.title}
          </span>

          {todo.description && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setExpanded(!expanded)}
              className="size-6 text-muted-foreground hover:text-foreground"
            >
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  expanded && "rotate-180",
                )}
              />
              <span className="sr-only">
                {expanded ? "Hide description" : "Show description"}
              </span>
            </Button>
          )}

          {editingTodo && (
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30 text-xs"
            >
              Editing
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-center min-w-25">
          <div
            className={cn(
              "flex items-center gap-1.5 text-xs text-muted-foreground",
              todo.completed
                ? "text-green-600 font-medium"
                : !todo.completed &&
                    isExpired(todo.dueDate) &&
                    "text-red-500 font-medium",
            )}
          >
            <CalendarDays className="size-3.5" />
            {formatDate(todo.dueDate)}
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-center min-w-25",
            completedStyles,
          )}
        >
          <Badge
            variant="outline"
            className={cn(
              "text-xs uppercase tracking-wide",
              categoryColors[todo.category],
            )}
          >
            {todo.category || "N/A"}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setActiveId(todo.id)}
          className={cn(
            "text-muted-foreground hover:text-foreground transition-opacity",
            editingTodo
              ? "opacity-100 text-primary"
              : "opacity-0 group-hover:opacity-100",
            completedStyles,
          )}
        >
          <Pencil className="size-4" />
          <span className="sr-only">Edit Task</span>
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => deleteTodo(todo.id)}
          className={cn(
            "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity",
            completedStyles,
          )}
        >
          <Trash2 className="size-4" />
          <span className="sr-only">Delete Task</span>
        </Button>
      </div>

      {/* Expandable description */}
      {todo.description && expanded && (
        <div className="border-t px-4 py-3">
          <p className="text-sm text-muted-foreground pl-9 line-clamp-2">
            {todo.description}
          </p>
        </div>
      )}
    </div>
  );
};
