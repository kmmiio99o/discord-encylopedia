import React from "react";
import { Box, Typography, alpha, useTheme, ButtonBase } from "@mui/material";
import {
  ChevronRight as ChevronRightIcon,
  Extension as ExtensionIcon,
} from "@mui/icons-material";

interface PluginCategoryCardProps {
  title: string;
  count: number;
  onClick: () => void;
}

const PluginCategoryCard: React.FC<PluginCategoryCardProps> = ({
  title,
  count,
  onClick,
}) => {
  const theme = useTheme();

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        textAlign: "left",
        borderRadius: "12px",
        transition: "transform 0.2s ease",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box
        sx={{
          p: 3,
          width: "100%",
          borderRadius: "12px",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.4),
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: "10px",
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
          }}
        >
          <ExtensionIcon />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {count} Sub-categories found
          </Typography>
        </Box>

        <ChevronRightIcon sx={{ color: "text.disabled" }} />
      </Box>
    </ButtonBase>
  );
};

export default PluginCategoryCard;
