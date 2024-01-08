import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { useFetch } from '../../../hooks/auth/useFetch';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const schema = yup.object({
    oldPassword: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .min(8, "Le mot de passe doit contenir 8 caractères au minimum")
        .minUppercase(1, "Doit contenir au moins une majuscule")
        .minLowercase(1, "Doit contenir au moins une minuscule")
        .minNumbers(1, "Doit contenir au moins un chiffre")
        .minSymbols(1, "Doit contenir au moins un symbole"),
    newPassword: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .min(8, "Le mot de passe doit contenir 8 caractères au minimum")
        .minUppercase(1, "Doit contenir au moins une majuscule")
        .minLowercase(1, "Doit contenir au moins une minuscule")
        .minNumbers(1, "Doit contenir au moins un chiffre")
        .minSymbols(1, "Doit contenir au moins un symbole"),
    newPasswordConfirm: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .oneOf([yup.ref("newPassword")], "Les mots de passe ne correspondent pas")
});

const UserProfile = () => {
    const form = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: ""
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, reset, formState } = form;
    const { errors } = formState;
    const [open, setOpen] = useState(false);
    const { customFetch, isLoading, serverMsg, data, success, error } = useFetch();
    const { user } = useAuthContext();

    useEffect(() => {
        if (error || success) {
            setOpen(true);
        };

        if (success) {
            reset();
        };
    }, [error, success]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const { oldPassword, newPassword } = data;
        await customFetch("PUT", "auth/update-pwd", { oldPassword, newPassword });
    };

    return (
        <Container>
            <Typography sx={{ color: "grey", mb: 2 }}>Vos informations personnelles</Typography>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#efefef", minHeight: "30dvh" }} >
                <Typography >Paper</Typography>
            </Paper>
            <Divider sx={{ mt: 4 }} />
            <Typography sx={{ color: "grey", my: 2 }}>Modification du mot de passe</Typography>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#efefef" }} >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { maxWidth: "20rem" },
                    }}
                >
                    <form
                        style={{ width: "100%" }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Stack spacing={2}>
                            <TextField
                                type="password"
                                label="Ancien mot de passe*"
                                {...register("oldPassword")}
                                error={!!errors.oldPassword}
                                helperText={errors.oldPassword?.message}
                            />
                            <Box 
                                sx={{ 
                                    display: "flex",
                                    gap: 3,
                                    flexWrap: "wrap",
                                    '& .MuiTextField-root': { flexGrow: 1 } 
                                }}
                            >
                                <TextField
                                    type="password"
                                    label="Nouveau mot de passe*"
                                    {...register("newPassword")}
                                    error={!!errors.newPassword}
                                    helperText={errors.newPassword?.message}
                                />
                                <TextField
                                    type="password"
                                    label="Confirmation du nouveau mot de passe*"
                                    {...register("newPasswordConfirm")}
                                    error={!!errors.newPasswordConfirm}
                                    helperText={errors.newPasswordConfirm?.message}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={isLoading}
                                sx={{ maxWidth: "50%" }}
                            >
                                {
                                    isLoading ? <CircularProgress /> : "Modifier le mot de passe"
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
                            sx={{ mt: 3 }}
                        >
                            {serverMsg}
                        </Alert>
                    </Collapse>
                </Box>
            </Paper>
        </Container>
    )
};

export default UserProfile;