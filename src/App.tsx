import { RouterProvider } from 'react-router-dom';
import routerConfig from './router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={routerConfig} />
    </>
  );
}

export default App;
