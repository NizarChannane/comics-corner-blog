import React from 'react';
import {
    Container,
    Paper,
    Typography
} from '@mui/material';

const UserComments = () => {
    return (
        <Container sx={{ flexGrow: 1 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    backgroundColor: "#efefef", 
                    minHeight: "100%", 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Typography ><em>Vous pourrez trouver vos commentaires ici.</em></Typography>
            </Paper>
        </Container>
    )
};

export default UserComments;