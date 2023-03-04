import { Outlet, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/dashboard/user', { replace: true });
    }
  }, [])
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
