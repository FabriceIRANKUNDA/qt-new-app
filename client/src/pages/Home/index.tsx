import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Dialog from "@/components/Dialog";
import { logout } from "@/store/auth/authActions";
import { useDispatch } from "react-redux";
import store from "store";
import { useState } from "react";
import TaskTable from "./TaskTable";

export default function Home() {
  const authUser = store.get("user");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    startDate: "",
    endDate: "",
    assignee: "",
    project: "",
    description: "",
    priority: "",
    attach: "",
    formErrors: {
      name: "",
      startDate: "",
      endDate: "",
      assignee: "",
      project: "",
      description: "",
      priority: "",
      attach: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let tempErrors = { ...state.formErrors };

    switch (name) {
      case "name":
        tempErrors.name = value.length < 0 ? "Name is required" : "";
        break;

      case "startDate":
        tempErrors.startDate = value.length < 0 ? "Start Date is required" : "";
        break;

      case "endDate":
        tempErrors.endDate = value.length < 0 ? "End Date is required" : "";
        break;

      case "assignee":
        tempErrors.assignee = value.length < 0 ? "Assignee is required" : "";
        break;

      case "project":
        tempErrors.project = value.length < 0 ? "Project is required" : "";
        break;

      case "description":
        tempErrors.description =
          value.length < 0 ? "Description is required" : "";
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

    setState({ ...state, [name]: value, formErrors: tempErrors });
  };

  const handleSubmit = () => {};

  const handleLogout = async () => {
    await logout()(dispatch);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between font-bold text-2xl md:text-3xl">
        <h1>Welcome Back, {authUser.names.split(" ")[0]}</h1>
        <div className="flex flex-col md:flex-row  w-52 justify-around items-center">
          <div className="rounded-full h-16 w-16">
            <img
              src={`${authUser.photo}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <Button
            className="hover:scale-105 transition-all mt-4 md:mt-0"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
      <div>
        <Button
          className="hover:scale-105 transition-all mt-4 md:mt-0"
          onClick={() => setOpen(true)}
        >
          {" "}
          Add Task
        </Button>
        <Dialog
          open={open}
          setOpen={setOpen}
          submitText="Submit"
          title="Create Task"
        >
          <div className="flex flex-col">
            <h1>Name</h1>
            <Input placeholder="Name" />
          </div>
          <div className="flex justify-between">
            <div>
              <h1>Start Date</h1>
              <Input type="Date" />
            </div>
            <div>
              <h1>End Date</h1>
              <Input type="Date" />
            </div>
          </div>
          <div>
            <h1>Assignee</h1>
            <Input placeholder="Assignee" type="select" />
          </div>
          <div>
            <h1>Project</h1>
            <Input placeholder="Assignee" type="select" />
          </div>
          <div>
            <h1>Description</h1>
            <textarea placeholder="Assignee" rows={3} className="p-2 rounded" />
          </div>
          <div>
            <h1>Priority</h1>
            <div className="flex w-full justify-between">
              <div className="flex">
                <input type="radio" name="priority" className="mr-2" />
                <h1>Low</h1>
              </div>
              <div className="flex">
                <input type="radio" name="priority" className="mr-2" />
                <h1>Normal</h1>
              </div>
              <div className="flex">
                <input type="radio" name="priority" className="mr-2" />
                <h1>High</h1>
              </div>
            </div>
          </div>
          <div>
            <h1>Attach</h1>
            <input type="file" />
          </div>
        </Dialog>
        <TaskTable />
      </div>
    </div>
  );
}
