import AuthLayout from "@/Layouts/AuthLayout";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input, inputInvalid } from "@/components/ui/input";
import { RootState } from "@/store";
import { resetPasswordAction, verfiyOTPAction } from "@/store/auth/authActions";
import { PHONE_REGEX } from "@/utils/data";
import { validateForm } from "@/utils/validateForm";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpField from "react-otp-field";
import SetNewPassWord from "@/components/SetNewPassWord";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [otp, setOtp] = useState("");

  const [state, setState] = useState({
    phone: "",
    formErrors: {
      phone: "",
    },
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let tempErrors = { ...state.formErrors };

    switch (name) {
      case "phone":
        tempErrors.phone =
          PHONE_REGEX.test(value) === false ? "Invalid phone" : "";
        break;
      default:
        break;
    }

    setState({ ...state, [name]: value, formErrors: tempErrors });
  };

  const handleSubmit = () => {
    const data = {
      phone: state.phone,
    };

    let tempErrors = {
      ...state.formErrors,
      phone: state.phone ? "" : "Invalid phone",
    };

    setState({ ...state, formErrors: tempErrors });

    if (validateForm(state, tempErrors)) {
      resetPasswordAction({ ...data })(dispatch);
    }
  };

  const handleSubmitOtp = () => {
    const data = {
      otp,
    };
    verfiyOTPAction({ ...data })(dispatch);
  };

  return (
    <AuthLayout title="Forget Password">
      <Fragment>
        {!authState.reset ? (
          <>
            <div className="flex flex-col self-stretch w-full gap-3">
              <p className=" text-center ">
                Enter your phone number to reset password
              </p>
              <div className="flex flex-col justify-evenly h-40">
                <Input
                  placeholder="phone (078..."
                  type="text"
                  name="phone"
                  className={`${state.formErrors.phone ? inputInvalid : ""}`}
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
          </>
        ) : (
          <>
            <p className=" text-center ">Enter your code</p>
            <OtpField
              value={otp}
              onChange={(e: any) => {
                setOtp(e);
              }}
              numInputs={4}
              onChangeRegex={/^([0-9]{0,})$/}
              autoFocus
              separator={<span className="m-2"> </span>}
              autoComplete={"on"}
              classNames="flex w-full justify-center"
              inputProps={{
                className: "w-14 p-4 border border-[#1987ff]",
                disabled: false,
              }}
            />
            <Button
              variant="basic"
              size="lg"
              className="relative hover:scale-105 transition-all w-full"
              onClick={handleSubmitOtp}
            >
              Submit
              {authState.loading && <Loader />}
            </Button>
          </>
        )}
        {authState.otpVerified && <SetNewPassWord />}
      </Fragment>
    </AuthLayout>
  );
};

export default ResetPassword;
