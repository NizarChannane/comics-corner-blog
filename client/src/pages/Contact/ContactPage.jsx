import React from 'react';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import ContactForm from './ContactForm';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';

const ContactPage = () => {
    return (
        <Container maxWidth="xs"  >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h1>Contact</h1>
                <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                    <EmailIcon />
                </Avatar>
                <ContactForm />
            </Box>
        </Container>
    )
};

export default ContactPage;