import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  useTheme,
  Stack,
  ButtonBase,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { useRemoteMarkdown } from "../hooks/useRemoteData";
import { UrlConfigContext } from "../context/UrlConfigContext";
import { parseCategorizedMarkdown } from "../utils/markdownParser";
import ClientCard from "../components/client-mod/ClientCard";
import { KeyboardArrowDown } from "@mui/icons-material";

const Clients: React.FC = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenuCat, setActiveMenuCat] = useState<string | null>(null);

  const activeCat = searchParams.get("category") || "Mobile";
  const activeSub = searchParams.get("sub");

  const context = React.useContext(UrlConfigContext);
  const { data, isLoading } = useRemoteMarkdown(context?.urls?.readme || "");

  const categories = useMemo(
    () => (data ? parseCategorizedMarkdown(data) : []),
    [data],
  );

  const mainCategories = useMemo(
    () => Array.from(new Set(categories.map((c) => c.title))),
    [categories],
  );

  const getSubcategories = (category: string) => {
    return Array.from(
      new Set(
        categories
          .filter((c) => c.title.toLowerCase() === category.toLowerCase())
          .map((c) => c.subcategory),
      ),
    );
  };

  const currentSubcategories = getSubcategories(activeCat);
  const effectiveSub = activeSub || currentSubcategories[0];

  const currentView = categories.find(
    (c) =>
      c.title.toLowerCase() === activeCat.toLowerCase() &&
      c.subcategory === effectiveSub,
  );

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    cat: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setActiveMenuCat(cat);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveMenuCat(null);
  };

  const selectCategory = (cat: string, sub: string) => {
    setSearchParams({ category: cat, sub });
    handleClose();
  };

  if (isLoading) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        pt: { xs: 4, md: 8 },
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={3}
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, letterSpacing: -1 }}
            >
              Registry
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Viewing {activeCat}{" "}
              <Box component="span" sx={{ opacity: 0.5 }}>
                /
              </Box>{" "}
              {effectiveSub}
            </Typography>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "auto" },
              overflowX: "auto",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              pb: { xs: 1, md: 0 },
            }}
          >
            <Stack
              direction="row"
              display="inline-flex"
              sx={{
                p: 0.5,
                bgcolor: "background.paper",
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              {mainCategories.map((cat) => {
                const isActive = activeCat === cat;
                const subs = getSubcategories(cat);

                return (
                  <ButtonBase
                    key={cat}
                    onClick={(e) =>
                      subs.length > 1
                        ? handleOpenMenu(e, cat)
                        : selectCategory(cat, subs[0] || '')
                    }
                    sx={{
                      px: { xs: 2, md: 2.5 },
                      py: 1,
                      borderRadius: 2.5,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      flexShrink: 0,
                      color: isActive ? "primary.main" : "text.secondary",
                      bgcolor: isActive
                        ? theme.palette.primary.main + "10"
                        : "transparent",
                      "&:hover": { bgcolor: theme.palette.action.hover },
                    }}
                  >
                    {cat}
                    {subs.length > 1 && (
                      <KeyboardArrowDown
                        sx={{ fontSize: 16, ml: 0.5, opacity: 0.5 }}
                      />
                    )}
                  </ButtonBase>
                );
              })}
            </Stack>
          </Box>
        </Stack>

        {/* Client Grid */}
        <Fade in={true} timeout={400}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {currentView?.clients.map((client, idx) => (
              <ClientCard key={`${client.name}-${idx}`} client={client} />
            ))}
          </Box>
        </Fade>

        {/* Adaptive Menu for Subcategories */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          elevation={4}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              "& .MuiMenuItem-root": {
                fontSize: "0.9rem",
                fontWeight: 500,
                borderRadius: 1.5,
                mx: 1,
                my: 0.5,
                py: 1,
              },
            },
          }}
        >
          {activeMenuCat &&
            getSubcategories(activeMenuCat)
              .filter((sub): sub is string => sub !== undefined)
              .map((sub) => (
                <MenuItem
                  key={sub}
                  onClick={() => selectCategory(activeMenuCat, sub)}
                  selected={activeCat === activeMenuCat && effectiveSub === sub}
                >
                  {sub}
                </MenuItem>
              ))}
        </Menu>
      </Container>
    </Box>
  );
};

export default Clients;
