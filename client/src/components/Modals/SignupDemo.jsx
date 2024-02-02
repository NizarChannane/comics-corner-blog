import { useState } from 'react';
import {
    Box,
    Button,
    Modal,
    Typography,
    List,
    ListItem
} from '@mui/material';

const SignupDemo = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="demo-modal-title"
            aria-describedby="demo-modal-instructions"
        >
            <Box 
                sx={{
                    // position: "absolute",
                    // top: "10rem",
                    // left: "50%",
                    // transform: "translate(-50%, -50%)",
                    // transform: "translate(-50%, 0)",
                    mx: { xs: "1rem", md: "auto" },
                    mt: { xs: "1rem", md: "10rem" },
                    backgroundColor: "white",
                    p: "2rem",
                    borderRadius: "5px",
                    textAlign: "center",
                    maxWidth: "500px",
                    minWidth: { xs: "90%", md: "auto" },
                    maxHeight: "90dvh",
                    overflowY: "auto"
                }}
            >
                <Typography id="demo-modal-title" variant="h6" component="h2">
                    Instructions pour utiliser la démo :
                </Typography>
                <Typography id="demo-modal-instructions" sx={{ mt: 2 }}>
                    Ce site en est encore au stade de <strong>Béta</strong>, voici les instructions pour utiliser la démo.<br /><br />
                    Le système d'authentification est entièrement fonctionnel, vous avez donc 2 options :
                </Typography>
                <List>
                    <ListItem>
                        <Typography>
                            - Créer votre propre compte en utilisant votre adresse mail (vous allez recevoir un mail de vérification).
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ mb: "1rem" }}>
                        <Typography>
                            - Utiliser le compte de la démo en renseignant les informations suivantes sur la page de connexion :
                        </Typography>
                    </ListItem>
                    <Typography>
                        Adresse mail: fake@email.com
                    </Typography>
                    <Typography>
                        Mot de passe: Demo123#
                    </Typography>
                </List>
                <Button variant="contained" sx={{ mt: "1rem" }} onClick={handleClose}>Fermer</Button>
            </Box>
        </Modal>
    )
};

export default SignupDemo;