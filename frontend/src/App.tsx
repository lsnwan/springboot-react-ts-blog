import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import React, {useState} from "react";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import {BodyBox} from "./components/styled/body-styled";
import Write from "./pages/Write";
import Login from "./pages/Login";
import {useStore} from "./store";
import {Provider} from "react-redux";

function App() {

  const store = useStore();
  const [theme, setTheme] = useState<string>('dark');

  return (
    <Provider store={store}>
      <Router>
        <Header theme={theme}/>
        <BodyBox>
          <SideBar></SideBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BodyBox>
      </Router>
    </Provider>
  )
}

export default App
