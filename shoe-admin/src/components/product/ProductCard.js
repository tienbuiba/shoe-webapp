import PropTypes from 'prop-types';
import { Link, Link as RouterLink } from 'react-router-dom';
import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Label from '../Label';
import { ColorPreview } from '../color-utils';
import { fCurrency } from 'src/utils/formatNumber';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { showConfirmModal } from 'src/redux/create-actions/ConfirmAction';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ product }) {
  const { name, id, status, images, color, priceOrigin, priceSell } = product;
  const dispatch = useDispatch();

  return (
    <Card sx={{ py: 2 }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={images[0]} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`/dashboard/product-detail/${id}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={color} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceOrigin && fCurrency(priceOrigin)}
            </Typography>
            &nbsp;
            {fCurrency(priceSell)}
          </Typography>
        </Stack>
      </Stack>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          size="small"
          variant='contained'
          color="info"
          component={Link}
          to={`/dashboard/product-detail/${product.id}`}
          startIcon={<VisibilityIcon></VisibilityIcon>}
        >
          Xem
        </Button>
        <Button
          size="small"
          variant='contained'
          color="success"
          component={Link} to={`/dashboard/edit-product/${product.id}`}
          startIcon={<EditIcon></EditIcon>}
        >
          Sửa
        </Button>
        <Button size="small"
          variant='contained'
          color="error"
          onClick={(e) => dispatch(showConfirmModal('Bạn chắc chắn ?', 'Muốn xóa sản phẩm này chứ ?', product.id, "DELETE_PRODUCT"))}
          startIcon={<DeleteOutlineIcon></DeleteOutlineIcon>}
        >
          Xóa
        </Button>
      </div>
    </Card>
  );
}
