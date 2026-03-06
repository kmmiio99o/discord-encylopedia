import { GitHub as GitHubIcon } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";

const MAINTAINERS = [
    {
        username: "kmmiio99o",
        url: "https://github.com/kmmiio99o",
        avatar: "https://avatars.githubusercontent.com/u/164557248?v=4",
        role: "Lead Maintainer",
    },
];

const About: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: { xs: 4, md: 8 } }}>
            <Container maxWidth="md">
                <Box sx={{ mb: 8, textAlign: "center" }}>
                    <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 900, letterSpacing: 4 }}>
            PROJECT
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: "-0.04em", mt: 1 }}>
            About the Encyclopedia
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary", mt: 3, fontSize: "1.1rem", lineHeight: 1.8 }}>
            The Discord Client Encyclopedia is an open-source initiative dedicated to documenting the vast landscape
            of Discord client modifications, community-built tools, and desktop/mobile enhancements.
            We aim to provide a centralized registry that helps users discover and compare different ways to
            experience Discord.
                    </Typography>
                </Box>

                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, textAlign: "center" }}>
            Maintainers
                    </Typography>

                    <Stack spacing={2} sx={{ maxWidth: 500, mx: "auto" }}>
                        {MAINTAINERS.map(user => (
                            <Paper
                                key={user.username}
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    border: `1px solid ${theme.palette.divider}`,
                                    backgroundColor: theme.palette.background.paper,
                                    transition: "transform 0.2s ease-in-out",
                                    "&:hover": { transform: "translateY(-4px)" }
                                }}
                            >
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Avatar
                                        src={user.avatar}
                                        sx={{ width: 64, height: 64, border: `2px solid ${theme.palette.divider}` }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                            {user.username}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                                            {user.role}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            href={user.url}
                                            target="_blank"
                                            startIcon={<GitHubIcon />}
                                            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                                        >
                      Follow on GitHub
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Box>

                <Box sx={{ mt: 10, textAlign: "center" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Want to contribute to the registry?
                        <Box
                            component="a"
                            href="https://github.com/kmmiio99o/discord-encylopedia/compare"
                            sx={{ color: "primary.main", ml: 1, textDecoration: "none", fontWeight: 600 }}
                        >
              Submit a Pull Request
                        </Box>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default About;
