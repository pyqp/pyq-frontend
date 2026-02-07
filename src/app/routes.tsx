import { createBrowserRouter } from 'react-router-dom';
import Layout from '../../src/pages/Layout';
import About from '../../src/pages/About';
import Pricing from '../../src/pages/Pricing';
import Login from '../../src/features/auth/Login';
import Register from '../features/auth/Register';
import NotFound from '../../src/pages/NotFound';
import ForgetPassword from '../features/auth/ForgetPassword';
import MockTest from '../pages/Mocktest';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // This will show Navbar, Hero, Footer
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>, // This will show Navbar, About content, Footer
  },
  {
    path: '/pricing',
    element: <Layout><Pricing /></Layout>, // This will show Navbar, Pricing content, Footer
  },
  {
    path: '/login',
    element: <Login />, // Login page without Layout (no Navbar/Footer)
  },
    {
    path: '/signup',
    element: <Register />, // Login page without Layout (no Navbar/Footer)
  },
  {
   path: '/forgot-password',
    element: <ForgetPassword />, 
  },
  {
    path: '/mock-tests',
    element: <MockTest/>
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>, // This will show Navbar, 404 content, Footer
  },
]);