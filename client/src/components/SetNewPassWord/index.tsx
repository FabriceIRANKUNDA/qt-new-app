import { validateForm } from "@/utils/validateForm";
import React, { useState, Fragment } from "react";
import { Input, inputInvalid } from "../ui/input";
import Loader from "../Loader";
import { Button } from "../ui/button";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "@/store/auth/authActions";

export default function SetNewPassWord() {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
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
          value.length < 8 && value !== state.password
            ? "Invalid password"
            : "";
        break;
      default:
        break;
    }

    setState({ ...state, [name]: value, formErrors: tempErrors });
  };

  const handleSubmit = () => {
    const data = {
      password: state.password,

      confirmPassword: state.confirmPassword,
    };

    let tempErrors = {
      ...state.formErrors,
      password: state.password ? "" : "Password can't be empty",
    };

    setState({ ...state, formErrors: tempErrors });

    if (validateForm(state, tempErrors)) {
      updateUserAction({ ...data })(dispatch);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col self-stretch w-full gap-3">
        <p className=" text-center ">
          Enter your phone number to reset password
        </p>
        <div className="flex flex-col justify-evenly h-40">
          <Input
            placeholder="new password"
            type="text"
            name="password"
            className={`${state.formErrors.password ? inputInvalid : ""}`}
            onChange={handleChange}
          />
          <Input
            placeholder="confirm new password"
            type="text"
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
