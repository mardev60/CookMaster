import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAuthenticated = !!localStorage.getItem("user");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 50 }} />
          </Box>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Déconnexion
            </Button>
          ) : null}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">
              Accueil
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/create">
              Créer une recette
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/users">
              Utilisateurs
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 4 }}>{children}</Box>
      </Container>
    </div>
  );
};

export default Layout;
