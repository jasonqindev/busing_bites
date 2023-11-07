import React from 'react';

export type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
};

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
