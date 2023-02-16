import { Navigate, useRoutes } from 'react-router-dom';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import NotFound from './pages/Page404';
import HomePage from './pages/HomePage';
import ResetPassword from './pages/ResetPassword';
import SignInOutContainer from './containers';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Introduction from './pages/Introduction';
import News from './pages/News';
import CheckOrder from './pages/CheckOrder';
import Orders from './pages/AccountOrder';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import NewDetail from './pages/NewDetail';
import PaymentInformation from './pages/PaymentInformation';
import OrderReceived from './pages/OrderReceived';
import ChangePassword from './pages/ChangePassword';
import AccountOrder from './pages/AccountOrder';
import UpdateDeliveryAddress from './pages/UpdateDeliveryAddress';
import AccountTransaction from './pages/AccountTransaction';
import PaymentAutoBank from './pages/PaymentAutoBank';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([

    {
      path: '/payment-autobank/:code',
      element: <PaymentAutoBank />,
    },
    {
      path: '/account-transaction',
      element: <AccountTransaction />,
    },
    {
      path: '/account-profile',
      element: <Profile />,
    },
    {
      path: '/change-password',
      element: <ChangePassword />,
    }, {

      path: '/account-order',
      element: <AccountOrder />,
    },
    {
      path: '/shop',
      element: <Shop />,
    },
    {
      path: '/product-detail/:id',
      element: <ProductDetail />
    },
    {
      path: '/contact-us',
      element: <Contact />,
    },
    {
      path: '/news',
      element: <News />,
    },
    {
      path: '/new-detail/:id',
      element: <NewDetail />
    },
    {
      path: '/introduction',
      element: <Introduction />,
    },
    {
      path: '/check-order',
      element: <CheckOrder />,
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
      path: '/order-received',
      element: <OrderReceived />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
    {
      path: '/payment-infor',
      element: <PaymentInformation />,
    },
    {
      path: '/update-delivery-address',
      element: <UpdateDeliveryAddress />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <HomePage /> },
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
