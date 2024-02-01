import React from 'react';
import {
    Box,
    Typography,
    Container,
    Divider,
    IconButton
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import "./Footer.css";

const navItems = [
    {
        path: "/",
        text: "Accueil"
    }, 
    {
        path: "blog",
        text: "Blog"
    }, 
    {
        path: "about",
        text: "À propos"
        
    }, 
    {
        path: "contact",
        text: "Contact"
    }
];

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                px: 2,
                mt: 'auto',
                backgroundColor: "rgb(25, 118, 210)",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            className="footer-box"
        >
            <Container maxWidth="md">
                <Box 
                    sx={{ 
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        // flexWrap: "wrap",
                        gap: { xs: 5, sm: 2 },
                        color: "white" 
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src="/Hero_logo.svg" alt="" className="footer-logo" />
                        <em>
                            <Typography sx={{ fontSize: "0.8rem" }}>
                                Copyright &#9400; 2024 Nizar Channane
                            </Typography>
                        </em>
                    </Box>
                    <Divider orientation="vertical" flexItem variant="middle" color="white" sx={{ display: { xs: "none", sm: "block" } }}/>
                    <Box 
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            textAlign: "center",
                            gap: 1
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Navigation:
                        </Typography>
                        {
                            navItems.map((item, index) => (
                                <Link 
                                    key={index} 
                                    to={item.path} 
                                    style={{ textDecoration: "none", color: "white" }}
                                >
                                    {item.text}
                                </Link>
                            ))
                        }
                    </Box>
                    <Box
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            textAlign: "center",
                            gap: 1
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Liens externes:
                        </Typography>
                        <Link to="https://github.com/NizarChannane?tab=repositories" target="_blank" rel="noopener noreferrer">
                            <IconButton aria-label="lien GitHub">
                                <GitHubIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Link>
                        <Link to="https://linkedin.com/in/nizar-channane" target="_blank" rel="noopener noreferrer">
                            <IconButton aria-label="lien LinkedIn">
                                <LinkedInIcon sx={{ color: "white" }} />
                            </IconButton>
                        </Link>
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}

export default Footer;