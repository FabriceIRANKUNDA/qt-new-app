import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { getTasksAction } from "@/store/task/taskActions";
import { useDispatch } from "react-redux";
import store from "store";

type Props = {
  keyword: string;
  action: string;
};

export default function Search({ keyword, action }: Props) {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const token = store.get("x-auth-token");

  useEffect(() => {
    let timer = setTimeout(() => {
      const query = action === "Search" ? `?title=${state}` : `?&sort=${state}`;
      if (state) {
        getTasksAction(query, token)(dispatch);
      } else {
        getTasksAction(`?&page=${0}&limit=${25}`, token)(dispatch);
      }
    }, 1300);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, state, token]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <div>
      <Input
        value={state}
        placeholder={`${action} Tasks By ${
          action === "Search" ? "Title" : "Column"
        } `}
        onChange={handleChange}
      />
    </div>
  );
}
