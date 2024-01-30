import React from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';

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
                    <Box sx={{ display: "flex", alignItems: "center", gap: "3rem", flexDirection: { xs: "column", md: "row" } }}>
                        <Avatar src="/Profile_picture.jfif" sx={{ width: "200px", height: "200px" }} />
                        <Typography variant="h3" sx={{ textAlign: "center", maxWidth: "450px" }}>Développeur web <br />Full-stack</Typography> 
                    </Box>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Bonjour, je m'appelle Nizar Channane et je suis développeur web full-stack. Ce site me sert de portfolio, il a été codé principalement en Javascript et est complètement responsive.<br />
                        Titulaire d'un diplôme de "concepteur développeur d'applications", j'ai développé ce site afin de renforcer mes candidatures dans le cadre de ma recherche d'emploi.<br />
                        Je me spécialise sur les technologies suivantes :
                    </Typography>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }} >Backend</Typography>
                        <img src="https://skillicons.dev/icons?i=nodejs,express,php" />
                        <Typography variant="h6" sx={{ fontWeight: "bold", mt: "1rem" }} >Frontend</Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} >
                            <img src="https://skillicons.dev/icons?i=html" />
                            <img src="https://skillicons.dev/icons?i=css" />
                            <img src="https://skillicons.dev/icons?i=js" />
                            <img src="https://skillicons.dev/icons?i=react" />
                            <img src="https://skillicons.dev/icons?i=redux" />
                            <img src="https://skillicons.dev/icons?i=materialui" />
                            <img src="https://skillicons.dev/icons?i=vite" />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mt: "1rem" }} >Bases de données</Typography>
                        <img src="https://skillicons.dev/icons?i=mysql,mongodb" />
                        <Typography variant="h6" sx={{ fontWeight: "bold", mt: "1rem" }} >Tests</Typography>
                        <img src="https://skillicons.dev/icons?i=jest" />
                        <Typography variant="h6" sx={{ fontWeight: "bold", mt: "1rem" }} >Autres</Typography>
                        <img src="https://skillicons.dev/icons?i=git,github,linux,nginx,md" />
                    </Box>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Je suis passionné de nouvelles technologies et j'ai une grande appétance pour les technologies du web. Toujours à la recherche des dernières bonnes pratiques, je fais toujours preuve d'attention aux détails et m'efforce de produire un code de qualité et optimisé; le tout afin d'offir une bonne expérience utilisateur et de permettre l'exploitation de mon code par d'autres développeurs.<br />
                        Mon objectif aujourd'hui est de pouvoir intégrer une équipe dynamique où je pourrai m'épanouir et de travailler sur de nouveaux projets afin de parfaire mes compétences de développeur.
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", px: "2rem" }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Si souhaitez en apprendre plus sur mon profil, vous pouvez :
                        </Typography>
                        <Typography variant="h6" >
                            - Consulter mon{" "}
                            <Link to="https://github.com/NizarChannane?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "black" }}>
                                GitHub{" "}
                            </Link> 
                            <OpenInNewIcon sx={{ fontSize: "1rem" }} /> et parcourir le code source de ce site ou d'autres projets que j'ai réalisé.
                        </Typography>
                        <Typography variant="h6" >
                            - Consulter mon{" "} 
                            <Link to="https://linkedin.com/in/nizar-channane-51abb2131" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "black" }}>
                            LinkedIn{" "}
                            </Link> 
                            <OpenInNewIcon sx={{ fontSize: "1rem" }} /> où vous trouverez des mises à jours sur l'avancée de ce site mais aussi sur mes projets futurs.
                        </Typography>
                        <Typography variant="h6" >
                            - Me contacter à travers le formulaire de contact disponible sur ce site.
                        </Typography>

                    </Box>

                </Paper>
            </Box>
        </Container>
    )
};

export default About;