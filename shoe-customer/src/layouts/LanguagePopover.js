import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
import { getStateLanguage } from 'src/redux/creates-action/languageAction';
import { useDispatch } from 'react-redux';
import TokenService from 'src/services/TokenService';
import { useEffect } from 'react';
import i18next from 'i18next';
import MenuPopover from 'src/components/MenuPopover';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'vie',
    label: 'Việt Nam',
    icon: '/static/icons/vietnam.png',
  },
  {
    value: 'eng',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg',
  }
];


export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const dataLanguage = TokenService.getLocalLanguage();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const dataLanguage = TokenService.getLocalLanguage();
    i18next.changeLanguage(dataLanguage);
  }, [])
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        {dataLanguage === 'eng' ?
          <img src={selected.length === 0 ? LANGS[1].icon : selected.icon} alt={selected.label} />
          :
          <img src={selected.length === 0 ? LANGS[0].icon : selected.icon} alt={selected.label} style={{ width: 34, height: 34, borderRadius: '40px' }} />
        }
      </IconButton>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={selected ? true : false}
              onClick={(e) => {
                const languageValue = option.value;
                TokenService.updateLocalLanguage(languageValue);
                i18next.changeLanguage(languageValue);
                dispatch(getStateLanguage(languageValue));
                setSelected(option);
                setOpen(false);
              }}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}