import { validateForm } from "@/utils/validateForm";
import { useState, Fragment } from "react";
import { Input, inputInvalid } from "../ui/input";
import Loader from "../Loader";
import { Button } from "../ui/button";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction } from "@/store/auth/authActions";
import { useNavigate } from "react-router";
type Props = {
  otp: string;
};
export default function SetNewPassWord({ otp }: Props) {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
    formErrors: {
      confirmPassword: "",
      password: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let tempErrors = { ...state.formErrors };

    switch (name) {
      case "password":
        tempErrors.password = value.length < 8 ? "Invalid password" : "";
        break;
      case "confirmPassword":
        tempErrors.confirmPassword =
          value !== state.password ? "Invalid password" : "";
        break;
      default:
        break;
    }

    setState({ ...state, [name]: value, formErrors: tempErrors });
  };

  const handleSubmit = async () => {
    const data = {
      password: state.password,
      confirmPassword: state.confirmPassword,
      otp,
    };

    let tempErrors = {
      ...state.formErrors,
      password: state.password ? "" : "Password can't be empty",
    };

    setState({ ...state, formErrors: tempErrors });

    if (validateForm(state, tempErrors)) {
      await updatePasswordAction({ ...data })(dispatch);
      navigate("/auth/login");
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col self-stretch w-full gap-3">
        <p className=" text-center ">Enter new password</p>
        <div className="flex flex-col justify-evenly h-40">
          <Input
            placeholder="new password"
            type="password"
            name="password"
            className={`${state.formErrors.password ? inputInvalid : ""}`}
            onChange={handleChange}
          />
          <Input
            placeholder="confirm new password"
            type="password"
            name="confirmPassword"
            className={`${
              state.formErrors.confirmPassword ? inputInvalid : ""
            }`}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        variant="basic"
        size="lg"
        className="relative hover:scale-105 transition-all w-full"
        onClick={handleSubmit}
      >
        Submit
        {authState.loading && <Loader />}
      </Button>
    </Fragment>
  );
}
