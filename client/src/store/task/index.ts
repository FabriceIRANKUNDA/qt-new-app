import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  assignees: [],
  projects: [],
  stats: [],
  loading: false,
  count: 0,
  error: null,
  updateNeeded: true,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.data;
      state.updateNeeded = false;
      state.count = action.payload.count;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUpdateNeeded: (state, action) => {
      state.updateNeeded = action.payload;
    },
    setAssignees: (state, action) => {
      state.assignees = action.payload.assignees;
      state.projects = action.payload.projects;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
      state.loading = false;
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
