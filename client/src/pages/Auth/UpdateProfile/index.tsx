import Dialog from "@/components/Dialog";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store";
import { EMAIL_REGEX } from "@/utils/data";
import { validateForm } from "@/utils/validateForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "store";
import { updateUserAction } from "@/store/auth/authActions";

type Props = { open: boolean; setOpen: (open: boolean) => void };

export default function UpdateProfile({ open, setOpen }: Props): JSX.Element {
  const user = store.get("user");
  const token = store.get("x-auth-token");
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    names: user.names || "",
    email: user.email || "",
    formErrors: {
      names: "",
      email: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let tempErrors = { ...state.formErrors };

    switch (name) {
      case "names":
        tempErrors.names = value.length < 0 ? "Names are required" : "";
        break;

      case "email":
        tempErrors.email =
          EMAIL_REGEX.test(value) === false ? "Invalid email" : "";
        break;

      default:
        break;
    }

    setState({ ...state, [name]: value, formErrors: tempErrors });
  };

  const handleSubmit = () => {
    const data = {
      names: state.names,
      email: state.email,
    };

    let tempErrors = {
      ...state.formErrors,
      names: state.names ? "" : "Names are required",
      email: state.email ? "" : "Invalid email",
    };

    setState({ ...state, formErrors: tempErrors });
    if (validateForm(state, tempErrors)) {
      updateUserAction({ ...data, id: user.id, token })(dispatch);
    }
  };

  const cancelHandler = () => {
    setState({
      names: user.names || "",
      email: user.email || "",
      formErrors: {
        names: "",
        email: "",
      },
    });
  };

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      submitText={"Update"}
      title={"Update Profile"}
      onSubmit={handleSubmit}
      isLoading={loading}
      onCancel={cancelHandler}
    >
      <div className="flex flex-col">
        <h1>Name</h1>
        <Input
          placeholder="Name"
          name="names"
          value={state.names}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <h1>Email</h1>
        <Input
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
      </div>
    </Dialog>
  );
}
