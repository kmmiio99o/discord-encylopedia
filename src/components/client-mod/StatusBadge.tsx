import React from "react";
import { Chip, Tooltip, alpha, useTheme } from "@mui/material";
import {
  CheckCircle as ActiveIcon,
  Build as DevIcon,
  PauseCircle as HiatusIcon,
  Cancel as BrokenIcon,
  History as LegacyIcon,
} from "@mui/icons-material";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const theme = useTheme();

  const getStatus = () => {
    const s = status.toLowerCase().trim();

    // 1. Check for legacy clients
    if (s.includes("legacy") || s.includes("variable")) {
      return {
        label: "Legacy",
        color: theme.palette.info.main,
        icon: <LegacyIcon fontSize="inherit" />,
        tooltip: "Active but on a legacy version of the app",
      };
    }

    // 2. Strict Emoji Checks
    if (s.includes("🟢")) {
      return {
        label: "Active",
        color: theme.palette.success.main,
        icon: <ActiveIcon fontSize="inherit" />,
        tooltip: "Actively maintained",
      };
    }
    if (s.includes("🟠")) {
      return {
        label: "Hiatus",
        color: theme.palette.warning.main,
        icon: <HiatusIcon fontSize="inherit" />,
        tooltip: "Development paused",
      };
    }
    if (s.includes("🔴")) {
      return {
        label: "Broken",
        color: theme.palette.error.main,
        icon: <BrokenIcon fontSize="inherit" />,
        tooltip: "Project is discontinued or broken",
      };
    }

    // 3. Development State handling
    if (s.includes("🔵") || s.includes("development state")) {
      return {
        label: "In Dev",
        color: theme.palette.info.light,
        icon: <DevIcon fontSize="inherit" />,
        tooltip: "Currently in development",
      };
    }

    return {
      label: "Unknown",
      color: theme.palette.grey[500],
      icon: null,
      tooltip: status,
    };
  };

  const config = getStatus();

  return (
    <Tooltip title={config.tooltip || ""}>
      <Chip
        label={config.label}
        size="small"
        icon={config.icon || undefined}
        sx={{
          height: 22,
          borderRadius: "6px",
          fontSize: "0.65rem",
          fontWeight: 900,
          textTransform: "uppercase",
          backgroundColor: alpha(config.color, 0.1),
          color: config.color,
          border: `1px solid ${alpha(config.color, 0.2)}`,
          "& .MuiChip-icon": { color: "inherit", fontSize: "12px" },
        }}
      />
    </Tooltip>
  );
};

export default StatusBadge;
