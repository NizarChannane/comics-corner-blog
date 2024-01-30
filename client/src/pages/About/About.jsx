import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import "./About.css";

const About = () => {
    return (
        <Container maxWidth="md" sx={{ mb: "3rem" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: "2rem" }}>
                <Paper 
                    elevation={3} 
                    sx={{ 
                        p: 3, 
                        backgroundColor: "#efefef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "3rem"
                    }} 
                >
                    <img src="/Hero_logo.svg" className="about-logo" />
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Bienvenue sur Comics Corner, je m'appelle Nizar Channane et je suis développeur web et un grand passionné de comics (bandes dessinés). J'ai créé ce site afin de partager ma passion des comics, vous pourrez donc retrouver des analyses de bandes dessinés ainsi que leurs adaptations dans d'autres médias.<br /><br />
                        L'idée de ce site m'est venue dans le cadre de la création de mon portfolio de développeur. En effet, la création d'un blog est le premier projet auquel j'ai pensé et ma passion des comics a dicté le choix de la thématique du blog.<br /><br />
                        Le projet est actuellement au stade de <b>Béta</b>. Pour le moment, la section blog ne contient qu'un article de présentation du site et des articles contenant du texte factice (de type <em>Lorem Ipsum</em>). 
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        En revanhce, le système d'authentification est complètement implémenté et fonctionnel. N'hésitez pas à l'expérimenter!
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", px: "2rem", mb: "1rem" }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Si vous souhaitez en apprendre plus sur mon profil, vous pouvez :
                        </Typography>
                        <Typography variant="h6" >
                            {"- Visiter mon "}
                            <Link to="http://portfolio.nizar-channane.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "black" }}>
                                {"portfolio "}
                            </Link> 
                            <OpenInNewIcon sx={{ fontSize: "1rem" }} />
                            {" et consulter mon profil complet."}
                        </Typography>
                        <Typography variant="h6" >
                            { "- Me contacter à travers le formulaire de " }
                            <Link to="/contact" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "black" }}>
                                {"contact "}
                            </Link> 
                            <OpenInNewIcon sx={{ fontSize: "1rem" }} />
                            {" disponible sur ce site."}
                        </Typography>

                    </Box>

                </Paper>
            </Box>
        </Container>
    )
};

export default About;