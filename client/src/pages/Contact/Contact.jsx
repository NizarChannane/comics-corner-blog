import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { useFetch } from '../../hooks/auth/useFetch';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const schema = yup.object({
    lastname: yup
        .string()
        .trim()
        .max(35, "Ne peut contenir plus de 35 caractères"),
    firstname: yup
        .string()
        .trim()
        .max(35, "Ne peut contenir plus de 35 caractères"),
    email: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .email("Le format de l'adresse email n'est pas valide"),
    message: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .min(2, "Doit contenir au moins 2 caractères")
        .max(200, "Ne peut contenir plus de 200 caractères"),
});

const Contact = () => {
    const form = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            message: ""
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, reset, formState } = form;
    const { errors } = formState;
    const [open, setOpen] = useState(false);
    const { customFetch, isLoading, serverMsg, data, success, error } = useFetch();

    useEffect(() => {
        if (error || success) {
            setOpen(true);
        };

        if (success) {
            reset();
        }
    }, [error, success]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        await customFetch("POST", "/contact/send-message", data);
    };

    return (
        <Container maxWidth="xs"  >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: "2rem"
                }}
            >
                <h1>Contact</h1>
                <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
                    <EmailIcon />
                </Avatar>
                <form
                    style={{ width: "100%", margin: "2rem 0" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={2}>
                        <TextField
                            type="text"
                            label="Nom"
                            {...register("lastname")}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                        />
                        <TextField
                            type="text"
                            label="Prénom"
                            {...register("firstname")}
                            error={!!errors.firstname}
                            helperText={errors.firstname?.message}
                        />
                        <TextField
                            type="text"
                            label="Email*"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            type="text"
                            label="Message* (200 caractères max)"
                            multiline
                            minRows={5}
                            inputProps={{
                                sx: { resize: "vertical" }
                            }}
                            {...register("message")}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={isLoading || success}
                        >
                            {
                                isLoading ? <CircularProgress /> : "Envoyer"
                            }
                        </Button>
                    </Stack>
                </form>

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
                        severity={error ? "error" : "success"}
                        sx={{ my: 5 }}
                    >
                        {serverMsg}
                    </Alert>
                </Collapse>
            </Box>
        </Container>
    )
};

export default Contact;