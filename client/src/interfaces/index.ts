export interface Task {
  id:
    | "index"
    | "desc"
    | "priority"
    | "title"
    | "startDate"
    | "dueDate"
    | "action";
  label: String;
  minWidth?: number;
  align?: "center" | "left";
}

export const TaskColumns: Task[] = [
  { id: "index", label: "No", align: "center" },
  { id: "title", label: "Title", align: "center" },
  { id: "desc", label: "Description", minWidth: 170, align: "center" },
  { id: "startDate", label: "Start Date", minWidth: 170, align: "center" },
  { id: "dueDate", label: "Due Date", minWidth: 170, align: "center" },
  { id: "priority", label: "Priority", minWidth: 170, align: "center" },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

export interface TaskItem {
  desc?: string;
  title?: string;
  startDate?: string;
  dueDate?: string;
  priority?: string;
  assignee?: string;
  attachment?: string;
  el?: any;
  action?: any;
}
