import { AuthContext, AuthProvider } from "context/auth-context"

import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

export default AuthLayout