import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import ChangePassword from './pages/ChangePassword';
import EditProduct from './pages/EditProduct';
import Transactions from './pages/Transactions';
import Orders from './pages/Orders';
import CreateProduct from './pages/CreateProduct';
import CreateMailProduct from './pages/CreateMailProduct';
import OrderDetails from './pages/OrderDetails';
import UpdateRentService from './pages/UpdateRentService';
import Categories from './pages/Categories';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import EditCategory from './pages/EditCategory';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'Categories', element: <Categories /> },
        { path: 'edit-category', element: <EditCategory /> },
        { path: 'products', element: <Products /> },
        { path: 'posts', element: <Posts /> },
        { path: 'edit-product', element: <EditProduct /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'orders', element: <Orders /> },
        { path: 'create-product', element: <CreateProduct /> },
        { path: 'create-mail-product', element: <CreateMailProduct /> },
        { path: 'order-details', element: <OrderDetails /> },
        { path: 'create-post', element: <CreatePost /> },
        { path: 'update-rent-product', element: <UpdateRentService /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,

    },
    {
      path: '/dashboard', element: <DashboardLayout />,
      children: [
        { path: 'change-password', element: <ChangePassword /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}