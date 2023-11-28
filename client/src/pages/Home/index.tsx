import { Button } from "@/components/ui/button";
import { logout } from "@/store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import store from "store";
import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import { getAllAssigneesAction } from "@/store/task/taskActions";
import { RootState } from "@/store";
import Search from "@/components/Search";
import CreateTask from "./CreateTask";
import UpdateProfile from "../Auth/UpdateProfile";
import Toast from "@/components/Toast";

export default function Home() {
  const authUser = store.get("user");
  const token = store.get("x-auth-token");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isFetching = useSelector((state: RootState) => state.task.loading);
  const stats = useSelector((state: RootState) => state.task.stats);
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = async () => {
    await logout()(dispatch);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/v1/task/export", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error("Server error:", response);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported-data.xlsx";
      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  useEffect(() => {
    getAllAssigneesAction(token)(dispatch);
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between font-bold text-2xl mb-4 md:text-3xl">
        <h1>Welcome Back, {authUser.names.split(" ")[0]}</h1>
        {isFetching && (
          <div
            className="inline-block ml-4 h-4 w-4 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        )}
        <div className="flex flex-col md:flex-row  w-80 justify-around items-center">
          <div className="rounded-full h-16 w-16">
            <img
              src={`${authUser.photo}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <Button
            className="hover:scale-105 transition-all mt-4 md:mt-0"
            onClick={() => setOpenProfile(true)}
          >
            Edit profile
          </Button>
          <Button
            className="hover:scale-105 transition-all mt-4 md:mt-0"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around mb-8">
        {stats[0] &&
          Object.keys(stats[0]).map((stat: any) => {
            return (
              stat !== "_id" && (
                <div className="border border-blue-400 p-2 w-fit rounded flex">
                  <h1 className="text-2xl font-bold mr-1">{stat} | </h1>
                  <h2 className="text-2xl text-blue-400 font-bold">
                    {stats[0][stat]}
                  </h2>
                </div>
              )
            );
          })}
      </div>
      <div>
        <div className="flex flex-col md:flex-row w-full items-center">
          <div>
            <Button
              className="hover:scale-105 transition-all mt-4 md:mt-0 mr-4"
              onClick={() => setOpen(true)}
            >
              {" "}
              Add Task
            </Button>
            <Button
              className="hover:scale-105 transition-all mt-4 md:mt-0"
              onClick={handleDownload}
            >
              Export data
            </Button>
          </div>
          <div className="flex flex-1 justify-around">
            <Search keyword="title" action="Search" />
            <Search keyword="priority" action="Sort" />
          </div>
        </div>
        {openProfile && (
          <UpdateProfile open={openProfile} setOpen={setOpenProfile} />
        )}

        <TaskTable />
        {open && <CreateTask open={open} setOpen={setOpen} />}
        <Toast />
      </div>
    </div>
  );
}
