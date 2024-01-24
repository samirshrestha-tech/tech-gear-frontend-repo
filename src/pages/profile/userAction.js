import { fetchAUser, fetchNewAccessJWT } from "../../helpers/axiosHelper";
import { setAdmin } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
  const resp = await fetchAUser();

  if (resp?.user) {
    //send user to redux

    dispatch(setAdmin(resp.user));
  }
};

export const autoLogin = () => async (dispatch) => {
  //check if we have accessJWT, then fetch user

  const accessJWT = sessionStorage.getItem("accessJWT");

  if (accessJWT) {
    return dispatch(getUserProfile());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");

  if (refreshJWT) {
    const token = await fetchNewAccessJWT();
    console.log(token);

    //get accessJWT

    if (token?.accessJWT) {
      sessionStorage.setItem("accessJWT", token?.accessJWT);

      dispatch(getUserProfile());
    }
  }
};
