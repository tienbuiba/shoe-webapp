import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Users',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  ,
  {
    title: 'Categories',
    path: '/dashboard/Categories',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Posts',
    path: '/dashboard/posts',
    icon: getIcon('material-symbols:outgoing-mail-outline'),
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: getIcon('icon-park-twotone:transaction-order'),
  },
  {
    title: 'Transaction history',
    path: '/dashboard/transactions',
    icon: getIcon('ant-design:transaction-outlined'),
  }
];

export default navConfig;
