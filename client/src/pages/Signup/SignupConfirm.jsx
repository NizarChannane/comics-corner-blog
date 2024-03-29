import React from 'react';
import { 
    Container,
    Box,
    Card,
    CardContent,
    CardActions,
    Typography
} from '@mui/material';
import { Link } from "react-router-dom";

const SignupConfirm = () => {
    return (
        <Container maxWidth="sm" sx={{ my: "auto" }}  >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Card 
                    variant="outlined" 
                    sx={{ 
                        width: "100%", 
                        borderColor: "#43a047", 
                        backgroundColor: "#a5d6a7",
                        textAlign: "center",
                        px: 1
                    }}
                >
                    <CardContent >
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Inscription réussie
                        </Typography>
                        <Typography >
                            Votre compte a bien été créé. Veuillez cliquer sur le lien se trouvant dans le mail de vérification qui vous a été envoyé.
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Link to="/">
                            Retour à l'accueil
                        </Link>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    )
};

export default SignupConfirm;