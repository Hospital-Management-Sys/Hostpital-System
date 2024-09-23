import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/thunks/authThunks/authThunk";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../redux/slices/authSlice/authSlice";
const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const profilePicture = event.target.elements.picture;
    const isDoctor = event.target.elements.isDoctor;
    const data = new FormData();
    if (isDoctor !== undefined) {
      data.append("isDoctor", isDoctor.checked);
    }
    if (profilePicture !== undefined) {
      data.append("picture", profilePicture.files[0]);
    }
    data.append("email", event.target.elements.email.value);
    data.append("password", event.target.elements.password.value);

    data.append("phone", event.target.elements.number?.value || "");
    data.append("recordID", event.target.elements.record?.value || "");
    data.append("name", event.target.elements.name?.value || "");

    if (auth.isLogin) {
      dispatch(loginUser(data));

      if (auth.statusCode == 201) {
        dispatch(setLoggedIn());
        sessionStorage.setItem("isLoggedIn", true);
        navigate("/");
      }
    } else {
      dispatch(registerUser(data));

      sessionStorage.setItem("isLoggedIn", true);
      if (auth.statusCode == 201) {
        dispatch(setLoggedIn());
        sessionStorage.setItem("isLoggedIn", true);
        navigate("/");
      }
    }
  };
  return { handleSubmit, role: auth.role };
};

export default useAuth;
