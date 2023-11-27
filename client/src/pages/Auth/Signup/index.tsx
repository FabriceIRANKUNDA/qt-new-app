import AuthLayout from "@/Layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PHONE_REGEX } from "@/utils/data";
import { validateForm } from "@/utils/validateForm";
import { inputInvalid } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "@/store/auth/authActions";
import { RootState } from "@/store";
import Loader from "@/components/Loader";

export default function SignUp() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [state, setState] = useState({
    names: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    formErrors: {
      phone: "",
      confirmPassword: "",
      names: "",
      email: "",
      password: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let tempErrors = { ...state.formErrors };

    switch (name) {
      case "names":
        tempErrors.names = value.length < 0 ? "Names are required" : "";
        break;

      case "phone":
        tempErrors.phone =
          PHONE_REGEX.test(value) === false ? "Phone is required" : "";
        break;

      case "email":
        tempErrors.email =
          EMAIL_REGEX.test(value) === false ? "Invalid email" : "";
        break;

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
      email: state.email,
      password: state.password,
      phone: state.phone,
      names: state.names,
      confirmPassword: state.confirmPassword,
    };

    let tempErrors = {
      ...state.formErrors,
      email: state.email ? "" : "Invalid email",
      phone: state.phone ? "" : "Phone is required",
      names: state.names ? "" : "Names are required",
      password: state.password ? "" : "Password can't be empty",
    };

    setState({ ...state, formErrors: tempErrors });

    if (validateForm(state, tempErrors)) {
      signUpAction({ ...data })(dispatch);
    }
  };

  return (
    <AuthLayout title="Sign Up" secondary={<SecondarySection />}>
      <Fragment>
        <div className="flex flex-col self-stretch w-full gap-3">
          <div className="flex flex-col justify-evenly h-80">
            <Input
              placeholder="First and Last Name"
              type="text"
              name="names"
              className={`${state.formErrors.names ? inputInvalid : ""}`}
              onChange={handleChange}
            />
            <Input
              placeholder="email"
              type="text"
              name="email"
              className={`${state.formErrors.email ? inputInvalid : ""}`}
              onChange={handleChange}
            />
            <Input
              placeholder="phone"
              type="text"
              name="phone (078..."
              className={`${state.formErrors.phone ? inputInvalid : ""}`}
              onChange={handleChange}
            />
            <Input
              placeholder="password"
              type="password"
              name="password"
              className={`${state.formErrors.password ? inputInvalid : ""}`}
              onChange={handleChange}
            />
            <Input
              placeholder="confirm password"
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
    </AuthLayout>
  );
}

const SecondarySection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center self-stretch">
      <h4 className="text-sm font-medium dark:text-white">
        Already have an account?
      </h4>
      <Button
        onClick={() => navigate("/auth/login")}
        variant="basic"
        className="w-full hover:scale-105 transition-all"
        size="lg"
      >
        Login
      </Button>
    </div>
  );
};
