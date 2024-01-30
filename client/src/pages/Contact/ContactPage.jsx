import React from 'react';
import {
    Container,
    Box,
    Avatar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ContactForm from './ContactForm';

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