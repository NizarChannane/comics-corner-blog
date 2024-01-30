import React from 'react';
import {
    Container,
    Paper,
    Typography
} from '@mui/material';

const FavoritePosts = () => {
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
                <Typography ><em>Vous pourrez trouver vos articles favoris ici.</em></Typography>
            </Paper>
        </Container>
    )
};

export default FavoritePosts;