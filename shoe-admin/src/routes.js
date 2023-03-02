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
import OrderDetails from './pages/OrderDetails';
import Categories from './pages/Categories';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import EditCategory from './pages/EditCategory';
import CreateCategory from './pages/CreateCategory';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import ProductListDetail from './pages/ProductListDetail';
import ProductSingleDetail from './pages/ProductSingleDetail';
import UpdateOrder from './pages/UpdateOrder';
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
        { path: 'create-category', element: <CreateCategory /> },
        { path: 'edit-category', element: <EditCategory /> },
        { path: 'products', element: <Products /> },
        { path: 'posts', element: <Posts /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'orders', element: <Orders /> },
        { path: 'create-product', element: <CreateProduct /> },
        { path: 'product/:id', element: <ProductListDetail /> },
        { path: 'product-detail/:id', element: <ProductSingleDetail /> },
        { path: 'order-details', element: <OrderDetails /> },
        { path: 'create-post', element: <CreatePost /> },
        { path: 'edit-post/:id', element: <EditPost /> },
        { path: 'post-detail/:id', element: <PostDetail /> },
        { path: 'edit-product/:id', element: <EditProduct /> },
        { path: 'update-order', element: <UpdateOrder /> },

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