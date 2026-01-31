import { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";
import { UrlConfigContext, UrlConfig } from "./context/UrlConfigContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Plugins from "./pages/Plugins";
import About from "./pages/About";
import { lightTheme, darkTheme } from "./styles/theme";
import "./App.css";

const DEFAULT_URLS: UrlConfig = {
  readme:
    "https://raw.githubusercontent.com/Discord-Client-Encyclopedia-Management/Discord3rdparties/refs/heads/main/README.md",
  plugins:
    "https://raw.githubusercontent.com/Purple-EyeZ/Plugins-List/refs/heads/main/src/plugins-data.json",
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [urls, setUrls] = useState<UrlConfig>(DEFAULT_URLS);

  const urlContextValue = useMemo(
    () => ({
      urls,
      setUrls,
      resetUrls: () => setUrls(DEFAULT_URLS),
      showConfigDialog: () => console.log("Config dialog logic here"),
    }),
    [urls],
  );

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme: () => setIsDarkMode(!isDarkMode) }}
    >
      <UrlConfigContext.Provider value={urlContextValue}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Router>
            <div className="app">
              <Header />
              <Container
                component="main"
                maxWidth="xl"
                className="main-content"
                sx={{ pt: { xs: 12, md: 16 }, pb: 10, minHeight: "100vh" }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/plugins" element={<Plugins />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Container>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </UrlConfigContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
