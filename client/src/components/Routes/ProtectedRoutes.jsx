import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const ProtectedRoutes = () => {
    const { user, authStatus } = useAuthContext();

    if (authStatus === "unauthorized") {
        return <Navigate to="/signin" />
    }

    console.log(user);
    console.log(authStatus);

    return user ? <Outlet /> : <CircularProgress />
    // return <Outlet />
};

export default ProtectedRoutes;