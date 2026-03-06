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
  Favorite as HeartIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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
          spacing={{ xs: 4, md: 6 }}
          sx={{ mb: 4 }}
        >
          {/* Brand Info */}
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              maxWidth: "350px",
              width: { xs: "100%", md: "auto" }
            }}
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
              The ultimate resource for Discord modifications, third-party clients,
              and plugins. Open source and community driven.
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Stack
            direction={{ xs: "row", md: "column" }}
            spacing={{ xs: 3, md: 1.5 }}
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
              }
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
          spacing={{ xs: 1, md: 2 }}
          sx={{ textAlign: "center" }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ opacity: 0.7 }}
          >
            © {new Date().getFullYear()} Discord Encyclopedia. Not affiliated with Discord Inc.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, opacity: 0.7 }}
          >
            Built with{" "}
            <HeartIcon
              sx={{
                color: "#e91e63",
                fontSize: "1rem",
                animation: "pulse 1.5s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.15)" },
                }
              }}
            />{" "}
            for the Community
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
