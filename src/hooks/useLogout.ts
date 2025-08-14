import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setAuth } from "@/redux/features/authSlice";
import { resetTheme } from "@/redux/features/themeSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to logout.",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    });

    if (result.isConfirmed) {
      try {
        dispatch(setAuth({ token: null, user: {} }));
        dispatch(resetTheme());
        localStorage.clear();
        navigate("/login");
      } catch (error) {
        console.error(error instanceof Error ? error.message : "An unknown error occurred.");
      }
    }
  };

  return logOut;
};

export default useLogout;
