import { LOGIN_PAGE } from "const";
import { useAuth } from "context/auth-context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const { currentUser } = useAuth();
  const nav = useNavigate();

  const checkAuth = () => {
    if (!currentUser) {
      toast.error("please login first!", { duration: 1500 });
      setTimeout(() => nav(LOGIN_PAGE), 1500);
      return false;
    }
    return true;
  };

  return { checkAuth };
};
