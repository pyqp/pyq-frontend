import { createBrowserRouter } from 'react-router-dom';
import Layout from '../../src/pages/Layout';
import About from '../../src/pages/About';
import Pricing from '../../src/pages/Pricing';
import Login from '../../src/features/auth/Login';
import Register from '../features/auth/Register';
import NotFound from '../../src/pages/NotFound';
import ForgetPassword from '../features/auth/ForgetPassword';
import MockTest from '../pages/Mocktest';
import FreePYQs from '../pages/Freepyqs';
import AllExams from '../pages/AllExams';
import ScrollToTop from '../pages/Scrolltotop';
import Blog from '../pages/Blog';
import HowItWorks from '../pages/Howitworks';
import HelpCenter from '../pages/Helpcenter';
import FAQs from '../pages/Faqs';
import ContactUs from '../pages/Contactus';
import RefundPolicy from '../pages/Refundpolicy';
import TermsOfService from '../pages/Termsofservice';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <ScrollToTop />
        <Layout><About /></Layout>
      </>
    ),
  },
  {
    path: '/pricing',
    element: (
      <>
        <ScrollToTop />
        <Layout><Pricing /></Layout>
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <ScrollToTop />
        <Login />
      </>
    ),
  },
  {
    path: '/signup',
    element: (
      <>
        <ScrollToTop />
        <Register />
      </>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <>
        <ScrollToTop />
        <ForgetPassword />
      </>
    ),
  },
  {
    path: '/mock-tests',
    element: (
      <>
        <ScrollToTop />
        <MockTest />
      </>
    ),
  },
  {
    path: '/free-pyqs',
    element: (
      <>
        <ScrollToTop />
        <FreePYQs />
      </>
    ),
  },
  {
    path: '/all-exams',
    element: (
      <>
        <ScrollToTop />
        <AllExams />
      </>
    ),
  },
  {
    path: '/blog',
    element: (<Blog />),
  },
  {
    path: '/how-it-works',
    element: (<HowItWorks/>),
  },
  {
    path: '/help',
    element: (<HelpCenter/>),
  },
  {
    path: '/faq',
    element: (<FAQs/>),
  },
  {
    path: '/contact',
    element: (<ContactUs/>),
  },
  {
    path: '/refund',
    element: (<RefundPolicy/>),
  },
  {
    path: '/terms',
    element: (<TermsOfService/>),
  },
  {
    path: '*',
    element: (
      <>
        <ScrollToTop />
        <Layout><NotFound /></Layout>
      </>
    ),
  },
]);