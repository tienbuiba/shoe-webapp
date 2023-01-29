import { Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from 'src/redux/creates-action/CategoryAction';
import { apiUserGetAllCategories } from 'src/services/Categories';

const MainCategory = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    apiUserGetAllCategories().then(result => {
      setData(result.data.data.items)
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <aside class="col-lg-12">
        <button class="btn btn-outline-secondary mb-3 w-100  d-lg-none" data-bs-toggle="collapse" data-bs-target="#aside_filter">Show filter</button>
        <div id="aside_filter" class="collapse card d-lg-block mb-5">
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                Related items
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
                Brands    <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside_brands">
              <div class="card-body">
                {data?.map(item => {
                  return (
                    <label class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" value="" checked />
                      <span class="form-check-label"> {item.name} </span>
                      <b class="badge rounded-pill bg-gray-dark float-end">120</b>
                    </label>
                  )
                })}
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside3">
                Size
                <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside3">
              <div class="card-body">
                <label class="checkbox-btn">
                  <input type="checkbox" />
                  <span class="btn btn-light"> 38</span>
                </label>
                <label class="checkbox-btn">
                  <input type="checkbox" />
                  <span class="btn btn-light"> 39</span>
                </label>
                <label class="checkbox-btn">
                  <input type="checkbox" />
                  <span class="btn btn-light"> 40</span>
                </label>
                <label class="checkbox-btn">
                  <input type="checkbox" />
                  <span class="btn btn-light"> 41</span>
                </label>
              </div>
            </div>
          </article>
          <article class="filter-group">
            <header class="card-header">
              <a class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside2">
                Price  <i class="icon-control fa fa-chevron-down"></i>
              </a>
            </header>
            <div class="collapse show" id="collapse_aside2">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-6">
                    <label for="min" class="form-label">Min</label>
                    <input class="form-control" id="min" placeholder="$0" type="number" />
                  </div>
                  <div class="col-6">
                    <label for="max" class="form-label">Max</label>
                    <input class="form-control" id="max" placeholder="$1,0000" type="number" />
                  </div>
                </div>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  className="red_button_auth"
                >
                  Apply
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