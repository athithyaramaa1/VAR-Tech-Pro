import "./App.css";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Policy from "./pages/Policy";
import SplashPage from "./pages/Splash Page/App";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/user/Dashboard";
import PrivatePage from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateProducts from "./pages/admin/CreateProducts";
import CreateCategory from "./pages/admin/CreateCategory";
// import GradientCircularProgress from "./components/Spinner";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import UserBioCard from "./pages/user/UserCard";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/dashboard" element={<PrivatePage />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<UserProfile />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-products" element={<CreateProducts />} />
        <Route path="admin/users" element={<Users />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/spinner" element={<GradientCircularProgress />} /> */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
