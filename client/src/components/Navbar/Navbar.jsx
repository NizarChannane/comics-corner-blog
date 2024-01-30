import { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer,
    Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/auth/useAuthContext';
import { useSignout } from '../../hooks/auth/useSignout';
import "./Navbar.css";

const navItems = [
    {
        path: "blog",
        text: "Blog"
    }, 
    {
        path: "about",
        text: "À propos"
        
    }, 
    {
        path: "contact",
        text: "Contact"
    }
];

const NavBar = (props) => {
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user } = useAuthContext();
    const { signout, isLoading, serverMsg, error } = useSignout()
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleSignout = async () => {
        setAnchorEl(null);

        await signout();
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Toolbar variant="dense" />
            <Link style={{textDecoration: "none", color: "white"}} to="/">
                <Box sx={{ my: 2, height: "2rem" }}>
                        <img src="/CC_icon.svg" alt="" className="CC-logo" />
                </Box>
            </Link>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <Link key={index} style={{textDecoration: "none", color: "black"}} to={item.path} >
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            {
                user &&
                <>
                    <Divider />
                    <Typography variant="h6" sx={{ my: 2 }}>
                        Mon compte
                    </Typography>
                    <Divider />
                    <Link style={{textDecoration: "none", color: "black"}} to="/dashboard" >
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Mon profil" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={handleSignout}>
                            <ListItemText primary="Se déconnecter" />
                        </ListItemButton>
                    </ListItem>
                </>
            }
        </Box>
    );

    return (
        <>
            <AppBar  component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar variant="dense">
                    <Container sx={{ display: 'flex', px: { xs: 0, sm: 0, md: "1rem" } }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 5, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' },  flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                            <Link style={{textDecoration: "none", color: "white", display: "flex", alignItems: "center"}} to="/">
                                <img src="/CC_icon.svg" alt="" className="CC-logo" />
                            </Link>
                            {navItems.map((item, index) => (
                                <Link key={index} style={{textDecoration: "none", color: "black"}} to={item.path} >
                                    <Button className="navbar-items">
                                        {item.text}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                            {
                                user ?
                                <>
                                    <Typography sx={{ mr: 2 }}>Bienvenue, {user.username}</Typography>
                                    <IconButton
                                        size="large"
                                        edge="start"
                                        color="inherit"
                                        id="basic-button"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        sx={{ px: 1 }}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <Divider />
                                        <Link style={{textDecoration: "none", color: "black"}} to="/dashboard">
                                            <MenuItem onClick={handleClose}>
                                                Profil
                                            </MenuItem>
                                        </Link>
                                        <Divider variant="middle"/>
                                        <MenuItem onClick={handleSignout}>
                                            Se déconnecter
                                        </MenuItem>
                                        <Divider
                                            sx={{
                                                my: "0 !important",
                                            }}
                                        />
                                    </Menu>
                                </>
                                :
                                <>
                                    <Button color="inherit">
                                        <Link style={{textDecoration: "none", color: "white"}} to="/signin">
                                            Connexion
                                        </Link>
                                    </Button>
                                    <Button color="inherit">
                                        <Link style={{textDecoration: "none", color: "white"}} to="/signup">
                                            Inscription
                                        </Link>
                                    </Button>
                                </>
                            }
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "250px", backgroundColor: "#aaa" },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Toolbar variant="dense" />
        </>
    );
};

export default NavBar;