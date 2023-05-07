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
import BlogLayout from "./pages/BlogLayout";
import BlogHome from "./pages/main/blog/menu/BlogHome";
import Published from "./pages/main/blog/menu/Published";
import BlogInst from "./pages/main/blog/menu/BlogInst";
import Settings from "./pages/main/blog/menu/Settings";
import CreateBlog from "./pages/main/blog/CreateBlog";
import ViewBlog from "./pages/main/blog/ViewBlog";

function App() {

  const store = useStore();

  return (
    <ReduxProvider store={store}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout/>}>
              <Route index path="/" element={<Home/>}/>
              <Route element={<BlogLayout />}>
                <Route path="/:blogPath" element={<BlogHome/>} />
                <Route path="/:blogPath/published" element={<Published />} />
                <Route path="/:blogPath/inst" element={<BlogInst />} />
                <Route path="/:blogPath/settings" element={<Settings />} />
              </Route>
              <Route path="/:blogPath/create" element={<CreateBlog />} />
              <Route path="/:blogPath/view" element={<ViewBlog />} />
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