import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import PostThumbnail from './PostThumbnail';
import { postsThumbnails } from './Posts/mockData';


const Category = ({ category }) => {

    return (
        <Container >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2.5rem", flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{category}</Typography>
                <Box sx={{ display: "flex" }}>
                    <Grid container rowSpacing={5} columnSpacing={5}>
                        {
                            postsThumbnails.map((post, index) => (
                                post.category === category ? 
                                <Grid key={index} item xs={12} md={6}>
                                    <PostThumbnail post={post} />
                                </Grid> : 
                                null
                            ))
                        }
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
};

export default Category;