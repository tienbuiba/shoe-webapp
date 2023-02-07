import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {Card, Link, Typography, Stack } from '@mui/material';

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, id } = product;
  
  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3, backgroundColor: '#ccc'}}>
        <Link to={`/dashboard/product/${id}`} color="inherit" underline="hover" component={RouterLink}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </Link>
    </Stack>
    </Card>
  );
}
