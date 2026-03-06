import { Brightness4, Brightness7 } from "@mui/icons-material";
import {
    alpha,
    AppBar,
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

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
            width: 24,
            height: 24,
            fill: "currentColor",
            display: "block",
            ...sx,
        }}
    >
        <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.39,80.21a105.73,105.73,0,0,0,32.77,16.15,77.7,77.7,0,0,0,7.32-11.89,68.68,68.68,0,0,1-11.85-5.59c.97-.7,1.92-1.42,2.83-2.16a74.16,74.16,0,0,0,64.12,0c.91.74,1.86,1.46,2.83,2.16a68.66,68.66,0,0,1-11.85,5.59,77.89,77.89,0,0,0,7.32,11.89,105.64,105.64,0,0,0,32.77-16.15C131.58,52.41,126.77,28.73,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.07-12.67,11.41-12.67S54,46,53.86,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.07-12.67,11.44-12.67S96.23,46,96.12,53,91,65.69,84.69,65.69Z" />
    </Box>
);

interface MenuItemType {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const DesktopHeader: React.FC<{ menuItems: MenuItemType[] }> = ({
    menuItems,
}) => {
    const theme = useTheme();
    const location = useLocation();
    const { isDarkMode, toggleTheme } = React.useContext(ThemeContext);

    const isActive = (path: string) => location.pathname === path;

    return (
        <AppBar
            position="fixed"
            sx={{
                bgcolor: "transparent",
                backgroundImage: "none",
                boxShadow: "none",
                mt: 2,
                pointerEvents: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "center" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        pointerEvents: "auto",
                        px: 1.5,
                        py: 0.75,
                        bgcolor: alpha(theme.palette.background.paper, 0.75),
                        backdropFilter: "blur(16px) saturate(180%)",
                        borderRadius: "999px",
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.15)}`,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: `0 12px 48px ${alpha(theme.palette.common.black, 0.2)}`,
                        },
                    }}
                >
                    {/* Brand Section */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        component={NavLink}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            px: 2,
                            mr: 1,
                            borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            "& .discord-logo": {
                                color: theme.palette.primary.main,
                                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            },
                            "&:hover .discord-logo": {
                                transform: "rotate(360deg)",
                            },
                        }}
                    >
                        <DiscordIcon className="discord-logo" />
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 900,
                                color: theme.palette.text.primary,
                                letterSpacing: -0.5,
                            }}
                        >
              ENCYCLOPEDIA
                        </Typography>
                    </Stack>

                    {/* Navigation */}
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                        {menuItems.map(item => (
                            <Button
                                key={item.label}
                                component={NavLink}
                                to={item.path}
                                startIcon={
                                    item.icon &&
                  React.cloneElement(item.icon as React.ReactElement, {})
                                }
                                sx={{
                                    borderRadius: "999px",
                                    px: 2.5,
                                    py: 1,
                                    textTransform: "none",
                                    fontWeight: isActive(item.path) ? 800 : 600,
                                    fontSize: "0.875rem",
                                    color: isActive(item.path)
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary,
                                    bgcolor: alpha(theme.palette.action.active, 0.05),
                                    "&:hover": {
                                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                                        color: theme.palette.primary.main,
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Action */}
                    <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
                        <IconButton
                            onClick={toggleTheme}
                            sx={{
                                ml: 1,
                                width: 40,
                                height: 40,
                                color: theme.palette.text.primary,
                                bgcolor: alpha(theme.palette.action.active, 0.05),
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    transform: "rotate(20deg)",
                                },
                            }}
                        >
                            {isDarkMode ? (
                                <Brightness7 fontSize="small" />
                            ) : (
                                <Brightness4 fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default DesktopHeader;
