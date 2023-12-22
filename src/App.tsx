import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { quiz } from "./data";

// helpers
import { routes } from "./pages/routes";

// component imports
import { Navbar } from "./components/Navbar";
import QuizProvider from "./context/QuizContext";
import { NotFoundEmptyState } from "./components/NotFoundEmptyState";
import { Footer } from "./components/Footer";

const API = "https://opentdb.com/api.php?amount=10";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <QuizProvider>
          <div className="container">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              <Route path="/courses/:id" />
              <Route
                path="*"
                element={
                  <NotFoundEmptyState
                    title="Page not found"
                    redirectUrl="/"
                    redirectText="Go home"
                    type="not found"
                  />
                }
              />
            </Routes>
          </div>
        </QuizProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
