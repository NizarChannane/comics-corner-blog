import Container from '@mui/material/Container';
import Alert from "@mui/material/Alert";

const SuccessMsg = ({ msg }) => {
    return (
        <Container maxWidth="sm" sx={{ my: "auto" }}>
            <Alert
                // action={
                //     <IconButton
                //         aria-label="close"
                //         color="inherit"
                //         size="small"
                //         onClick={() => {
                //             // openState(false);
                //         }}
                //     >
                //         <CloseIcon fontSize="inherit" />
                //     </IconButton>
                // }
                severity="success"
                sx={{ my: 5, p: 5, justifyContent: "center" }}
            >
                {msg}
            </Alert>
        </Container>
    )
};

export default SuccessMsg;