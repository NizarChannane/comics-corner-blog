import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./Footer.css"

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: "#aaa",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            className="footer-box"
        >
            <Container maxWidth="sm">
                <Typography variant="body1">
                    My sticky footer can be found here.
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer;