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
import SignUpComplete from "./pages/cmm/SignUpComplete";
import FindPasswordComplete from "./pages/cmm/FindPasswordComplete";
import KakaoLogin from "./pages/oauth/KakaoLogin";
import BlogMain from "./pages/main/blog/BlogMain";

function App() {

  const store = useStore();

  return (
    <ReduxProvider store={store}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout/>}>
              <Route index path="/" element={<Home/>}/>
              <Route index path="/:blogPath" element={<BlogMain />}/>
            </Route>
            <Route element={<CommonLayout/>}>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/signup-complete" element={<SignUpComplete/>}/>
              <Route path="/find-password" element={<FindPassword/>}/>
              <Route path="/find-password-complete" element={<FindPasswordComplete/>} />
              <Route path="/oauth/kakao/callback" element={<KakaoLogin />}></Route>
            </Route>

          </Routes>
        </AuthProvider>
      </Router>
    </ReduxProvider>
  );
}

export default App