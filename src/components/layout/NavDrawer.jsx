import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";

const NavDrawer = ({
  navItems,
  user,
  handleLogout,
  navigate,
  pathname,
  drawerMobileOpen,
  handleMenuClick,
}) => {
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      sx={{
        display: { xs: "block", lg: "none" },
        width: 240,
        "& .MuiDrawer-paper": {
          width: 300,
          mt: 9,
          boxSizing: "border-box",
        },
      }}
      open={drawerMobileOpen}
      onClose={handleMenuClick}
    >
      <List disablePadding sx={{ pt: 10 }}>
        {navItems.map((item) => (
          <ListItemButton key={item.title} sx={{ px: 3 }}>
            <ListItemText
              primary={item.title}
              sx={{
                color: pathname === item.page ? "#378b29" : "",
                textAlign: "right",
                borderRight:
                  pathname === item.page ? "5px solid #378b29" : "none",
                px: pathname === item.page ? 1 : 1.65,
              }}
              onClick={() => navigate(item.page)}
            />
          </ListItemButton>
        ))}
        {user && (
          <ListItemButton sx={{ px: 3 }}>
            <ListItemText
              primary="Logout"
              sx={{
                textAlign: "right",
                px: 1.65,
              }}
              onClick={handleLogout}
            />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
