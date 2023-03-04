import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {

  const logo = (
    <Box sx={{ width: 100, height: 100, ...sx }}>
      <img src={require('../_mock/Meshoes.png')}>
      </img>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/"

  >{logo}</RouterLink>;
}
