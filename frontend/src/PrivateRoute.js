// src/Components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { User } = useContext(UserContext);
  const location = useLocation();

  if (User) {
    return Component;
  } else {
    return <Navigate to="/PagLogin" state={{ from: location }} />;
  }
};

export default PrivateRoute;
