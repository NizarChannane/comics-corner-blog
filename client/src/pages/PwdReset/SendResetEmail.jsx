import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useSendResetEmail } from "../../hooks/auth/useSendResetEmail";
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
        .required("Champ obligatoire")
});

// const SuccessMsg = ({ msg }) => {
//     return (
//         <Container maxWidth="sm" sx={{ my: "auto" }}>
//             <Alert
//                 // action={
//                 //     <IconButton
//                 //         aria-label="close"
//                 //         color="inherit"
//                 //         size="small"
//                 //         onClick={() => {
//                 //             // openState(false);
//                 //         }}
//                 //     >
//                 //         <CloseIcon fontSize="inherit" />
//                 //     </IconButton>
//                 // }
//                 severity="success"
//                 sx={{ my: 5, p: 5, justifyContent: "center" }}
//             >
//                 {msg}
//             </Alert>
//         </Container>
//     )
// };

const SendResetEmail = () => {
    const form = useForm({
        defaultValues: {
            email: ""
        },
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const { sendResetEmail, isLoading, serverMsg, success, error } = useSendResetEmail();
    const [open, setOpen] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        if (error) {
            setOpen(true);
        };

    }, [error]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const { email } = data;
        await sendResetEmail(email);
    };

    if (success) {
        return <SuccessMsg msg={serverMsg} />
    }

    return (
        <>
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
                                type="email"
                                label="Email*"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={isLoading}
                            >
                                {
                                    isLoading ? <CircularProgress /> : "Envoyer mail"
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
        </>
    )
};

export default SendResetEmail;