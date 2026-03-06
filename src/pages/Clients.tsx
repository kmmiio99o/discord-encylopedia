import { FilterList,KeyboardArrowDown } from "@mui/icons-material";
import {
    alpha,
    Box,
    Container,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ClientCard from "../components/client-mod/ClientCard";
import { UrlConfigContext } from "../context/UrlConfigContext";
import { useRemoteMarkdown } from "../hooks/useRemoteData";
import { parseCategorizedMarkdown } from "../utils/markdownParser";

const Dropdown = ({
    label,
    value,
    options,
    onChange,
    isOpen,
    onToggle,
    onClose,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ position: "relative", flex: 1 }}>
            <Box
                onClick={() => onToggle()}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    border: `1px solid ${isOpen ? theme.palette.primary.main : theme.palette.divider}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        borderColor: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FilterList sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography fontWeight={600} fontSize="0.9rem">
                        {label}:
                    </Typography>
                    <Typography fontWeight={500} color="primary.main">
                        {value}
                    </Typography>
                </Box>
                <KeyboardArrowDown
                    sx={{
                        fontSize: 20,
                        color: "text.secondary",
                        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    mt: 1,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.15)}`,
                    overflow: "hidden",
                    zIndex: 1000,
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? "visible" : "hidden",
                    transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {options.map(option => (
                    <Box
                        key={option}
                        onClick={() => {
                            onChange(option);
                            onClose();
                        }}
                        sx={{
                            px: 2,
                            py: 1.5,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            bgcolor: value === option ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                            "&:hover": {
                                bgcolor: value === option
                                    ? alpha(theme.palette.primary.main, 0.15)
                                    : alpha(theme.palette.primary.main, 0.05),
                            },
                        }}
                    >
                        <Typography
                            fontWeight={value === option ? 700 : 500}
                            color={value === option ? "primary.main" : "text.primary"}
                            fontSize="0.9rem"
                        >
                            {option}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const Clients: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const activeCat = searchParams.get("category") || "Mobile";
    const activeSub = searchParams.get("sub");

    const context = React.useContext(UrlConfigContext);
    const { data, isLoading } = useRemoteMarkdown(context?.urls?.readme || "");

    const categories = useMemo(
        () => (data ? parseCategorizedMarkdown(data) : []),
        [data],
    );

    const mainCategories = useMemo(
        () => Array.from(new Set(categories.map(c => c.title))),
        [categories],
    );

    const getSubcategories = (category: string) => {
        return Array.from(
            new Set(
                categories
                    .filter(c => c.title.toLowerCase() === category.toLowerCase())
                    .map(c => c.subcategory),
            ),
        ).filter((s): s is string => s !== undefined);
    };

    const currentSubcategories = getSubcategories(activeCat);
    const effectiveSub = activeSub || currentSubcategories[0];

    const currentView = categories.find(
        c =>
            c.title.toLowerCase() === activeCat.toLowerCase() &&
      c.subcategory === effectiveSub,
    );

    const handleCategoryChange = (cat: string) => {
        const subs = getSubcategories(cat);
        setSearchParams({ category: cat, sub: subs[0] || "" });
    };

    const handleSubChange = (sub: string) => {
        setSearchParams({ category: activeCat, sub });
    };

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    if (isLoading) return null;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
                pt: { xs: 2, md: 8 },
                pb: 8,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: { xs: 3, md: 4 } }}>
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 800, letterSpacing: -1, mb: 0.5 }}
                    >
            Registry
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {currentView?.clients.length || 0} clients in {effectiveSub}
                    </Typography>
                </Box>

                {/* Mobile: Two Dropdowns */}
                <Box
                    sx={{
                        display: { xs: "flex", lg: "none" },
                        flexDirection: "column",
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Dropdown
                        label="Category"
                        value={activeCat}
                        options={mainCategories}
                        onChange={handleCategoryChange}
                        isOpen={openDropdown === "category"}
                        onToggle={() => toggleDropdown("category")}
                        onClose={() => setOpenDropdown(null)}
                    />
                    <Dropdown
                        label="Type"
                        value={effectiveSub}
                        options={currentSubcategories}
                        onChange={handleSubChange}
                        isOpen={openDropdown === "type"}
                        onToggle={() => toggleDropdown("type")}
                        onClose={() => setOpenDropdown(null)}
                    />
                </Box>

                {/* Desktop: Compact Dropdowns */}
                <Box
                    sx={{
                        display: { xs: "none", lg: "flex" },
                        alignItems: "center",
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <Dropdown
                        label="Category"
                        value={activeCat}
                        options={mainCategories}
                        onChange={handleCategoryChange}
                        isOpen={openDropdown === "category"}
                        onToggle={() => toggleDropdown("category")}
                        onClose={() => setOpenDropdown(null)}
                    />
                    <Dropdown
                        label="Type"
                        value={effectiveSub}
                        options={currentSubcategories}
                        onChange={handleSubChange}
                        isOpen={openDropdown === "type"}
                        onToggle={() => toggleDropdown("type")}
                        onClose={() => setOpenDropdown(null)}
                    />
                </Box>

                {/* Client Grid */}
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
            </Container>
        </Box>
    );
};

export default Clients;
