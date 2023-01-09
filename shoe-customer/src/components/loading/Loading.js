import './Loading.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FadeLoader } from "react-spinners";

export default function Loading() {
  const [isLoading, setLoading] = useState(false);
  const data = useSelector(state => state.loading.data);

  useEffect(() => {
    if (data.isLoading !== null) {
      setLoading(data.isLoading);
    }
  }, [data.isLoading]);

  const renderLoadingComponent = (load) => {
    return load === true ? (
      <div className="divLoader" style={{ 
        opacity: `${data.isLoading ? 0.9 : 1}`
      }}>
        <FadeLoader type="bars" color="#000000" height={5} width={2}/>
      </div>
    ) : (<div></div>)
  }

  return (
    <React.Fragment>
      { renderLoadingComponent(isLoading) }
    </React.Fragment>
  );
}
