import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Restore as RestoreIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

interface UrlConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (urls: { readme: string; plugins: string }) => void;
  initialUrls: { readme: string; plugins: string };
}

const UrlConfigDialog: React.FC<UrlConfigDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialUrls,
}) => {
  const [urls, setUrls] = useState(initialUrls);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(urls);
  };

  const handleReset = () => {
    setUrls({
      readme:
        "https://raw.githubusercontent.com/Discord-Client-Encyclopedia-Management/Discord3rdparties/refs/heads/main/README.md",
      plugins:
        "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json",
    });
  };

  const copyToClipboard = async () => {
    const config = JSON.stringify(urls, null, 2);
    await navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <SettingsIcon />
            Configure External URLs
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Alert severity="info" sx={{ mb: 2 }}>
            Configure the external URLs where your data is stored. Use raw
            GitHub URLs or any public JSON/Markdown endpoints.
          </Alert>

          <TextField
            fullWidth
            label="README.md URL"
            value={urls.readme}
            onChange={(e) => setUrls({ ...urls, readme: e.target.value })}
            margin="normal"
            error={!validateUrl(urls.readme)}
            helperText={
              !validateUrl(urls.readme)
                ? "Invalid URL"
                : "URL to your markdown file"
            }
            required
          />

          <TextField
            fullWidth
            label="Plugins JSON URL"
            value={urls.plugins}
            onChange={(e) => setUrls({ ...urls, plugins: e.target.value })}
            margin="normal"
            error={!validateUrl(urls.plugins)}
            helperText={
              !validateUrl(urls.plugins)
                ? "Invalid URL"
                : "URL to your plugins JSON file"
            }
            required
          />

          <Box display="flex" gap={1} mt={2}>
            <Tooltip title="Reset to default URLs">
              <IconButton onClick={handleReset} size="small">
                <RestoreIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={copied ? "Copied!" : "Copy configuration"}>
              <IconButton onClick={copyToClipboard} size="small">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!validateUrl(urls.readme) || !validateUrl(urls.plugins)}
          >
            Save Configuration
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UrlConfigDialog;
