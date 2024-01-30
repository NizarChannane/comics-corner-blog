import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid
} from "@mui/material";
import PostThumbnail from './PostThumbnail';
import { postsThumbnails  } from './Posts/mockData';


const RecentPosts = () => {
    return (
        <Container >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2.5rem", flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Derniers articles</Typography>
                <Box sx={{ display: "flex" }}>
                    <Grid container rowSpacing={5} columnSpacing={5}>
                        {
                            postsThumbnails.map((post, index) => (
                                <Grid key={index} item xs={12} md={6}>
                                    <PostThumbnail post={post} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
};

export default RecentPosts;