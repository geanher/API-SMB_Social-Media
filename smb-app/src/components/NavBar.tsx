import * as React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Container, IconButton, Menu, MenuItem } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { kukunTab, kukunListTab } from './utils';


const useStyle = makeStyles(theme => ({
    bar: theme.mixins.toolbar,
    logo: {
        width: "80%",
    },
    miniLogo: {
        width: "60%",
    },
}))

export const NavBar = () => {
    const classes = useStyle();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const location = useLocation()

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    return (
        <AppBar position="sticky" >
            <Container maxWidth="xl">
                <Toolbar className={classes.bar}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {kukunListTab.map((kukuntab: kukunTab) =>
                                <MenuItem onClick={handleCloseNavMenu} key={kukuntab.name}>
                                    <Tab label={kukuntab.name} component={Link} to={kukuntab.linkTo} />
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Tabs value={location.pathname === "/v3/" ? "/v3/dashboard" : location.pathname} aria-label="basic tabs example" centered
                            textColor="inherit" indicatorColor="secondary">
                            {kukunListTab.map((kukuntab: kukunTab) =>
                                < Tab label={kukuntab.name} key={kukuntab.name} component={Link} to={kukuntab.linkTo} value={kukuntab.linkTo} />
                            )}
                        </Tabs>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}