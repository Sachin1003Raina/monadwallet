import { authActions } from "../reducers/auth";

import axios from "axios";
import router from "next/router";

export const url = "http://localhost:4000/user";

export const baseUrl = "http://localhost:4000";

export const signUp = async (body) => {
  try {
    console.log("body", body);
    const response = await axios({
      method: "post",
      url: `${url}/signup`,
      data: body,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const verify = (code, number) => {
  return async (dispatch) => {
    var bodyJsonData = { code, number };
    try {
      console.log("data", bodyJsonData);
      const response = await axios({
        method: "post",
        url: `${url}/signup/verify`,
        data: bodyJsonData,
      });
      dispatch(
        authenticate({
          token: response.data.token,
          isLoggedIn: !!response.data.token,

          user: response?.data?.user,
        })
      );

      router.replace("/");
      saveDataToStorage(response.data.token);
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
};

export const authenticate = (values) => {
  return (dispatch) => {
    dispatch(authActions.login(values));
  };
};

export const login = (password, number) => {
  return async (dispatch) => {
    let bodyJsonData = { password, number };
    try {
      let response = await axios({
        method: "post",
        url: `${url}/login`,
        data: bodyJsonData,
        withCredentials: true,
      });
      dispatch(
        authenticate({
          token: response.data.token,
          isLoggedIn: !!response.data.token,
          user: response?.data?.user,
        })
      );

      await router.push("/");

      saveDataToStorage(response.data.token);
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  };
};

export const logout = (token) => {
  return async (dispatch) => {
    await axios.post(
      `${url}/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(authActions.logout());

    clearStorage();
  };
};

export const clearStorage = () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {}
};

const saveDataToStorage = (token, number, username) => {
  localStorage.setItem("token", token);
};
