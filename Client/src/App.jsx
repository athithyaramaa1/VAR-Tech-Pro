import "./App.css";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Policy from "./pages/Policy";
import SplashPage from "./pages/Splash Page/App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SplashPage />} />
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/policy" element={<Policy />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
