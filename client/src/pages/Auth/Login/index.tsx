import AuthLayout from "@/Layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "@/utils/data";
import { validateForm } from "@/utils/validateForm";
import { inputInvalid } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "@/store/auth/authActions";
import { RootState } from "@/store";
import Loader from "@/components/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    formErrors: {
      email: "",
      password: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let tempErrors = { ...loginState.formErrors };

    switch (name) {
      case "email":
        tempErrors.email =
          EMAIL_REGEX.test(value) === false ? "Invalid email" : "";
        break;
      case "password":
        tempErrors.password = value.length < 8 ? "Invalid password" : "";
        break;
      default:
        break;
    }

    setLoginState({ ...loginState, [name]: value, formErrors: tempErrors });
  };

  const handleSubmit = () => {
    const data = {
      email: loginState.email,
      password: loginState.password,
    };

    let tempErrors = {
      ...loginState.formErrors,
      email: loginState.email ? "" : "Invalid email",
      password: loginState.password ? "" : "Password can't be empty",
    };

    setLoginState({ ...loginState, formErrors: tempErrors });

    if (validateForm(loginState, tempErrors)) {
      loginAction({ ...data })(dispatch);
    }
  };

  return (
    <AuthLayout title="Sign In" isReset={true} secondary={<SecondarySection />}>
      <Fragment>
        <div className="flex flex-col self-stretch w-full gap-3">
          <div className="flex flex-col justify-evenly h-40">
            <Input
              placeholder="email"
              type="text"
              name="email"
              className={`${loginState.formErrors.email ? inputInvalid : ""}`}
              onChange={handleChange}
            />
            <Input
              placeholder="password"
              type="password"
              name="password"
              className={`${
                loginState.formErrors.password ? inputInvalid : ""
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
    <div className="flex flex-col items-center self-stretch gap-3">
      <h4 className="text-sm font-medium dark:text-white font-montAlt">
        Don’t have an account?
      </h4>
      <Button
        onClick={() => navigate("/auth/sign-up")}
        variant="basic"
        className="w-full hover:scale-105 transition-all"
        size="lg"
      >
        Create New Account
      </Button>
    </div>
  );
};
