import React from 'react';
import HeroImage from "../../components/HeroImage/HeroImage";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = () => {
    return (
        <>
            <HeroImage />
            <Container sx={{pb: "3rem"}}>
                <h1>Derniers articles:</h1>
                <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://place-hold.it/400x225.svg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Container>
        </>
    )
};

export default Home;