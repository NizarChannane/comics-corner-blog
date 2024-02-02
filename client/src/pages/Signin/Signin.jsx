import { useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Container,
    TextField,
    Button,
    Stack,
    Avatar,
    Alert,
    Collapse,
    IconButton,
    CircularProgress,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
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
                            sx={{ mt: "1rem" }}
                        >
                            {serverMsg}
                        </Alert>
                    </Collapse>
                }

                <Box sx={{ my: "1rem" }}>
                    <Accordion sx={{ textAlign: "center", backgroundColor: "#efefef" }}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Instructions pour utiliser la démo
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ mb: "1rem" }}>
                                Pour utiliser le compte de la démo, veuillez renseigner les informations suivantes :
                            </Typography>
                            <Typography>
                                Adresse mail: fake@email.com
                            </Typography>
                            <Typography>
                                Mot de passe: Demo123#
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>

            </Box>

        </Container>
    );
};

export default Signin;