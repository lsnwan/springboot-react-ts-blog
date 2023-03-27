import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import React from "react";
import Login from "./pages/cmm/Login";
import {useStore} from "./store";
import {Provider} from "react-redux";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/main/Home";

function App() {

  const store = useStore();

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
