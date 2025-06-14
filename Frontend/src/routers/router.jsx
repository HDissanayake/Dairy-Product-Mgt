import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Public Pages
import Home from "../pages/home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Categories from "../pages/home/Categories";
import Login from "../components/Login";
import Register from "../components/Register";

// Product Pages
import CartPage from "../pages/products/CartPage";
import CheckoutPage from "../pages/products/CheckoutPage";
import SingleProduct from "../pages/products/SingleProduct";
import OrderPage from "../pages/products/OrderPage";

// Admin Auth
import AdminLogin from "../components/AdminLogin";

// Admin Dashboard
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddProduct from "../pages/dashboard/addProduct/AddProduct";
import UpdateProduct from "../pages/dashboard/EditProduct/UpdateProduct";
import ManageProducts from "../pages/dashboard/manageProducts/ManageProducts";
import ViewMessages from "../pages/dashboard/viewMessages/ViewMessages";
import ManageOrders from "../pages/dashboard/ManageOrders/ManageOrders";

// Payment
import PayHereRedirect from "../pages/products/PayHereRedirect";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/categories", element: <Categories /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/products/:id", element: <SingleProduct /> },

      // Protected Routes
      {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage /></PrivateRoute>
      },
      {
        path: "/orders",
        element: <PrivateRoute><OrderPage /></PrivateRoute>
      },
      {
        path: "/payhere-redirect",
        element: <PrivateRoute><PayHereRedirect /></PrivateRoute>
      },
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    children: [
      { path: "", element: <AdminRoute><Dashboard /></AdminRoute> },
      { path: "add-new-product", element: <AdminRoute><AddProduct /></AdminRoute> },
      { path: "edit-product/:id", element: <AdminRoute><UpdateProduct /></AdminRoute> },
      { path: "manage-products", element: <AdminRoute><ManageProducts /></AdminRoute> },
      { path: "view-messages", element: <AdminRoute><ViewMessages /></AdminRoute> },
      { path: "manage-orders", element: <AdminRoute><ManageOrders /></AdminRoute> }
    ]
  }
]);

export default router;
