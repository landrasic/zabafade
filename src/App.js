import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@mui/material";

import theme from "./Models/theme";

import MainLayout from "./MainLayout/MainLayout";

const Homepage = lazy(() => import("./Views/Homepage/index"));
const Loginpage = lazy(() => import("./Views/Loginpage/index"));
const Adminpage = lazy(() => import("./Views/Adminpage/index"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<MainLayout />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/login" element={<Loginpage />} />
              <Route path="/admin" element={<Adminpage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
