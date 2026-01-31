import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  Box,
  Stack,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { ThemeContext } from "../../context/ThemeContext";

interface DiscordIconProps {
  sx?: any;
  className?: string;
}

const DiscordIcon = ({ sx, className }: DiscordIconProps) => (
  <Box
    component="svg"
    viewBox="0 0 127.14 96.36"
    className={className}
    sx={{
      width: 22,
      height: 22,
      fill: "currentColor",
      display: "block",
      ...sx,
    }}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.39,80.21a105.73,105.73,0,0,0,32.77,16.15,77.7,77.7,0,0,0,7.32-11.89,68.68,68.68,0,0,1-11.85-5.59c.97-.7,1.92-1.42,2.83-2.16a74.16,74.16,0,0,0,64.12,0c.91.74,1.86,1.46,2.83,2.16a68.66,68.66,0,0,1-11.85,5.59,77.89,77.89,0,0,0,7.32,11.89,105.64,105.64,0,0,0,32.77-16.15C131.58,52.41,126.77,28.73,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.07-12.67,11.41-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.07-12.67,11.44-12.67S96.23,46,96.12,53,91,65.69,84.69,65.69Z" />
  </Box>
);

const MobileHeader: React.FC<{ menuItems: any[] }> = ({ menuItems }) => {
  const theme = useTheme();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            component={NavLink}
            to="/"
            sx={{
              textDecoration: "none",
              "& .discord-logo": {
                color: theme.palette.primary.main,
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              },
              "&:active .discord-logo, &:hover .discord-logo": {
                transform: "rotate(360deg)",
              },
            }}
          >
            <DiscordIcon className="discord-logo" />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                fontSize: "0.95rem",
                color: theme.palette.text.primary,
                letterSpacing: -0.5,
              }}
            >
              ENCYCLOPEDIA
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{ color: theme.palette.text.secondary }}
            >
              {isDarkMode ? (
                <Brightness7 fontSize="small" />
              ) : (
                <Brightness4 fontSize="small" />
              )}
            </IconButton>
            <IconButton
              onClick={toggleDrawer(!open)}
              edge="end"
              sx={{
                color: open ? theme.palette.primary.main : "inherit",
              }}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: {
            width: "100%",
            maxHeight: "80vh",
            borderRadius: "0 0 24px 24px",
            bgcolor: theme.palette.background.paper,
            backgroundImage: "none",
            pt: 8,
            pb: 2,
          },
        }}
      >
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography
            variant="overline"
            sx={{ px: 2, fontWeight: 700, color: theme.palette.text.disabled }}
          >
            Menu
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.label}
                component={NavLink}
                to={item.path}
                onClick={toggleDrawer(false)}
                sx={{
                  borderRadius: "12px",
                  mb: 0.5,
                  py: 1.5,
                  bgcolor: isActive(item.path)
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "transparent",
                  color: isActive(item.path)
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 800 : 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
      <Toolbar />
    </>
  );
};

export default MobileHeader;
