import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCategoryId, setFilter } from 'src/redux/creates-action/CategoryAction';
import { apiUserGetAllCategories } from 'src/services/Categories';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const lteProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const brands = [{
  id: 1,
  name: 'NIKE',

}, {
  id: 2,
  name: 'Adidas'
},
{
  id: 3,
  name: 'Puma'
},
{
  id: 4,
  name: '0dddd'
},
{
  id: 5,
  name: 'Converse'
},
{
  id: 6,
  name: 'Vans'
}
]

const sizes = [{
  id: 1,
  name: '38',

}, {
  id: 2,
  name: '39'
},
{
  id: 3,
  name: '40'
},
{
  id: 4,
  name: '41'
},
{
  id: 5,
  name: '42'
},
{
  id: 6,
  name: '43'
}
]

const colors = [{
  id: 1,
  name: 'blue',

}, {
  id: 2,
  name: 'red'
},
{
  id: 3,
  name: 'black'
},
{
  id: 4,
  name: 'white'
},
{
  id: 5,
  name: 'yellow'
}
]

const MainCategory = () => {
  const [data, setData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const { t } = useTranslation("translation");

  const dispatch = useDispatch();

  useEffect(() => {
    apiUserGetAllCategories().then(result => {
      setData(result.data.data.items)
    }).catch(err => {
      console.log(err);
    })
  }, [])


  const handleChangeBrand = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedBrand(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSize = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedSize(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeColor = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedColor(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <aside class="col-lg-12">
        <button class="btn btn-outline-secondary mb-3 w-100  d-lg-none" data-bs-toggle="collapse" data-bs-target="#aside_filter">
          {t("Show filter")}
        </button>
        <div id="aside_filter" class="collapse card d-lg-block mb-5">
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                {t("Related categories")}
                <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside1">
              <div class="card-body">
                <ul class="list-menu">
                  {data?.map((row) => {
                    return (
                      <div
                        key={row.id}
                        className="nav-category"
                        onClick={() => { dispatch(setCategoryId(row.id)) }}
                      >
                        <li><a>{row.name}</a></li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside_brands">

                {t("Brands")}

                <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside_brands">
              <div class="card-body">
                <FormControl fullWidth={true}>
                  <InputLabel id="mutiple-select-label">
                    {t("Select Brand")}
                  </InputLabel>
                  <Select
                    labelId="mutiple-select-label"
                    multiple
                    MenuProps={lteProps}
                    label={t("Select Brand")}
                    value={selectedBrand}
                    onChange={handleChangeBrand}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {brands.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        <Checkbox checked={selectedBrand.indexOf(item.name) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside3">

                {t("Size")}
                <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside3">
              <div class="card-body">
                <FormControl fullWidth={true}>
                  <InputLabel id="mutiple-select-label">
                    {t("Select Size")}
                  </InputLabel>
                  <Select
                    labelId="mutiple-select-label"
                    multiple
                    MenuProps={lteProps}

                    label={t("Select Size")}

                    value={selectedSize}
                    onChange={handleChangeSize}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {sizes.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        <Checkbox checked={selectedSize.indexOf(item.name) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside3">
                {t("Colors")}
                <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside3">
              <div class="card-body">
                <FormControl fullWidth={true}>
                  <InputLabel id="mutiple-select-label">
                    {t("Select Colors")}
                  </InputLabel>
                  <Select
                    labelId="mutiple-select-label"
                    multiple
                    MenuProps={lteProps}
                    label={t("Select Colors")}
                    value={selectedColor}
                    onChange={handleChangeColor}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {colors.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        <Checkbox checked={selectedColor.indexOf(item.name) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside2">
                {t("Price")}
                <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside2">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-6">
                    <label for="min" class="form-label">
                      {t("Min")}
                    </label>
                    <input class="form-control" id="min" placeholder="$0" value={min} type="number" onChange={e => setMin(e.target.value)} />
                  </div>
                  <div class="col-6">
                    <label for="max" class="form-label">
                      {t("Max")}
                    </label>
                    <input class="form-control" id="max" placeholder="$1,0000" value={max} type="number" onChange={e => setMax(e.target.value)} />
                  </div>
                </div>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  className="red_button_auth"
                  onClick={() => {
                    dispatch(setFilter(selectedBrand, selectedSize, selectedColor, min, max))
                  }}
                >
                  {t("Apply")}

                </Button>
              </div>
            </div>
          </article>
        </div>
      </aside>
    </div>
  );
};

export default MainCategory;