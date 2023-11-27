import { Dispatch } from "@reduxjs/toolkit";
import { authActions } from ".";
import API from "@/utils/API";
import store from "store";
import { messageActions } from "../message";
import { tr } from "date-fns/locale";

export const loginAction = (data: { password: string; email: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.setLoading(true));
      const res = await API.auth("/auth/login", data);
      if (res.data.status === "success") {
        dispatch(authActions.login(res.data));
        dispatch(
          messageActions.setMessage({ message: res.data.message, type: "info" })
        );
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    }
  };
};
export const resetPasswordAction = (data: { phone: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.setLoading(true));
      const res = await API.auth("/auth/forget-password", data);
      if (res.data.status === "success") {
        authActions.resetPassword({ reset: true, otpVerified: false });
        messageActions.setMessage({ message: res.data.message, type: "info" });
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const verfiyOTPAction = (data: { otp: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.setLoading(true));
      const res = await API.auth("/auth/verify-otp", data);
      if (res.data.status === "success") {
        authActions.resetPassword({ otpVerified: true, reset: false });
        messageActions.setMessage({ message: res.data.message, type: "info" });
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      dispatch(
        messageActions.setMessage({ message: err.message, type: "error" })
      );
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const signUpAction = (data: {
  password: string;
  email: string;
  phone: string;
  names: string;
  confirmPassword: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.setLoading(true));
      const res = await API.auth("/auth/signup", data);
      if (res.data.status === "success") {
        dispatch(authActions.signup(res.data));
        messageActions.setMessage({ message: res.data.message, type: "info" });
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const updateUserAction = (data: object) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.setLoading(true));
      const res = await API.auth("/auth/me", data);
      if (res.data.status === "success") {
        dispatch(authActions.login(res.data));
        messageActions.setMessage({ message: res.data.message, type: "info" });
      } else {
        dispatch(
          messageActions.setMessage({ message: res.message, type: "error" })
        );
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(authActions.setLoading(true));
    store.set("x-auth-token", "");
    store.set("user", "");
    dispatch(authActions.logout({}));
    dispatch(
      messageActions.setMessage({
        message: "logged out successfully",
        type: "error",
      })
    );
    dispatch(authActions.setLoading(false));
  };
};
