import React from 'react';
import { Navigate } from 'react-router';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { CircularProgress } from '@mui/material';

const RoleBasedRoute = ({ children, role }) => {
    const { user } = useAuthContext();
    const roleCheck = role.includes(user.role);

    if (!roleCheck) {
        return <Navigate to="/dashboard" />
    }

    return roleCheck ? <>{children}</> : <CircularProgress />
};

export default RoleBasedRoute