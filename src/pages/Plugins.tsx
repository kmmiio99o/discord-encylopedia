import { Box, Container, Fade,Typography } from "@mui/material";
import React from "react";

const Plugins: React.FC = () => {
    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
            <Container maxWidth="lg">
                <Fade in timeout={500}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography
                            variant="overline"
                            sx={{ color: "primary.main", fontWeight: 900, letterSpacing: 4 }}
                        >
              PLUGINS
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{ fontWeight: 900, letterSpacing: "-0.04em", mt: 1, mb: 2 }}
                        >
              Coming Soon
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary", maxWidth: 500, mx: "auto" }}
                        >
              The plugin repository is currently under development.
              Please check back later for updates.
                        </Typography>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Plugins;
