import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { quiz } from "./data";

// helpers
import { routes } from "./pages/routes";

// component imports
import { Navbar } from "./components/Navbar";
import QuizProvider from "./context/QuizContext";

const API = "https://opentdb.com/api.php?amount=10";

function App() {
  return (
    <div>
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
              <Route path="*" element={<p>Not found</p>} />
            </Routes>
          </div>
        </QuizProvider>
      </main>
    </div>
  );
}

export default App;
