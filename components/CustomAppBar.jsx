import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import CustomLink from "../src/CustomLink";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function CustomAppBar({ user, signout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.appbar}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <React.Fragment>
            <Typography variant="h6" className={classes.title}>
              {/* next-firebase-auth does not provide user name in the AuthUser so use email */}
              {user.email}
            </Typography>
            <Button color="inherit" onClick={signout}>
              Logout
            </Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </React.Fragment>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Button color="inherit" component={CustomLink} href="/profile">
          Profile
        </Button>
        <br></br>
        <Button color="inherit" component={CustomLink} href="/account">
          My account
        </Button>
      </Menu>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
