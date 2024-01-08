import { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack"
import Avatar from '@mui/material/Avatar';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useSignup } from '../../hooks/auth/useSignup';
import { useFetch } from '../../hooks/auth/useFetch';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const schema = yup.object({
    username: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .min(2, "Doit contenir au moins 2 caractères")
        .max(35, "Ne peut contenir plus de 35 caractères"),
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
        .minSymbols(1, "Doit contenir au moins un symbole"),
    passwordConfirm: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
});

const Signup = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordConfirm: ""
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const [open, setOpen] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(null);
    const { customFetch, isLoading, serverMsg, data, success, error } = useFetch();
    // const { user, dispatch } = useAuthContext();

    useEffect(() => {
        if (error) {
            setOpen(true);
        };

        if (success) {
            setSignupSuccess(true);
        }
    }, [error, success]);

    const onSubmit = async (formData, e) => {
        e.preventDefault();
        await customFetch("POST", "auth/signup", formData);
    };

    if(signupSuccess) {
        return <Navigate to="/signup-success" />;
    };
    
    return (
        <Container maxWidth="xs"  >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h1>Inscription</h1>
                <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <form
                    style={{ width: "100%", margin: "2rem 0" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={2}>
                        <TextField
                            type="text"
                            label="Nom d'utilisateur*"
                            {...register("username")}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            type="text"
                            label="Prénom"
                            {...register("firstname")}
                        />
                        <TextField
                            type="text"
                            label="Nom"
                            {...register("lastname")}
                        />
                        <TextField
                            type="email"
                            label="Email*"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            type="password"
                            label="Mot de passe*"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <TextField
                            type="password"
                            label="Confirmation du mot de passe*"
                            {...register("passwordConfirm")}
                            error={!!errors.passwordConfirm}
                            helperText={errors.passwordConfirm?.message}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isLoading}
                        >
                            {
                                isLoading ? <CircularProgress /> : "S'inscrire"
                            }
                        </Button>
                    </Stack>
                </form>

                <Link to="/signin">
                    Déjà inscris? Connectez-vous
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

export default Signup;