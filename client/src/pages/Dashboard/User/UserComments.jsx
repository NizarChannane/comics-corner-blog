import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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