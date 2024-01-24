import axios from "axios";

const rootAPI = import.meta.env.VITE_ROOT_API;
const userAPI = rootAPI + "/users";
const catAPI = rootAPI + "/categories";

const productAPI = rootAPI + "/products";

const getAccessJWT = () => {
  return sessionStorage.getItem("accessJWT");
};
const getRefreshJWT = () => {
  return localStorage.getItem("refreshJWT");
};
const apiProcessor = async ({ method, url, data, isPrivate, refreshToken }) => {
  try {
    const token = refreshToken ? getRefreshJWT() : getAccessJWT();
    const headers = {
      Authorization: isPrivate ? token : null,
    };
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    if (error.response?.data?.message.includes("jwt expired")) {
      const { accessJWT } = await fetchNewAccessJWT();

      if (accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
        return apiProcessor({ method, url, data, isPrivate, refreshToken });
      }
    }
    return {
      status: "error",
      message: error.message,
    };
  }
};

// ============ user api

// create user
export const postNewAdmin = (data) => {
  return apiProcessor({
    method: "post",
    url: userAPI,
    data,
  });
};
export const postVerifyEmail = (data) => {
  return apiProcessor({
    method: "post",
    url: userAPI + "/verify-email",
    data,
  });
};
export const postSignIn = (data) => {
  return apiProcessor({
    method: "post",
    url: userAPI + "/signin",
    data,
  });
};
export const fetchAUser = () => {
  return apiProcessor({
    method: "get",
    url: userAPI,
    isPrivate: true,
  });
};

//request new accessJWT
export const fetchNewAccessJWT = () => {
  return apiProcessor({
    method: "get",
    url: userAPI + "/get-accessjwt",
    isPrivate: true,
    refreshToken: true,
  });
};
//logout user
export const logoutUser = (_id) => {
  return apiProcessor({
    method: "post",
    url: userAPI + "/logout",
    data: {
      _id,
      accessJWT: getAccessJWT(),
    },
  });
};
//logout user
export const requestOTP = (email) => {
  return apiProcessor({
    method: "post",
    url: userAPI + "/request-otp",
    data: {
      email,
    },
  });
};

//reset password
export const resetPassword = (data) => {
  return apiProcessor({
    method: "patch",
    url: userAPI,
    data,
  });
};
//update password
export const updatePassword = (data) => {
  return apiProcessor({
    method: "patch",
    url: userAPI + "/password",
    data,
    isPrivate: true,
  });
};

// ======== categories
//get categories
export const fetchCategories = () => {
  return apiProcessor({
    method: "get",
    url: catAPI,
    isPrivate: true,
  });
};
//post categories
export const postCategory = (data) => {
  return apiProcessor({
    method: "post",
    url: catAPI,
    isPrivate: true,
    data,
  });
};

// products===
export const fetchProducts = () => {
  return apiProcessor({
    method: "get",
    url: productAPI,
    isPrivate: true,
  });
};
