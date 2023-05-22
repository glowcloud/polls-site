import { Toolbar, Box, Typography, Button, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

const NavToolbar = ({
  navItems,
  user,
  handleLogout,
  navigate,
  pathname,
  handleMenuClick,
}) => {
  return (
    <Toolbar sx={{ height: "100%" }}>
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

      <Box display={{ xs: "none", md: "block" }} sx={{ height: "100%" }}>
        {navItems.map((item) => (
          <Button
            key={item.title}
            color="inherit"
            sx={{
              mx: 1,
              px: 2,
              "&:hover": {
                color: "black",
                backgroundColor: "white",
              },
            }}
            onClick={() => navigate(item.page)}
          >
            {item.title}
          </Button>
        ))}
        {user && (
          <Button
            sx={{
              mx: 1,
              px: 2,
              color: "white",
              "&:hover": {
                color: "black",
                backgroundColor: "white",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Box>

      <Box display={{ xs: "block", md: "none" }}>
        <IconButton color="inherit" onClick={handleMenuClick}>
          <Menu />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default NavToolbar;
