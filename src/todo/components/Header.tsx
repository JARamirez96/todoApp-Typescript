import { CheckCircle2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="mb-8 flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary">
        <CheckCircle2 className="size-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Todo List
        </h1>
        <p className="text-sm text-muted-foreground">
          Organize your daily tasks.
        </p>
      </div>
    </header>
  );
};
