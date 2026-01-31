import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  HomeOutlined as HomeIcon,
  AppsOutlined as AppsIcon,
  ExtensionOutlined as ExtensionIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export const menuItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  {
    label: "Clients",
    icon: <AppsIcon />,
    path: "/clients",
    subs: ["Android", "iOS", "Official", "Desktop Mods"],
  },
  {
    label: "Plugins",
    icon: <ExtensionIcon />,
    path: "/plugins",
    subs: ["Vendetta", "Vencord", "BetterDiscord"],
  },
  { label: "About", icon: <InfoIcon />, path: "/about" },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <MobileHeader menuItems={menuItems} />
  ) : (
    <DesktopHeader menuItems={menuItems} />
  );
};

export default Header;
