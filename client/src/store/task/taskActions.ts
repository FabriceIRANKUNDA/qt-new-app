import { Dispatch } from "@reduxjs/toolkit";
import { taskActions } from ".";
import API from "@/utils/API";
import { messageActions } from "../message";

export const getTasksAction = (query: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(taskActions.setLoading(true));
      const res = await API.get(`/task/${query}`, token);

      if (res.data.status === "success") {
        dispatch(
          taskActions.setTasks({ data: res.data.data, count: res.data.count })
        );
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(taskActions.setLoading(false));
    }
  };
};

export const createTaskAction = (data: object, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await API.post("/task", data, token);
      if (res.data.status === "success") {
        dispatch(taskActions.setUpdateNeeded(true));
        dispatch(
          messageActions.setMessage({ message: res.data.message, type: "info" })
        );
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(taskActions.setLoading(false));
    }
  };
};

export const updateTaskAction = (data: any, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(taskActions.setLoading(true));
      const res = await API.update(`/task/${data.id}`, data, token);
      if (res.data.status === "success") {
        dispatch(taskActions.setUpdateNeeded(true));
        dispatch(
          messageActions.setMessage({ message: res.data.message, type: "info" })
        );
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(taskActions.setLoading(false));
    }
  };
};

export const deleteTaskAction = (id: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(taskActions.setLoading(true));
      const res = await API.delete(`/task/${id}`, token);
      if (res.status === 204) {
        dispatch(taskActions.setUpdateNeeded(true));
        dispatch(
          messageActions.setMessage({ message: res.data.message, type: "info" })
        );
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(taskActions.setLoading(false));
    }
  };
};

export const getTaskStatsAction = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(taskActions.setLoading(true));
      const res = await API.get(`/task/stats`, token);
      if (res.data.status === "success") {
        dispatch(taskActions.setStats(res.data.data));
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(taskActions.setLoading(false));
    }
  };
};

export const getAllAssigneesAction = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(taskActions.setLoading(true));
      const res = await API.get(`/task/data`, token);
      if (res.data.status === "success") {
        dispatch(taskActions.setAssignees(res.data.data));
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(taskActions.setLoading(false));
    }
  };
};
