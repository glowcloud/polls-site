import { Toolbar, Box, Typography, Button, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

const NavToolbar = ({
  navItems,
  user,
  handleLogout,
  navigate,
  handleMenuClick,
}) => {
  return (
    <Toolbar sx={{ height: "100%" }}>
      {/* NAME */}
      <Box
        sx={{ flexGrow: 1 }}
        display="flex"
        alignItems="center"
        justifyContent={{ xs: "center", md: "flex-start" }}
        onClick={() => navigate("/")}
      >
        <Typography
          variant="h5"
          color="white"
          sx={{
            px: 2,
            cursor: "pointer",
            display: { xs: "none", md: "block" },
          }}
        >
          Easy Polls
        </Typography>
      </Box>

      {/* NAV ITEMS */}
      <Box display={{ xs: "none", md: "block" }} sx={{ height: "100%" }}>
        {navItems.map((item) => (
          <Button
            key={item.title}
            color="inherit"
            sx={{
              height: "100%",
              borderRadius: 0,
              color: "white",
              mx: 1,
              px: 2,
              "&:hover": {
                background: "none",
                borderBottom: "3px solid white",
                pt: 1.2,
              },
            }}
            onClick={() => navigate(item.page)}
          >
            {item.title}
          </Button>
        ))}

        {/* LOGOUT */}
        {user && (
          <Button
            sx={{
              height: "100%",
              borderRadius: 0,
              color: "white",
              mx: 1,
              px: 2,
              "&:hover": {
                background: "none",
                borderBottom: "3px solid white",
                pt: 1.2,
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Box>

      {/* MENU BUTTON */}
      <Box display={{ xs: "block", md: "none" }}>
        <IconButton color="inherit" onClick={handleMenuClick}>
          <Menu />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default NavToolbar;
