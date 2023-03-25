import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import React, {useState} from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import {BodyBox} from "./components/styled/body-styled";

function App() {

  const [theme, setTheme] = useState<string>('dark');

  return (
    <Router>
      <Header theme={theme}/>
      <BodyBox>
        <SideBar></SideBar>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BodyBox>
    </Router>
)
}

export default App
