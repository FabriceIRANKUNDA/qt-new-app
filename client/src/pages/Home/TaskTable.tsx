import React from "react";
import { TaskItem, TaskColumns } from "@/interfaces";
import { useState } from "react";
import TableComponent from "@/components/Table";
import Dialog from "@/components/Dialog";
import { Input } from "@/components/ui/input";

export default function TaskTable() {
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);
  const [task, setTask] = useState<any>(undefined);

  const createData = (
    name: string,
    desc: string,
    priority: string,
    startDate: string,
    dueDate: string,
    assignee: string,
    el: any
  ): TaskItem => {
    return {
      name,
      desc,
      priority,
      startDate,
      dueDate,
      assignee,
      el,
      action: (
        <>
          <button
            onClick={() => {
              let taskInfo = { ...el };
              delete taskInfo["_id"];
              let obj = { taskInfo };
              setTask(obj);
              setOpenTaskDrawer(true);
            }}
          >
            <span className={""}>View Details</span>
          </button>
        </>
      ),
    };
  };

  const data = [
    {
      name: "test",
      startDate: Date.now(),
      dueDate: Date.now(),
      priority: "high",
      assignee: "test",
      desc: "test",
    },
    {
      name: "test",
      startDate: Date.now(),
      dueDate: Date.now(),
      priority: "high",
      assignee: "test",
      desc: "test",
    },
    {
      name: "test",
      startDate: Date.now(),
      dueDate: Date.now(),
      priority: "high",
      assignee: "test",
      desc: "test",
    },
    {
      name: "test",
      startDate: Date.now(),
      dueDate: Date.now(),
      priority: "high",
      assignee: "test",
      desc: "test",
    },
    {
      name: "test",
      startDate: Date.now(),
      dueDate: Date.now(),
      priority: "high",
      assignee: "test",
      desc: "test",
    },
    {
      name: "test",
      startDate: Date.now(),
      dueDate: Date.now(),
      priority: "high",
      assignee: "test",
      desc: "test",
    },
  ];

  const rows = data?.map((item: any) =>
    createData(
      item.name,
      item.desc,
      item.priority,
      item.startDate,
      item.dueDate,
      item.assignee,
      item
    )
  );

  return (
    <div>
      <TableComponent rows={rows} columns={TaskColumns} />
      {task && (
        <Dialog
          open={openTaskDrawer}
          setOpen={setOpenTaskDrawer}
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
      )}
    </div>
  );
}
