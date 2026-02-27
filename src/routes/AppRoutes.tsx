import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Home from "../pages/Home";
import Clients from "../pages/Clients";
import Plugins from "../pages/Plugins";
import About from "../pages/About";

const LOADING_ROUTES = ["/clients", "/plugins"];

function AppRoutes() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const isLoadingRoute = LOADING_ROUTES.includes(location.pathname);

    if (isLoadingRoute) {
      setIsNavigating(true);
      const timer = setTimeout(() => setIsNavigating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        open={isNavigating}
      >
        <CircularProgress color="primary" size={50} />
      </Backdrop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/plugins" element={<Plugins />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
