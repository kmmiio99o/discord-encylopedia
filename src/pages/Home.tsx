import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 8, md: 12 },
          px: 2,
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              letterSpacing: "-0.02em",
              color: theme.palette.text.primary,
              lineHeight: 1.2,
            }}
          >
            Discord Client
            <Box component="span" sx={{ display: "block", mt: 1 }}>
              Encyclopedia
            </Box>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              color: theme.palette.text.secondary,
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            Discover, compare, and explore Discord clients, modifications, and
            community tools.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/clients"
              startIcon={<ExploreIcon />}
              sx={{
                borderRadius: 2,
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
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              View Source
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          textAlign: "center",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Ready to explore?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mb: 2,
            }}
          >
            Start browsing our curated collection of Discord clients and tools.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/clients"
            startIcon={<ExploreIcon />}
            sx={{
              borderRadius: 2,
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Browse All Clients
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Home;
