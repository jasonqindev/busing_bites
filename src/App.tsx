import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from 'services/auth';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const authContext = { token, setToken };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <>
      <Toaster />
      <AuthContext.Provider value={authContext}>
        <RouterProvider router={routerConfig} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
