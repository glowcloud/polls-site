import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar } from "@mui/material";

import { useAuthContext } from "../../hooks/useAuthContext";
import NavDrawer from "./NavDrawer";
import NavToolbar from "./NavToolbar";

const Navbar = () => {
  const [drawerMobileOpen, setDrawerMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, dispatch } = useAuthContext();

  const navItems = user
    ? [
        { title: "Home", page: "/" },
        { title: "My Polls", page: "/polls" },
        { title: "Create Poll", page: "/create" },
      ]
    : [
        { title: "Home", page: "/" },
        { title: "Create Poll", page: "/create" },
        { title: "Login", page: "/login" },
      ];

  useEffect(() => {
    setDrawerMobileOpen(false);
  }, [pathname]);

  const handleMenuClick = () => {
    setDrawerMobileOpen((prevDrawerMobileOpen) => !prevDrawerMobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("pollUser");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <AppBar
      component="nav"
      position="fixed"
      sx={{ height: 64, px: { lg: 5 }, top: -1 }}
    >
      <NavToolbar
        navItems={navItems}
        user={user}
        handleLogout={handleLogout}
        navigate={navigate}
        pathname={pathname}
        handleMenuClick={handleMenuClick}
      />

      <NavDrawer
        navItems={navItems}
        user={user}
        handleLogout={handleLogout}
        navigate={navigate}
        pathname={pathname}
        handleMenuClick={handleMenuClick}
        drawerMobileOpen={drawerMobileOpen}
      />
    </AppBar>
  );
};

export default Navbar;
