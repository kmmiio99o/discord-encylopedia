import {
    Code as CodeIcon,
    Explore as ExploreIcon,
    Extension as PluginsIcon,
    GitHub as GitHubIcon,
} from "@mui/icons-material";
import {
    alpha,
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    const theme = useTheme();

    const features = [
        {
            icon: <ExploreIcon />,
            title: "Browse Clients",
            description: "Discover and compare third-party Discord clients with detailed information.",
            link: "/clients",
        },
        {
            icon: <PluginsIcon />,
            title: "Explore Plugins",
            description: "Find plugins and modifications to enhance your Discord experience.",
            link: "/plugins",
        },
        {
            icon: <CodeIcon />,
            title: "Open Source",
            description: "All listed clients are open source and community driven.",
            link: "https://github.com/kmmiio99o/discord-encylopedia",
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                {/* Hero Section */}
                <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: "primary.main",
                            fontWeight: 900,
                            letterSpacing: 4,
                            fontSize: "0.75rem"
                        }}
                    >
            THE RESOURCE
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: "2.5rem", md: "4rem" },
                            letterSpacing: "-0.04em",
                            color: theme.palette.text.primary,
                            lineHeight: 1.1,
                            mt: 1,
                            mb: 3,
                        }}
                    >
            Discord Encyclopedia
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            color: theme.palette.text.secondary,
                            maxWidth: 600,
                            lineHeight: 1.7,
                            mx: "auto",
                            mb: 5,
                            fontSize: { xs: "1rem", md: "1.125rem" }
                        }}
                    >
            Your definitive guide to Discord modifications, third-party clients,
            and community-built enhancements. Open source and always evolving.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/clients"
                            startIcon={<ExploreIcon />}
                            sx={{
                                borderRadius: 8,
                                px: 4,
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: 600,
                            }}
                        >
              Explore Clients
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            href="https://github.com/kmmiio99o/discord-encylopedia"
                            target="_blank"
                            startIcon={<GitHubIcon />}
                            sx={{
                                borderRadius: 8,
                                px: 4,
                                py: 1.5,
                                fontSize: "1rem",
                                fontWeight: 600,
                            }}
                        >
              View Source
                        </Button>
                    </Stack>
                </Box>

                {/* Features Grid */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                        gap: 3,
                        mb: { xs: 4, md: 6 }
                    }}
                >
                    {features.map((feature, index) => (
                        <Paper
                            key={index}
                            elevation={0}
                            component={feature.link.startsWith("http") ? "a" : Link}
                            to={feature.link.startsWith("http") ? undefined : feature.link}
                            href={feature.link.startsWith("http") ? feature.link : undefined}
                            target={feature.link.startsWith("http") ? "_blank" : undefined}
                            sx={{
                                p: 4,
                                borderRadius: 8,
                                border: `1px solid ${theme.palette.divider}`,
                                backgroundColor: alpha(theme.palette.background.paper, 0.6),
                                textDecoration: "none",
                                transition: "all 0.25s ease-in-out",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    borderColor: theme.palette.primary.main,
                                    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.15)}`
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 8,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: "primary.main",
                                    mb: 2.5,
                                }}
                            >
                                {feature.icon}
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, mb: 1.5 }}
                            >
                                {feature.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.7
                                }}
                            >
                                {feature.description}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
