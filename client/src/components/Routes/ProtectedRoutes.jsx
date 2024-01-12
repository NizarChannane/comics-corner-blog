import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const ProtectedRoutes = () => {
    const { user, authStatus } = useAuthContext();

    if (authStatus === "unauthorized") {
        return <Navigate to="/signin" />
    }

    return user ? <Outlet /> : <CircularProgress />
};

export default ProtectedRoutes;