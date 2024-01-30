import { useState, useEffect } from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Stack,
    CircularProgress,
    Alert,
    Collapse,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import { useSearchParams } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { useResetPwd } from '../../hooks/auth/useResetPwd';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const schema = yup.object({
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



const PwdReset = () => {
    const form = useForm({
        defaultValues: {
            password: "",
            passwordConfirm: ""
        },
        resolver: yupResolver(schema)
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const { resetPwd, isLoading, serverMsg, success, error } = useResetPwd();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error) {
            setOpen(true);
        };

    }, [error]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const { password } = data;
        await resetPwd(password, token);
    };

    if (token === null) {
        return <Navigate to="/" />
    };

    if (success) {
        return <SuccessMsg msg={serverMsg} />
    };

    return (
        <Container maxWidth="xs" sx={{ my: "auto" }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <h1 style={{ textAlign: "center" }}>Réinitialisation du mot de passe</h1>
                <form
                    style={{ width: "100%", margin: "2rem 0" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={2}>
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
                                isLoading ? <CircularProgress /> : "Réinitialiser le mot de passe"
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

export default PwdReset;