import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import PostThumbnail from './PostThumbnail';
import { Link } from 'react-router-dom';
import { categories, postsThumbnails  } from './Posts/mockData';


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