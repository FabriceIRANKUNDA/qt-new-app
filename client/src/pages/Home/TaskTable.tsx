import React, { useEffect } from "react";
import { TaskItem, TaskColumns } from "@/interfaces";
import { useState } from "react";
import TableComponent from "@/components/Table";
import Dialog from "@/components/Dialog";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasksAction,
  deleteTaskAction,
  getTaskStatsAction,
} from "@/store/task/taskActions";
import { taskActions } from "@/store/task";
import { RootState } from "@/store";
import store, { set } from "store";
import Moment from "moment";
import { Menu, MenuItem, Typography } from "@mui/material";
import ConfirmModal from "@/components/ConfirmModal";
import CreateTask from "./CreateTask";

export default function TaskTable() {
  const [task, setTask] = useState<any>(undefined);
  const token = store.get("x-auth-token");
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { tasks, count, updateNeeded } = useSelector(
    (state: RootState) => state.task
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (updateNeeded) {
      getTasksAction(
        `?&page=${page}&sort=-updatedAt&limit=${rowsPerPage}`,
        token
      )(dispatch);
      getTaskStatsAction(token)(dispatch);
    }
  }, [page, rowsPerPage, token, updateNeeded, dispatch]);

  const createData = (
    title: string,
    desc: string,
    priority: string,
    startDate: string,
    dueDate: string,
    assignee: string,
    el: any
  ): TaskItem => {
    return {
      title,
      desc,
      priority,
      startDate,
      dueDate,
      assignee,
      el,
      action: (
        <>
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              let taskInfo = { ...el };
              delete taskInfo["_id"];
              let obj = { ...taskInfo };
              setTask(obj);
              setAnchorEl(event.currentTarget);
            }}
            className=""
          >
            •••
          </button>
        </>
      ),
    };
  };

  const rows = tasks?.map((item: any) =>
    createData(
      item.title,
      item.description,
      item.priority,
      Moment(item.startDate).format("d MMM YYYY"),
      Moment(item.dueDate).format("d MMM YYYY"),
      item.assignee,
      item
    )
  );

  const handlePageChange = (event: unknown, newPage: number) => {
    dispatch(taskActions.setUpdateNeeded(true));
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(taskActions.setUpdateNeeded(true));
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleDeleteTask = async () => {
    await deleteTaskAction(task.id, token)(dispatch);
    setOpenConfirmModal(false);
  };

  return (
    <div className="py-4">
      <TableComponent
        rows={rows}
        columns={TaskColumns}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
      {open && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setOpenUpdateModal(true);
            }}
          >
            <Typography>Update</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              setOpenConfirmModal(true);
            }}
          >
            <Typography>Delete</Typography>
          </MenuItem>
        </Menu>
      )}
      {openUpdateModal && (
        <CreateTask
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
          task={task}
          action="update"
        />
      )}
      {openConfirmModal && (
        <ConfirmModal
          onConfirm={() => {
            handleDeleteTask();
          }}
          open={openConfirmModal}
          onClose={() => {
            setOpenConfirmModal(false);
          }}
          content={`Please confirm to delete this Task with title: ${task.title}`}
        />
      )}
    </div>
  );
}
