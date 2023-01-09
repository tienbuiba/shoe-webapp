import { Divider } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiUserGetAllCategories } from 'src/services/Categories';

const MainCategory = () => {
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    apiUserGetAllCategories().then(result => {
      setData(result.data.data.items)
    })
  }, [])
  
  return (
    <div style={{ marginTop: '53px' }}>
      {data?.map((row) => {
        return (
          <div
            key={row.id}
            className="nav-category"
            onClick={() => { setCategoryId(row.id) }}
            style={{ width: '90%d'}}
          >
            <p style={{ padding: '1rem  1rem 1rem 0.5rem' }}>{row.name}</p>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default MainCategory;