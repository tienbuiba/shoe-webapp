import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Thống Kê',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Khách Hàng',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Danh Mục Sản Phẩm',
    path: '/dashboard/Categories',
    icon: getIcon('ic:outline-category'),
  },
  {
    title: 'Sản Phẩm',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Bài Viết',
    path: '/dashboard/posts',
    icon: getIcon('material-symbols:outgoing-mail-outline'),
  },
  {
    title: 'Đơn Hàng',
    path: '/dashboard/orders',
    icon: getIcon('icon-park-twotone:transaction-order'),
  },
  {
    title: 'Lịch sử giao dịch',
    path: '/dashboard/transactions',
    icon: getIcon('ant-design:transaction-outlined'),
  }
];

export default navConfig;
