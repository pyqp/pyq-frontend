import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';

// AuthProvider is now applied inside the router tree (see router.tsx root layout)
// This is required for React Router v6.4+ data routers — context passed to
// RouterProvider from outside is NOT accessible inside route components.

const App = () => (
  <>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          border:       '3px solid #000',
          padding:      '14px 16px',
          fontFamily:   "'Space Grotesk', sans-serif",
          fontWeight:   '600',
          fontSize:     '14px',
          borderRadius: '0',
          boxShadow:    '4px 4px 0px 0px rgba(0,0,0,1)',
        },
        success: { iconTheme: { primary: '#000', secondary: '#fff' } },
        error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}
    />
  </>
);

export default App;