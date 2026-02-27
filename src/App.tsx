import { useState, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { ThemeContext } from "./context/ThemeContext";
import { UrlConfigContext, DEFAULT_URLS, UrlConfig } from "./context/UrlConfigContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import { lightTheme, darkTheme } from "./styles/theme";
import "./App.css";

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
                <AppRoutes />
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
