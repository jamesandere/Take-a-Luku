import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CreateProduct from "./admin/CreateProduct";
import Dashboard from "./admin/Dashboard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Socials from "./components/Socials";
import BrandCategory from "./pages/BrandCategory";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/details/UserProfile";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Product from "./pages/Product";
import SavedList from "./pages/SavedList";
import Search from "./pages/Search";
import RequireAuth from "./components/RequireAuth";
import EditProfile from "./pages/details/EditProfile";
import User from "./pages/details/User";
import MyOrders from "./pages/details/MyOrders";

function App() {
  return (
    <div className="">
      <SkeletonTheme baseColor="#ebebeb">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/join" element={<Join />}>
              <Route path="register" element={<Register />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/saved-list" element={<SavedList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/brand/:id" element={<BrandCategory />} />
            <Route path="/product/:id" element={<Product />} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<User />}>
                <Route index element={<UserProfile />} />
                <Route path="edit" element={<EditProfile />} />
                <Route path="my-orders" element={<MyOrders />} />
              </Route>
            </Route>
            <Route path="/admin" element={<Dashboard />}>
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          {/* <Socials />
          <Footer /> */}
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;
