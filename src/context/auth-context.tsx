import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { signOutUser, userStateListener } from "../firebase/firebase";

import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserinfoType } from "types/userAjax";
import { useGetUserinfo } from "hooks/useLoadUserinfo";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  currentUser: {} as Partial<UserinfoType> | null,
  setCurrentUser: (_user: Partial<UserinfoType>) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const uid = useRef("");
  const [currentUser, setCurrentUser] = useState<Partial<UserinfoType> | null>(
    null
  );
  const navigate = useNavigate();
  const { run: getUserinfo } = useGetUserinfo((res) => {
    setCurrentUser({ ...res, uid: uid.current });
  });

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        uid.current = user.uid;
        getUserinfo(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const signOut = () => {
    signOutUser();
    setCurrentUser(null);
    navigate("/");
  };

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must use in AuthProvider");
  }
  return context;
};
