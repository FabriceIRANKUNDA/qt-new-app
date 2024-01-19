import Dialog from "@/components/Dialog";
import { Input, inputInvalid } from "@/components/ui/input";
import { validateForm } from "@/utils/validateForm";
import { useState } from "react";
import { createTaskAction, updateTaskAction } from "@/store/task/taskActions";
import { RootState } from "@/store";
import { taskActions } from "@/store/task";
import { useDispatch, useSelector } from "react-redux";
import store from "store";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  task?: any;
  action?: string;
};

export default function CreateTask({
  open,
  setOpen,
  task,
  action,
}: Props): JSX.Element {
  const { assignees, projects, loading } = useSelector(
    (state: RootState) => state.task
  );

  const token = store.get("x-auth-token");
  const dispatch = useDispatch();
  const [state, setState] = useState({
    title: task?.title || "",
    startDate: task?.startDate || "",
    status: task?.status || "",
    dueDate: task?.dueDate || "",
    assignee: task?.assignee || "",
    project: task?.project || "",
    description: task?.description || "",
    priority: task?.priority || "",
    attach: [] as string[],
    formErrors: {
      title: "",
      startDate: "",
      dueDate: "",
      assignee: "",
      project: "",
      status: "",
      description: "",
      priority: "",
      attach: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let tempErrors = { ...state.formErrors };
    let files: string[] = [];

    if (e.target.files) {
      for (const file of e.target.files) {
        files.push(file);
      }
    }

    switch (name) {
      case "name":
        tempErrors.title = value.length < 0 ? "Name is required" : "";
        break;

      case "startDate":
        tempErrors.startDate = value.length < 0 ? "Start Date is required" : "";
        break;

      case "endDate":
        tempErrors.dueDate = value.length < 0 ? "End Date is required" : "";
        break;

      case "assignee":
        tempErrors.assignee = value.length < 0 ? "Assignee is required" : "";
        break;

      case "project":
        tempErrors.project = value.length < 0 ? "Project is required" : "";
        break;

      case "description":
        tempErrors.description =
          value.length > 50 ? "Description is required" : "";
        break;

      case "priority":
        tempErrors.priority = value.length < 0 ? "Priority is required" : "";
        break;

      case "attach":
        tempErrors.attach = value.length < 0 ? "Attach is required" : "";
        break;

      default:
        break;
    }
    if (e.target.name === "attach") {
      setState({ ...state, [name]: files, formErrors: tempErrors });
      return;
    }
    setState({ ...state, [name]: value, formErrors: tempErrors });
  };

  const cancelHandler = () => {
    setOpen(false);
    setState({
      title: "",
      startDate: "",
      dueDate: "",
      assignee: "",
      project: "",
      description: "",
      priority: "",
      status: "",
      attach: [],
      formErrors: {
        title: "",
        startDate: "",
        dueDate: "",
        status: "",
        assignee: "",
        project: "",
        description: "",
        priority: "",
        attach: "",
      },
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("startDate", state.startDate);
    formData.append("dueDate", state.dueDate);
    formData.append("assignee", state.assignee);
    formData.append("project", state.project);
    formData.append("description", state.description);
    formData.append("priority", state.priority);

    for (let file of state.attach) {
      formData.append("files", file);
    }

    let tempErrors = {
      ...state.formErrors,
      name: state.title ? "" : "Name is required",
      startDate: state.startDate ? "" : "Start Date is required",
      dueDate: state.dueDate ? "" : "End Date is required",
      assignee: state.assignee ? "" : "Assignee is required",
      project: state.project ? "" : "Project is required",
      description: state.description ? "" : "Description is required",
      priority: state.priority ? "" : "Priority is required",
      attach: state.attach.length > 0 ? "" : "Attach is required",
    };

    setState({ ...state, formErrors: tempErrors });
    if (validateForm(state, tempErrors)) {
      dispatch(taskActions.setLoading(true));
      createTaskAction(formData, token)(dispatch);
    }
  };

  const handleUpdate = async () => {
    updateTaskAction({ ...state, id: task.id }, token)(dispatch);
    cancelHandler();
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      submitText={`${action === "update" ? "Update" : "Create"}`}
      title={action === "update" ? "Update Task" : "Create Task"}
      onSubmit={action === "update" ? handleUpdate : handleSubmit}
      isLoading={loading}
      onCancel={cancelHandler}
    >
      <div className="flex flex-col">
        <h1>Title</h1>
        <Input
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={state.title}
          className={`${state.formErrors.title ? inputInvalid : ""}`}
        />
      </div>
      {action === "update" && (
        <div className="flex flex-col">
          <h1>Status</h1>
          <Input
            placeholder="Status"
            onChange={handleChange}
            name="status"
            value={state.status}
            className={`${state.formErrors.status ? inputInvalid : ""}`}
          />
        </div>
      )}
      <div className="flex justify-between">
        <div>
          <h1>Start Date</h1>
          <Input
            type="Date"
            onChange={handleChange}
            value={state.startDate}
            name="startDate"
            className={`${state.formErrors.startDate ? inputInvalid : ""}`}
          />
        </div>
        <div>
          <h1>End Date</h1>
          <Input
            type="Date"
            onChange={handleChange}
            name="dueDate"
            value={state.dueDate}
            className={`${state.formErrors.dueDate ? inputInvalid : ""}`}
          />
        </div>
      </div>
      <div>
        <h1>Assignee</h1>
        <select
          name="assignee"
          className={`w-full p-2 ${
            state.formErrors.assignee ? inputInvalid : ""
          }`}
          onChange={handleChange}
        >
          <option value="">Select Assignee</option>
          {assignees?.map((assignee: any) => {
            return (
              <option key={assignee._id} value={assignee._id}>
                {assignee.names}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <h1>Project</h1>
        <select
          name="project"
          className={`w-full p-2 ${
            state.formErrors.project ? inputInvalid : ""
          }`}
          onChange={handleChange}
        >
          <option value="">Select project</option>
          {projects?.map((project: any) => {
            return (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <h1>Description</h1>
        <textarea
          placeholder="Description should not exceed 50 characters"
          rows={2}
          name="description"
          onChange={handleChange}
          className={`p-2 rounded w-full ${
            state.formErrors.description ? "!border-4 !border-red-500" : ""
          }`}
        />
      </div>
      <div>
        <h1 className={`${state.formErrors.priority ? "text-red-500" : ""}`}>
          Priority
        </h1>
        <div className="flex justify-between w-full">
          <div className="flex">
            <input
              type="radio"
              name="priority"
              value={state.priority || "low"}
              className="mr-2"
              onChange={handleChange}
            />
            <h1>Low</h1>
          </div>
          <div className="flex">
            <input
              type="radio"
              value={state.priority || "normal"}
              name="priority"
              className="mr-2"
              onChange={handleChange}
            />
            <h1>Normal</h1>
          </div>
          <div className="flex">
            <input
              type="radio"
              name="priority"
              className="mr-2"
              value={state.priority || "high"}
              onChange={handleChange}
            />
            <h1>High</h1>
          </div>
        </div>
      </div>
      {action !== "update" && (
        <div>
          <h1 className={`${state.formErrors.attach ? "text-red-500" : ""}`}>
            Attach
          </h1>
          <input
            type="file"
            onChange={handleChange}
            name="attach"
            accept=".pdf"
            multiple={true}
          />
        </div>
      )}
    </Dialog>
  );
}
