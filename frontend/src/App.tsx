import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import React, {useState} from "react";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import {BodyBox} from "./components/styled/body-styled";
import Write from "./pages/Write";

function App() {

  const [theme, setTheme] = useState<string>('dark');
  const [isSideOpen, setIsSideOpen] = useState<boolean>(true);
  const handleToggleMenu = () => {
    setIsSideOpen(!isSideOpen);
  };

  return (
    <Router>
      <Header theme={theme} onClick={handleToggleMenu}/>
      <BodyBox>
        <SideBar isSideOpen={isSideOpen}></SideBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </BodyBox>
    </Router>
)
}

export default App
