import * as React from 'react';
import {
  Typography,
  Menu,
  Container,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { openAuthModal } from '../../redux/reducers/features/modalFeature/modalSlice.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import Logo from '../../assets/learnForge.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../redux/reducers/features/authFeature/authSlice.ts';

const pagesUnAuth = [
  { name: 'Our courses', path: '/courses' },
  { name: 'About', path: '/about' },
];
const pagesAuth = [
  { name: 'Chat', path: '/chat' },
  { name: 'My courses', path: '/mycourses' },
];
const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleCloseUserMenu();
  };

  useEffect(() => {
    console.log(`Authentication status changed: ${isAuthenticated}`);
  }, [isAuthenticated]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              p: 1,
              borderRadius: '50%',
              width: (theme) => theme.spacing(7),
              height: (theme) => theme.spacing(7),
              backgroundColor: 'primary.main',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={Logo} alt="Your SVG" style={{ width: '100%', height: 'auto' }} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LearnForge
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
              {isAuthenticated
                ? pagesAuth.map((page) => (
                    <Button key={page.name} sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={page.path} style={{ textDecoration: 'none', color: 'white' }}>
                        {page.name}
                      </Link>
                    </Button>
                  ))
                : pagesUnAuth.map((page) => (
                    <Button key={page.name} sx={{ my: 2, color: 'white', display: 'block' }}>
                      <Link to={page.path} style={{ textDecoration: 'none', color: 'white' }}>
                        {page.name}
                      </Link>
                    </Button>
                  ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 10 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Learn Forge
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isAuthenticated
              ? pagesAuth.map((page) => (
                  <Button key={page.name} sx={{ my: 2, color: 'white', display: 'block' }}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'white' }}>
                      {page.name}
                    </Link>
                  </Button>
                ))
              : pagesUnAuth.map((page) => (
                  <Button key={page.name} sx={{ my: 2, color: 'white', display: 'block' }}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'white' }}>
                      {page.name}
                    </Link>
                  </Button>
                ))}
          </Box>
          {!isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                color="inherit"
                onClick={() => {
                  dispatch(openAuthModal('signIn'));
                }}
              >
                Sign in
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  dispatch(openAuthModal('signUp'));
                }}
              >
                Sign up
              </Button>
            </Box>
          )}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
