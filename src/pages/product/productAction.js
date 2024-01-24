import { toast } from "react-toastify";
import {
  fetchCategories,
  fetchProducts,
  postCategory,
} from "../../helpers/axiosHelper";
import { setProductList } from "./productSlice";
// import { useDispatch } from "react-redux";

// import { setCatList } from "./categorySlice";

export const getAllProducts = () => async (dispatch) => {
  const { status, product } = await fetchProducts();
  if (status === "success") {
    dispatch(setProductList(product));
  }
};

// export const postNewCat = (obj) => async (dispatch) => {
//   const pending = postCategory(obj);
//   toast.promise(pending, {
//     pending: "please wait...",
//   });

//   const { status, message } = await pending;
//   toast[status](message);
//   status === "success" && dispatch(getAllCats());
// };
