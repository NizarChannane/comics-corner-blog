import { useEffect } from 'react';
import {
    Container,
    Box,
    Card,
    CardContent,
    CardActions,
    Typography,
    CircularProgress
} from '@mui/material';
import { Link, Navigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/auth/useFetch';

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { customFetch, isLoading, serverMsg, data, success, error } = useFetch();

    useEffect(() => {
        const verifyEmail = async () => {
            await customFetch("GET", `auth/verify-email?token=${token}`);
        };

        verifyEmail();
    }, []);

    if (token === null) {
        return <Navigate to="/" />
    };

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
                    { isLoading && <CircularProgress /> }
                    <CardContent >
                        
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            {
                                success ? "Email vérifié" : "La vérification a échoué"
                            }
                        </Typography>
                        <Typography >
                            {serverMsg}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Link to="/">
                            Retour à l'accueil
                        </Link>
                        <Link to="/signin">
                            Se connecter
                        </Link>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    )
};

export default EmailVerification;