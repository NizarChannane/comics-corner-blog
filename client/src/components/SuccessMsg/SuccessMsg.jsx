import {
    Container,
    Alert
} from '@mui/material';

const SuccessMsg = ({ msg }) => {
    return (
        <Container maxWidth="sm" sx={{ my: "auto" }}>
            <Alert
                severity="success"
                sx={{ my: 5, p: 5, justifyContent: "center" }}
            >
                {msg}
            </Alert>
        </Container>
    )
};

export default SuccessMsg;