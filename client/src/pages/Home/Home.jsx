import React from 'react';
import HeroImage from "../../components/HeroImage/HeroImage";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import PostThumbnail from '../Blog/PostThumbnail';
import ContactForm from '../Contact/ContactForm';
import { postsThumbnails } from '../Blog/Posts/mockData';

const Home = () => {
    return (
        <>
            <HeroImage />
            <Container maxWidth="md" sx={{ pb: "2rem", pt: "2rem" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: "3rem" }}>
                    <Typography variant="h3" sx={{ textAlign: "center" }}>
                        Bienvenue sur<br/>Comics Corner
                    </Typography>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        Ce blog est encore à l'état de <b>Béta</b> et cette version est une démo. Dans la section blog vous trouverez un article présentant ce projet plus en détails ainsi que les fonctionnalités déjà disponibles. De plus, sur la page <em>"À propos"</em> vous trouverez une présentation du créateur du site. 
                    </Typography>
                </Box>
                <Divider variant="middle" color="black" sx={{ width: "50vw", mx: "auto", mb: "3rem" }} />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, mb: "3rem" }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        Cet article pourrait vous intéresser :
                    </Typography>
                    <PostThumbnail post={postsThumbnails[0]} />
                </Box>
                <Divider variant="middle" color="black" sx={{ width: "50vw", mx: "auto", mb: "3rem" }} />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, mb: "3rem" }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        À propos :
                    </Typography>
                    {/* <Avatar src="/Profile_picture.jfif" sx={{ width: "200px", height: "200px" }} /> */}
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Bonjour, je m'appelle Nizar Channane et je suis développeur web et un grand passionné de comics (bandes dessinés). J'ai créé ce site afin de partager ma passion des comics, vous pourrez donc retrouver des analyses de bandes dessinés ainsi que leurs adaptations dans d'autres médias. Si vous souhaitez en apprendre plus sur les origines du projet, n'hésitez pas à visiter la page <em>"À propos"</em>.
                    </Typography>
                    <Link to="/about" style={{ textDecoration: "none", color: "black" }}>{"À propos >"}</Link>
                </Box>
                <Divider variant="middle" color="black" sx={{ width: "50vw", mx: "auto", mb: "3rem" }} />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, mb: "3rem" }}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                        Contact
                    </Typography>
                    <Container maxWidth="xs">
                        <ContactForm />
                    </Container>
                </Box>
            </Container>
        </>
    )
};

export default Home;