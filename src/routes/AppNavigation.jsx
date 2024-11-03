import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
// import { Outlet } from "react-router-dom";
import AppIndex from "./AppIndex";
import NotFound from "./NotFound";
// import { useDispatch, useSelector } from "react-redux";
import Dashboard from "@/app/dashboard/page";
import { StockTable } from "@/app/Stocks/StockTable";
import InAndOut from "@/app/In/InAndOut";
import OutputTable from "@/app/Stocks/OutputTable";
import VipSales from "@/app/Vip/Sale";
import { VipStockTable } from "@/app/Vip/StockTable";
import VipOutputTable from "@/app/Vip/OutputTable";
import Menus from "@/app/Manager/Menus";
import Login from "@/app/auth/Login";
import ManagerReport from "@/app/Manager/Reports";
import { AuthContext } from "@/app/auth/Context";
import { useContext } from "react";

export default function AppNavigation() {
  // const isAuthenticated = useSelector((state) => state.auth.authenticated);
const { user, setUser, token, setToken } = useContext(AuthContext);
 
  let Pages = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <AppIndex />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "in-out",
          element: <InAndOut />,
        },
        {
          path: "stocks",
          element: <StockTable />,
        },

        {
          path: "output",
          element: <OutputTable />,
        },

        {
          path: "vip",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: <VipSales />,
            },
            {
              path: "stocks",
              element: <VipStockTable />,
            },
            {
              path: "output",
              element: <VipOutputTable />,
            },
          ],
        },
        {
          path: "vibe",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: <VipSales page="Vibe" />,
            },
            {
              path: "stocks",
              element: <VipStockTable />,
            },
            {
              path: "output",
              element: <VipOutputTable />,
            },
          ],
        },
        {
          path: "kitchen",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: <VipSales page="Kitchen" />,
            },
            {
              path: "stocks",
              element: <VipStockTable />,
            },
            {
              path: "output",
              element: <VipOutputTable />,
            },
          ],
        },
        {
          path: "manager",
          element: <Outlet />,
          children: [
            {
              path: "report",
              element: <ManagerReport />,
            },
            {
              path: "menu",
              element: <Menus />,
            },
            {
              path: "output",
              element: <VipOutputTable />,
            },
          ],
        },
        {
          path: "admin",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: <VipSales />,
            },
            {
              path: "stocks",
              element: <VipStockTable />,
            },
            {
              path: "output",
              element: <VipOutputTable />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return Pages;
}
