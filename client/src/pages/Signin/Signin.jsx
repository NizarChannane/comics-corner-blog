import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Avatar from '@mui/material/Avatar';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { useSignin } from '../../hooks/auth/useSignin';
import { useFetch } from '../../hooks/auth/useFetch';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const schema = yup.object({
    email: yup
        .string()
        .trim()
        .email("Le format de l'adresse email n'est pas valide")
        .required("Champ obligatoire"),
    password: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .min(8, "Le mot de passe doit contenir 8 caractères au minimum")
        .minUppercase(1, "Doit contenir au moins une majuscule")
        .minLowercase(1, "Doit contenir au moins une minuscule")
        .minNumbers(1, "Doit contenir au moins un chiffre")
        .minSymbols(1, "Doit contenir au moins un symbole")
});

const Signin = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [open, setOpen] = useState(false);
    const { customFetch, isLoading, serverMsg, data, success, error } = useFetch();
    const { user, dispatch } = useAuthContext();

    useEffect(() => {
        if (error) {
            setOpen(true);
        };

        if (success) {
            dispatch({ type: "SIGNIN", payload: { ...data } });
        };
    }, [error, success]);


    const onSubmit = async (formData, e) => {
        e.preventDefault();
        await customFetch("POST", "auth/signin", formData);
    };

    if (user) {
        return <Navigate to="/dashboard" />
    }

    return (
        <Container maxWidth="xs">
            {
                // user && (
                //     <Navigate to="/dashboard" />
                // )
            }
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h1>Connexion</h1>
                <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <form
                    style={{ width: "100%", margin: "2rem 0" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={2}>
                        <TextField
                            type="email"
                            label="Email*"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            type="password"
                            label="Password*"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isLoading}
                        >
                            {
                                isLoading ? <CircularProgress /> : "Se connecter"
                            }
                        </Button>
                    </Stack>
                </form>

                <Link to="/send-reset-email">
                    Mot de pace oublié?
                </Link>

                {
                    error && 
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity="error" 
                            sx={{ my: 5 }}
                        >
                            {serverMsg}
                        </Alert>
                    </Collapse>
                }
            </Box>

        </Container>
    );
};

export default Signin;