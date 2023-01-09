import { Navigate, useRoutes } from 'react-router-dom';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import NotFound from './pages/Page404';
import HomePage from './pages/HomePage';
import ForgotPass from './pages/ForgotPass';
import ResetPassword from './pages/ResetPassword';
import SignInOutContainer from './containers';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Introduction from './pages/Introduction';
import News from './pages/News';
import CheckOrder from './pages/CheckOrder';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/account-profile',
      element: <Profile/>,   
    },
    {
      path: '/shop',
      element: <Shop/>,   
    },
    {
      path: '/contact-us',
      element: <Contact/>,   
    },    
    {
      path: '/news',
      element: <News/>,   
    },    
    {
      path: '/introduction',
      element: <Introduction/>,   
    },
    {
      path: '/check-order',
      element: <CheckOrder/>,   
    },
    {
      path: 'login',
      element: <SignInOutContainer />,
    },
    {
      path: 'register',
      element: <SignInOutContainer />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/orders',
      element: <Orders />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <HomePage/> },
        { path: 'forgot-password', element: <ForgotPass /> },
        { path: 'no-auth/forgot-password', element: <ResetPassword /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
