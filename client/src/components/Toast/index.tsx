import { RootState } from "@/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Toast() {
  const messageState = useSelector((state: RootState) => state.message);
  if (messageState.type === "info") {
    toast.success(messageState.message);
  } else if (messageState.type === "error") {
    toast.error(messageState.message);
  }

  return <></>;
}
