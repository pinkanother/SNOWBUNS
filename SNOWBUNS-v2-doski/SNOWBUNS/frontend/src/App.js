import React, { useState, useEffect } from "react";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Profile } from "./components/Profile";
import EmailVerify from "./components/auth/EmailVerify/EmailVerify";
import ForgotPassword from "./components/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword/ResetPassword";
import Nav from "./components/Layout/Nav/Nav";
import Sidebar from "./components/Layout/Sidebar/Sidebar";
import Footer from "./components/Layout/Footer/Footer";
import SignNav from "./components/Layout/SignNav/SignNav";
import Landing from "./components/Landing/Landing";
import NotFound from "./components/NotFound/NotFound";
import Faq from "./components/Faqs/Faqs";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { checkAuthentication } from "./actions/authAction";
import "./App.css";
import Country from "./components/Country/Country";
import Settings from "./components/Settings/Settings";
import Purchase from "./components/Purchase/Purchase";
import Wallet from "./components/Wallet/Wallet";
import Channel from "./components/channel/Channel";
import Review from "./components/channel/Review";
function AppContent() {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get isAuthenticated from Redux state

  const dispatch = useDispatch(); // Get dispatch function from Redux

  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    dispatch(checkAuthentication()); // Dispatch checkAuthentication action on component mount
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(sidebar);
  // }, [sidebar]);

  // Layout configuration based on route
  const showNavSidebarFooter =
    isAuthenticated === true || location.pathname === "/";
  const showSignNav = isAuthenticated === false && location.pathname !== "/";
  // const showNoLayout = location.pathname === "/not-found";

  return (
    <div className="App">
      {showNavSidebarFooter && (
        <>
          <Nav />
          <div className="App-main">
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            <div className={`App-main-page ${sidebar ? "small" : "long"}`}>
              <div className="App-main-content">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  {isAuthenticated === false ? (
                    <>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/verify-email" element={<EmailVerify />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                      <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                      />
                    </>
                  ) : (
                    <>
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/faqs" element={<Faq />} />
                      <Route path="/country" element={<Country />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/channel" element={<Channel />} />
                      <Route path="/channelbox" element={<Review />} />
                      <Route
                        path="/purchase"
                        element={
                          <Purchase sidebar={sidebar} setSidebar={setSidebar} />
                        }
                      />
                    </>
                  )}
                  <Route path="/not-found" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
      {showSignNav && (
        <>
          <SignNav />
          <div className="App-sign">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/email-verify" element={<EmailVerify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
