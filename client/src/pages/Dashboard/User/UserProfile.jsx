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
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useOutletContext } from "react-router-dom";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { useFetch } from '../../../hooks/auth/useFetch';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const updateSchema = yup.object({
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

const deleteSchema = yup.object({
    password: yup
        .string()
        .trim()
        .required("Champ obligatoire")
        .min(8, "Le mot de passe doit contenir 8 caractères au minimum")
        .minUppercase(1, "Doit contenir au moins une majuscule")
        .minLowercase(1, "Doit contenir au moins une minuscule")
        .minNumbers(1, "Doit contenir au moins un chiffre")
        .minSymbols(1, "Doit contenir au moins un symbole"),
});

const UserProfile = () => {
    const updateForm = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: ""
        },
        resolver: yupResolver(updateSchema)
    });

    const deleteForm = useForm({
        defaultValues: {
            password: ""
        },
        resolver: yupResolver(deleteSchema)
    });

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const updateFetch = useFetch();
    const deleteFetch = useFetch();
    const { dispatch } = useAuthContext();
    const { data } = useOutletContext();

    useEffect(() => {
        if (updateFetch.error || updateFetch.success) {
            setUpdateOpen(true);
        };

        if (updateFetch.success) {
            updateForm.reset();
        };

        if (deleteFetch.error) {
            setDeleteOpen(true);
        };

        if (deleteFetch.success) {
            deleteForm.reset();
        };
    }, [updateFetch.error, updateFetch.success, deleteFetch.error, deleteFetch.success]);

    useEffect(() => {
        if (deleteFetch.data && deleteFetch.data.accDeleted) {
            dispatch({ type: "SIGNOUT" });
        };
    }, [deleteFetch.data])

    const onSubmitUpdatePwd = async (data, e) => {
        e.preventDefault();
        const { oldPassword, newPassword } = data;
        await updateFetch.customFetch("PUT", "auth/update-pwd", { oldPassword, newPassword });
    };

    const onSubmitDeleteAcc = async (data, e) => {
        e.preventDefault();
        await deleteFetch.customFetch("POST", "auth/delete-account", data);
    };

    const onConfirmDelete = async () => {
        if (deleteFetch.data.allowDelete) {
            await deleteFetch.customFetch("DELETE", "auth/confirm-delete-account")
        };
    };

    return (
        <Container>

            <Typography sx={{ color: "grey", mb: 2 }}>Vos informations personnelles</Typography>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#efefef" }} >
                <Box sx={{ width: { xs: "100%", sm: "75%" } }}>
                    {
                        data ? <Grid container rowSpacing={1} >
                            <Grid item xs={5}>
                                <Typography>Nom d'utilisateur :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data.username}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>Nom :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data.lastname}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>Prénom :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data.firstname}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>Email :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data.email}</Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>Rôle :</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>{data.role}</Typography>
                            </Grid>
                        </Grid> :
                        <CircularProgress />
                    }
                </Box>
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
                        onSubmit={updateForm.handleSubmit(onSubmitUpdatePwd)}
                    >
                        <Stack spacing={2}>
                            <TextField
                                type="password"
                                label="Ancien mot de passe*"
                                {...updateForm.register("oldPassword")}
                                error={!!updateForm.formState.errors.oldPassword}
                                helperText={updateForm.formState.errors.oldPassword?.message}
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
                                    {...updateForm.register("newPassword")}
                                    error={!!updateForm.formState.errors.newPassword}
                                    helperText={updateForm.formState.errors.newPassword?.message}
                                />
                                <TextField
                                    type="password"
                                    label="Confirmation du nouveau mot de passe*"
                                    {...updateForm.register("newPasswordConfirm")}
                                    error={!!updateForm.formState.errors.newPasswordConfirm}
                                    helperText={updateForm.formState.errors.newPasswordConfirm?.message}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                type="submit"
                                disabled={updateFetch.isLoading}
                                sx={{ maxWidth: "50%" }}
                            >
                                {
                                    updateFetch.isLoading ? <CircularProgress /> : "Modifier le mot de passe"
                                }
                            </Button>
                        </Stack>
                    </form>

                    <Collapse in={updateOpen}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setUpdateOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity={updateFetch.error ? "error" : "success"} 
                            sx={{ mt: 3 }}
                        >
                            {updateFetch.serverMsg}
                        </Alert>
                    </Collapse>

                </Box>
            </Paper>

            <Divider sx={{ mt: 4 }} />

            <Typography sx={{ color: "grey", my: 2 }}>Suppression du compte</Typography>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: "#efefef" }} >
            <Typography sx={{ mb: 2 }}>Veuillez renseigner votre mot de passe pour pouvoir supprimer votre compte</Typography>
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
                        onSubmit={deleteForm.handleSubmit(onSubmitDeleteAcc)}
                    >
                        <Stack spacing={2}>
                            <TextField
                                type="password"
                                label="Mot de passe*"
                                {...deleteForm.register("password")}
                                error={!!deleteForm.formState.errors.password}
                                helperText={deleteForm.formState.errors.password?.message}
                            />

                            <Button
                                variant="contained"
                                type="submit"
                                disabled={deleteFetch.isLoading || deleteFetch.success}
                                sx={{ maxWidth: "50%" }}
                            >
                                {
                                    deleteFetch.isLoading ? <CircularProgress /> : "Supprimer mon compte"
                                }
                            </Button>
                            <Collapse in={deleteFetch.success} sx={{ maxWidth: "50%" }}>
                                <Button
                                    variant="contained"
                                    disabled={deleteFetch.isLoading}
                                    sx={{ 
                                        minWidth: "100%", 
                                        backgroundColor: "#d32f2f", 
                                        "&:hover": { backgroundColor: "#b71c1c" }
                                    }}
                                    onClick={onConfirmDelete}
                                >
                                    {
                                        deleteFetch.isLoading ? <CircularProgress /> : "Confirmer la suppression"
                                    }
                                </Button>
                            </Collapse>
                        </Stack>
                    </form>

                    <Collapse in={deleteOpen}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setDeleteOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            severity={deleteFetch.error ? "error" : "success"} 
                            sx={{ mt: 3 }}
                        >
                            {deleteFetch.serverMsg}
                        </Alert>
                    </Collapse>
                </Box>
            </Paper>

        </Container>
    )
};

export default UserProfile;