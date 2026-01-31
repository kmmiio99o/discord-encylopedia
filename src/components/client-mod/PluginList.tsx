import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Extension as ExtensionIcon,
  CheckCircle as WorkingIcon,
  Cancel as BrokenIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { Plugin } from "../../types/Plugin";

interface PluginListProps {
  open: boolean;
  onClose: () => void;
  plugins: Plugin[];
  clientName: string;
}

const PluginList: React.FC<PluginListProps> = ({
  open,
  onClose,
  plugins,
  clientName,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "working":
        return <WorkingIcon color="success" />;
      case "broken":
        return <BrokenIcon color="error" />;
      case "warning":
        return <WarningIcon color="warning" />;
      default:
        return <ExtensionIcon />;
    }
  };

  const filteredPlugins = plugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.authors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Plugins for {clientName}
            <Chip
              label={`${filteredPlugins.length} plugins`}
              size="small"
              sx={{ ml: 2 }}
            />
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search plugins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </DialogTitle>

      <DialogContent dividers>
        <List>
          {filteredPlugins.map((plugin, index) => (
            <ListItem
              key={index}
              divider={index < filteredPlugins.length - 1}
              sx={{ flexDirection: "column", alignItems: "stretch" }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={1}
              >
                <Box display="flex" alignItems="center">
                  <ListItemIcon>{getStatusIcon(plugin.status)}</ListItemIcon>
                  <ListItemText
                    primary={plugin.name}
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {plugin.description}
                      </Typography>
                    }
                  />
                </Box>
                <Chip
                  label={plugin.status}
                  size="small"
                  color={
                    plugin.status === "working"
                      ? "success"
                      : plugin.status === "warning"
                        ? "warning"
                        : "error"
                  }
                  variant="outlined"
                />
              </Box>

              <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                {plugin.authors.map((author, idx) => (
                  <Chip
                    key={idx}
                    label={author}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>

              {plugin.warningMessage && (
                <Typography
                  variant="caption"
                  color="warning.main"
                  sx={{ fontStyle: "italic" }}
                >
                  Note: {plugin.warningMessage}
                </Typography>
              )}

              <Box display="flex" gap={1} mt={1}>
                <Button
                  size="small"
                  variant="outlined"
                  href={plugin.sourceUrl}
                  target="_blank"
                >
                  Source
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  href={plugin.installUrl}
                  target="_blank"
                >
                  Install
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PluginList;
