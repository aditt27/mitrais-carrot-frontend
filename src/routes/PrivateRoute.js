import React from "react";
import {
  Navigate,
  useLocation
} from "react-router-dom";
import { getAccessToken } from '../utils/HelperFunctions';

function PrivateRoute({ children }) {
  const token = getAccessToken();
  let location = useLocation();

  if (token != null) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;