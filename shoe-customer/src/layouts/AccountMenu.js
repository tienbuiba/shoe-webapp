import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, IconButton } from '@mui/material';
import TokenService from 'src/services/TokenService';
import { useTranslation } from 'react-i18next';
import MenuPopover from './MenuPopover';

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const { t } = useTranslation("translation");

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const handleLogout = () => {
    TokenService.removeAccessToken();
    TokenService.removeLocalExpiresIn();
    TokenService.removeLocalProfile();
    navigate('/', { replace: true });
  };

  return profile && (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <a href="#"><i className="fa fa-user" aria-hidden="true"></i></a>
      </IconButton>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {profile.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {profile.username}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ p: 1 }}>
          <MenuItem to="/account-profile" component={RouterLink} onClick={handleClose}>
            {t("Account Page")}
            <i class="fa fa-user" style={{ marginLeft: 4 }}></i>
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem to="/account-order" component={RouterLink} onClick={handleClose}>
            {t("Orders History")}
            <i class="fa fa-first-order" style={{ marginLeft: 4 }}></i>
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem to="/account-transaction" component={RouterLink} onClick={handleClose}>
            {t("Transaction History")}
            <i class="fa fa-money" style={{ marginLeft: 4 }}></i>
          </MenuItem>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={handleLogout}>
            {t("Logout")}
            <i className="fa fa-sign-out" aria-hidden="true" style={{ marginLeft: 4 }}></i>
          </MenuItem>
        </Stack>
      </MenuPopover>
    </>
  );
}
