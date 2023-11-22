import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "context/auth-context";
import { useContext } from "react";

function RequireAuth({ children }: { children:JSX.Element }) {
  const { currentUser } = useContext(AuthContext)
  let location = useLocation()

  if (!currentUser) {
    return <Navigate to="/auth/login" state={ { from: location } } replace />;
  }

  return children;
}

export default RequireAuth
