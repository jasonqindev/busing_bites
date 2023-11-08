import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { AuthProvider } from 'context/auth-context';

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <RouterProvider router={routerConfig} />
      </AuthProvider>
    </>
  );
}

export default App;
