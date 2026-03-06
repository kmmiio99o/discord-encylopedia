import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    primaryContainer: string;
    onPrimaryContainer: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
  }
  interface PaletteOptions {
    primaryContainer?: string;
    onPrimaryContainer?: string;
    secondaryContainer?: string;
    onSecondaryContainer?: string;
  }
  interface TypographyVariants {
    titleMedium: React.CSSProperties;
    bodyMedium: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    titleMedium?: React.CSSProperties;
    bodyMedium?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    titleMedium: true;
    bodyMedium: true;
  }
}

const baseTypography = {
    fontFamily: '"Google Sans", "Plus Jakarta Sans", "Inter", sans-serif',
    titleMedium: { fontSize: "1rem", fontWeight: 600 },
    bodyMedium: { fontSize: "0.925rem" },
};

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1a73e8" },
        primaryContainer: "#d3e3fd",
        onPrimaryContainer: "#041e49",
        secondaryContainer: "#e8f0fe",
        onSecondaryContainer: "#174ea6",
        background: { default: "#fdfcff", paper: "#ffffff" },
    },
    typography: baseTypography,
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#a8c7fa" },
        primaryContainer: "#0842a0",
        onPrimaryContainer: "#d3e3fd",
        secondaryContainer: "#3c4043",
        onSecondaryContainer: "#e8f0fe",
        background: { default: "#1a1c1e", paper: "#202124" },
    },
    typography: baseTypography,
});
