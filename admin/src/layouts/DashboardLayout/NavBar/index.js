/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  LogOut,
  DollarSign,
} from "react-feather";
import NavItem from "./NavItem";
import { Context } from "../../../data/context";

const items = [
  {
    href: "/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/viewBookings",
    icon: ShoppingBagIcon,
    title: "Bookings",
  },

  {
    href: "/addManager",
    icon: UserIcon,
    title: "Add Manager",
  },
  {
    href: "/adjust",
    icon: DollarSign,
    title: "Adjust Prices",
  },
  {
    href: "/managers",
    icon: UsersIcon,
    title: "Manage Managers",
  },
  {
    href: "/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
  {
    href: "/logout",
    icon: LogOut,
    title: "Logout",
  },
  // {
  //   href: "/login",
  //   icon: LockIcon,
  //   title: "Login",
  // },
  // {
  //   href: "/register",
  //   icon: UserPlusIcon,
  //   title: "Register",
  // },
  // {
  //   href: "/404",
  //   icon: AlertCircleIcon,
  //   title: "Error",
  // },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  const { userData } = useContext(Context);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={userData.displayImageUrl || "https://placeimg.com/640/480/any"}
          to="/account"
        />
        <Typography
          className={classes.name}
          style={{ marginTop: 15 }}
          color="textPrimary"
          variant="h5"
        >
          {userData.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {userData.phoneNumber}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
