import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from "@mui/material";
import { Link } from 'react-router-dom';

const PostThumbnail = ({ post }) => {
    return (
        <Card sx={{ maxWidth: 420, border: "1px solid rgba(0, 0, 0, 35%)" }}>
            <Link to={`/blog/${post.category.replace(/ /g, "-")}/${post.title.replace(/ /g, "-")}`} style={{ textDecoration: "none", color: "black" }}>
                <CardMedia
                    component="img"
                    alt={`Image de couverture de l'article ${post.title}`}
                    height="280px"
                    image={post.image}
                    sx={{ borderRadius: "5px" }}
                />
            </Link>
            <CardContent>
                <Link to={`/blog/${post.category.replace(/ /g, "-")}/${post.title.replace(/ /g, "-")}`} style={{ textDecoration: "none", color: "black" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                    {post.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/blog/${post.category.replace(/ /g, "-")}/${post.title.replace(/ /g, "-")}`} style={{ textDecoration: "none", color: "black" }}>
                    <Button size="small">Lire</Button>
                </Link>
            </CardActions>
        </Card>
    )
};

export default PostThumbnail;