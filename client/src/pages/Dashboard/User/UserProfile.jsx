import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAuthContext } from "../../../hooks/auth/useAuthContext";

const UserProfile = () => {
    const { user } = useAuthContext();
    console.log(user);

    return (
        <Container>
            <Typography sx={{ color: "grey", mb: 2 }}>Vos informations personnelles</Typography>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#efefef", minHeight: "30dvh" }} >

                <Typography >Paper</Typography>
                <Typography >Paper</Typography>
                <Typography >Paper</Typography>
                <Typography >Paper</Typography>
                <Typography >Paper</Typography>
            </Paper>
            <Divider sx={{ my: 4 }} />
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#efefef", minHeight: "30dvh" }} >
                <Typography >Paper</Typography>
            </Paper>
        </Container>
    )
};

export default UserProfile;