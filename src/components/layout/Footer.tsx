import React from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Stack,
  alpha,
  useTheme,
  Divider,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Code as CodeIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.48,80.21h0A105.73,105.73,0,0,0,32.47,96.36,77.7,77.7,0,0,0,39,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.58,11.1,105.26,105.26,0,0,0,32-16.15h0C129.58,50.8,124,27.1,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const Footer: React.FC = () => {
  const theme = useTheme();

  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Clients", path: "/clients" },
    { label: "Plugins", path: "/plugins" },
    { label: "About", path: "/about" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 6,
        px: 2,
        bgcolor: alpha(theme.palette.background.paper, 0.5),
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
          spacing={4}
          sx={{ mb: 4 }}
        >
          {/* Brand Info */}
          <Box
            sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: "350px" }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mb: 2 }}
            >
              <CodeIcon color="primary" />
              <Typography variant="h6" fontWeight="800" letterSpacing="-0.5px">
                Encyclopedia
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              The definitive resource for Discord modifications and third-party
              clients. Always open source, always community driven.
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Stack
            direction="row"
            spacing={4}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              "& a": {
                textDecoration: "none",
                color: "text.secondary",
                fontSize: "0.95rem",
                fontWeight: 500,
                transition: "color 0.2s",
                "&:hover": { color: "primary.main" },
              },
            }}
          >
            {footerLinks.map((link) => (
              <Link key={link.label} to={link.path}>
                {link.label}
              </Link>
            ))}
          </Stack>

          {/* Social Media Links */}
          <Stack direction="row" spacing={1.5}>
            {[
              {
                icon: <GitHubIcon />,
                url: "https://github.com/kmmiio99o/discord-encylopedia",
                label: "GitHub",
              },
              {
                icon: <DiscordIcon />,
                url: "https://discord.gg",
                label: "Discord",
              },
            ].map((social, i) => (
              <IconButton
                key={i}
                href={social.url}
                target="_blank"
                aria-label={social.label}
                sx={{
                  width: 45,
                  height: 45,
                  bgcolor: alpha(theme.palette.text.primary, 0.04),
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ mb: 4, opacity: 0.1 }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ opacity: 0.7 }}
          >
            © {new Date().getFullYear()} Discord Client Encyclopedia. Not
            affiliated with Discord Inc.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            Built with{" "}
            <Box component="span" sx={{ color: "#ff4d4d", fontSize: "1.2rem" }}>
              •
            </Box>{" "}
            for the Community
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
