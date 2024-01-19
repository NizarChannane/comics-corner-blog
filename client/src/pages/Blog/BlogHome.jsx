import { useState } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, Outlet, useMatch } from 'react-router-dom';
import { categories } from "./Posts/mockData";
import "./BlogHome.css";

const BlogHome = () => {
    const [openCategories, setOpenCategories] = useState(false);
    const match = useMatch("/blog/:category/:title");

    const openCategoriesDropdown = () => {
        setOpenCategories(!openCategories)
    }

    return (
        <>
            {
                match === null ?
                <>
                    <Box className="banner-container" >
                        <img src="/Blog_banner.jpg" alt="" className="banner-image" />
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                color: "white",
                                backgroundColor: "rgba(0, 0, 0, 75%)",
                                width: {
                                    xs: "60%",
                                    md: "25%"
                                } 
                            }}
                        >
                            <h1>Comics Blog</h1>
                        </Box>
                    </Box>
                    <Container 
                        // maxWidth="md"
                        sx={{ 
                            display: { xs: "block", lg: "flex" }, 
                            flexGrow: 1, 
                            padding: { xs: 0 },
                            mx: { xs: 0, md: "auto" },
                            mb: "3rem",
                            width: { sm: "100%", md: "85%" },
                            maxWidth: { lg: "1280px" }
                        }}
                    >
                        <Box>
                            <Drawer 
                                variant="permanent"
                                sx={{
                                    display: { xs: "block", md: "flex" },
                                    width: 300,
                                    flexShrink: 0,
                                    [`& .MuiDrawer-paper`]: { 
                                        width: 300,
                                        boxSizing: 'border-box', 
                                        position: "static",
                                        borderRightColor: "rgba(0, 0, 0, 35%)",
                                        borderTop: "1px solid rgba(0, 0, 0, 35%)"
                                    }
                                }}
                            >
                                <List sx={{ py: 0 }}>
                                    <Link to="recent-posts" style={{ textDecoration: "none", color: "black" }}>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary="Derniers articles" />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={openCategoriesDropdown}>
                                            <ListItemText primary="Catégories" />
                                            { openCategories ? <ExpandLess /> : <ExpandMore /> }
                                        </ListItemButton>
                                    </ListItem>
                                    <Collapse in={openCategories}>
                                        {
                                            categories.map((category, index) => (
                                                <Link key={index} to={`${category.replace(/ /g, "-")}`} style={{ textDecoration: "none", color: "black" }}>
                                                    <ListItem >
                                                        <ListItemButton>
                                                            <ListItemText primary={category} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Link>
                                            ))
                                        }
                                    </Collapse>
                                </List>
                            </Drawer>
                        </Box>
                        <Outlet />
                    </Container>
                </>
                : 
                <Outlet />
            }
        </>
    )
};

export default BlogHome;