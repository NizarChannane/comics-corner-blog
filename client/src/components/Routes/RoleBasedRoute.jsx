import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import CircularProgress from '@mui/material/CircularProgress';

const RoleBasedRoute = ({ children, role }) => {
    const { user } = useAuthContext();
    const roleCheck = user.role === role;

    if (!roleCheck) {
        return <Navigate to="/dashboard" />
    }

    return roleCheck ? <>{children}</> : <CircularProgress />
};

export default RoleBasedRoute