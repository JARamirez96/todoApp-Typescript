import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category, Inputs } from "../types/todo-types";
import { useTodo } from "../hooks/useTodo";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initState: Inputs = {
  title: "",
  description: "",
  category: "" as Category,
  dueDate: new Date(),
};

// TODO: Ver la forma para desactivar el editing del todo sin tener que presionar cancelar
export const TodoForm = () => {
  const [open, setOpen] = useState(false);

  const todos = useTodo((state) => state.todos);
  const activeId = useTodo((state) => state.activeId);

  const { addTodo, updateTodo, setActiveId } = useTodo(
    (state) => state.actions,
  );

  const todoToEdit = todos.find((todo) => todo.id === activeId);

  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: initState,
  });

  const onSubmit = (data: Inputs) => {
    if (activeId) {
      updateTodo(activeId, data);
      setActiveId(null);
    } else {
      addTodo(data);
    }
    reset(initState);
  };

  useEffect(() => {
    if (todoToEdit) {
      reset({
        title: todoToEdit.title,
        dueDate: new Date(todoToEdit.dueDate),
        description: todoToEdit.description,
        category: todoToEdit.category,
      });
    } else {
      reset(initState);
    }
  }, [todoToEdit, reset]);

  return (
    <div className="lg:pl-5 md:m-auto">
      <Card className={cn(activeId && "ring-2 ring-primary border-primary")}>
        <CardHeader>
          <CardTitle className="text-2xl">
            {activeId ? "Updating Task" : "New Task"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              {/* Title*/}
              <Controller
                control={control}
                name="title"
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Task name..."
                    className="flex-1"
                  />
                )}
              />

              <div className="flex items-center gap-3">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="dueDate"
                  render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-2/3 h-9 justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarDays className="size-4" />
                          {field.value
                            ? field.value.toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                              })
                            : "Date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpen(false);
                          }}
                          disabled={{ before: new Date() }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-ring/50 focus:ring-[3px] w-1/3"
                    >
                      <option value="">N/A</option>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  )}
                />
              </div>

              {/*  Description */}
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Description (optional)..."
                    className="resize-none"
                    rows={2}
                  />
                )}
              />
            </div>
            {/* Add/Update and Cancel Button */}
            <div className="flex justify-end gap mt-4">
              {activeId && (
                <Button
                  type="button"
                  onClick={() => {
                    setActiveId(null);
                    reset(initState);
                  }}
                  className="mr-2"
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">{!activeId ? "Add" : "Update"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
