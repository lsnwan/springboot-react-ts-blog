import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import React from "react";
import Login from "./pages/cmm/Login";
import {useStore} from "./store";
import {Provider as ReduxProvider} from "react-redux";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/main/Home";
import CommonLayout from "./pages/CommLayout";
import SignUp from "./pages/cmm/SignUp";
import FindPassword from "./pages/cmm/FindPassword";
import {AuthProvider} from "./contexts";

function App() {

  const store = useStore();

  return (
    <ReduxProvider store={store}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index path="/" element={<Home />} />
            </Route>
            <Route element={<CommonLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/find-password" element={<FindPassword />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ReduxProvider>
  )
}

export default App