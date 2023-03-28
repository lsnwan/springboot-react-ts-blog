import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import React from "react";
import Login from "./pages/cmm/Login";
import {useStore} from "./store";
import {Provider} from "react-redux";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/main/Home";
import * as Utils from "./utils";
import CommonLayout from "./pages/CommLayout";

function App() {

  const store = useStore();
  Utils.setCookie('theme', 'dark');

  return (
    <Provider store={store}>
      <Router>
        <Routes>
            <Route element={<MainLayout />}>
              <Route index path="/" element={<Home />} />
            </Route>
            <Route element={<CommonLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App