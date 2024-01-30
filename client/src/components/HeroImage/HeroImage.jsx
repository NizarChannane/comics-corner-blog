import React from 'react';
import { Box } from '@mui/material';
import "./HeroImage.css";

const HeroImage = () => {
    return (
        <Box className="hero-container">
            <img src="/Hero_background.jpg" alt="" className="hero-image" />
            <img src="/Hero_logo.svg" alt="" className="hero-logo" />
        </Box>
    )
};

export default HeroImage;