import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  alpha,
  useTheme,
  Button,
  Tooltip,
} from "@mui/material";
import {
  OpenInNew as LinkIcon,
  Extension as ExtensionIcon,
} from "@mui/icons-material";
import { ClientMod } from "../../types/ClientMod";
import StatusBadge from "./StatusBadge";

interface ClientCardProps {
  client: ClientMod;
  showPlugins?: boolean;
  onViewPlugins?: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  client,
  showPlugins = false,
  onViewPlugins,
}) => {
  const theme = useTheme();

  const extractData = (str: string) => {
    const match = str.match(/\[(.*?)\]\((.*?)\)/);
    return match ? { name: match[1], url: match[2] } : { name: str, url: "" };
  };

  const { name, url } = extractData(client.name);
  const finalUrl = url || client.link;

  const cleanDescription = (text: string) => {
    return text
      .replace(/!\[.*?\]/g, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/\[.*?-Badge\]/g, "")
      .replace(/\[.*?-Url\]/g, "")
      .replace(/!/g, "")
      .trim();
  };

  const cleanLanguage = (lang: string): string => {
    if (!lang) return "Multi";
    if (lang.toLowerCase().includes("closed source")) return "Closed source";
    const matches = lang.match(/\[([a-zA-Z#+\.][a-zA-Z0-9#+\.\s-]*)\]/g);
    if (matches && matches.length > 0) {
      return matches[0].slice(1, -1);
    }
    return lang.trim();
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          transform: "translateY(-4px)",
          boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.08)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}
            >
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {client.subcategory || "Client"}
            </Typography>
          </Box>
          <StatusBadge status={client.developmentStatus} />
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            mb: 3,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "4.8em",
          }}
        >
          {cleanDescription(client.features) || "No description provided."}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Chip
            size="small"
            label={cleanLanguage(client.language)}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            }}
          />
        </Box>
      </CardContent>

      <Stack direction="row" spacing={1} sx={{ p: 2, pt: 0 }}>
        {finalUrl ? (
          <Button
            variant="contained"
            fullWidth
            href={finalUrl}
            target="_blank"
            startIcon={<LinkIcon />}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              py: 1.5,
              boxShadow: "none",
            }}
          >
            Open Link
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            disabled
            startIcon={null}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              py: 1.5,
              boxShadow: "none",
              "&.Mui-disabled": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: alpha(theme.palette.primary.main, 0.5),
              },
            }}
          >
            No Link Available
          </Button>
        )}

        {showPlugins && onViewPlugins && (
          <Tooltip title="View Plugins">
            <Button
              onClick={onViewPlugins}
              sx={{
                minWidth: "48px",
                width: "48px",
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <ExtensionIcon fontSize="small" />
            </Button>
          </Tooltip>
        )}
      </Stack>
    </Card>
  );
};

export default ClientCard;
