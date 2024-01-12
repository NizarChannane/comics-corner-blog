import { useEffect } from 'react';
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Divider from "@mui/material/Divider";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useFetch } from '../../hooks/auth/useFetch';
import { Link, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../hooks/auth/useAuthContext';

const dashboardLinks = {
    user: [
        {
            path: "profile",
            text: "Mon profil"
        },
        {
            path: "favorites",
            text: "Mes articles favoris"
        },
        {
            path: "comments",
            text: "Mes commentaires"
        }
    ],
    admin: [
        "Mon profil",
        ""
    ]
};

const DashboardLayout = () => {
    const { user, dispatch } = useAuthContext();
    const { customFetch, data } = useFetch();

    useEffect(() => {
        const getUserInfo = async () => {
            await customFetch("GET", "user/get-profile");
        };

        getUserInfo();
    }, []);

    const onClickSignout = async (e) => {
        await customFetch("GET", "auth/signout");
        dispatch({ type: "SIGNOUT" });
    };

    return (
        <Container sx={{ display: "flex", px: { xs: 0 }, flexGrow: 1 }}>
            <Drawer 
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'flex' },
                    width: 200,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box', left: "auto" }
                }}
            >
                <Toolbar variant="dense"/>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {
                            user && dashboardLinks[user.role].map((links, index) => (
                                <Box key={index}>
                                    <Divider variant="middle"/>
                                    <Link to={links.path} style={{ textDecoration: "none", color: "black" }}>
                                        <ListItem  disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={links.text} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                </Box>
                            ))
                        }
                        <Divider variant="middle"/>
                        <ListItem  disablePadding>
                            <ListItemButton onClick={onClickSignout}>
                                <ListItemText primary={"Se déconnecter"} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </List>
                </Box>
            </Drawer>
            <Box 
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    flex: 1, 
                    p: 2 
                }}
            >
                <h1>Tableau de bord</h1>
                <Divider sx={{ mb: 4 }} />
                <Outlet context={{ data }} />
            </Box>
        </Container>
    )
};

export default DashboardLayout;