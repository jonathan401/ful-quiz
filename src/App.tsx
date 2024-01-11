import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.minimal.css";

// helpers
import { protectedRoutes, publicRoutes } from "./pages/routes";

// component imports
import { Navbar } from "./components/Navbar";
import QuizProvider from "./context/QuizContext";
import { NotFoundEmptyState } from "./components/NotFoundEmptyState";
import { Footer } from "./components/Footer";
import AuthProvider from "./context/AuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const API = "https://opentdb.com/api.php?amount=10";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Navbar />
        <main>
          <QuizProvider>
            <div className="container">
              <Routes>
                {/* public routes */}
                {publicRoutes.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}

                {/* protected routes */}
                <Route element={<ProtectedRoutes />}>
                  {protectedRoutes.map((route) => (
                    <Route
                      key={route.key}
                      path={route.path}
                      element={<route.component />}
                    />
                  ))}
                </Route>
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
        <ToastContainer
          autoClose={3000}
          limit={1}
          position="top-right"
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={false}
          draggable={true}
        />
      </AuthProvider>
    </div>
  );
}

export default App;
