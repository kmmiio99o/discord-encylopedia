import "./App.css";

import { Container,CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo,useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { ThemeContext } from "./context/ThemeContext";
import { DEFAULT_URLS, UrlConfig,UrlConfigContext } from "./context/UrlConfigContext";
import AppRoutes from "./routes/AppRoutes";
import { darkTheme,lightTheme } from "./styles/theme";

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
