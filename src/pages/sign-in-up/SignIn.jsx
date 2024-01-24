import { Button, Form } from "react-bootstrap";
import { CustomInpute } from "../../components/custom-inpute/CustomInpute";
import { useEffect, useRef } from "react";
import { postSignIn } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin, getUserProfile } from "../profile/userAction";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin } = useSelector((state) => state.adminInfo);

  useEffect(() => {
    // check if user in redux store, if so, redirect to dashboard
    admin?._id && navigate("/dashboard");
    dispatch(autoLogin());
  }, [admin?._id, navigate]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //get email and password from the form using uncontrolled input field
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email && password) {
      //call the api to get login done

      const resPending = postSignIn({ email, password });
      toast.promise(resPending, {
        pending: "Please wait ....",
      });

      const { status, message, jwts } = await resPending;
      toast[status](message);

      if (jwts?.accessJWT) {
        // store the token
        sessionStorage.setItem("accessJWT", jwts.accessJWT);
        localStorage.setItem("refreshJWT", jwts.refreshJWT);
        // get user profile data and store in redux
        dispatch(getUserProfile());
      }
    }
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      required: true,
      placeholder: "John@email.com",
      forwardRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      required: true,
      type: "password",
      placeholder: "xxxxxxx",
      forwardRef: passwordRef,
    },
  ];

  return (
    <div>
      <div className="text-center">Tech Gare Admin cms</div>
      <hr />
      <Form
        onSubmit={handleOnSubmit}
        className="m-auto border rounded shadow-lg p-3 mt-5"
        style={{ width: "500px" }}
      >
        <h3>Admin SignIn only</h3>
        <hr />
        {inputs.map((item, i) => (
          <CustomInpute key={i} {...item} />
        ))}

        <div className="d-grid">
          <Button type="submit">Sign In</Button>
        </div>

        <div className="mt-4 text-end">
          Forget Password? <a href="/reset-password">Reset</a> Now.
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
