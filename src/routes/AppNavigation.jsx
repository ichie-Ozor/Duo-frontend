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
import ProtectedRoute from "./Protected";
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
import AdminReport from "@/app/admin/Reports";

export default function AppNavigation() {
  // const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const { user, setUser, token, setToken } = useContext(AuthContext);

  console.log(user, "navigation ");

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
        // {
        //   path: "in-out",
        //   element: <InAndOut />,
        // },
        {
          path: "in-out",
          element: (
            <ProtectedRoute rolesAllowed={["store"]}>
              <InAndOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "stocks",
          element: (
            <ProtectedRoute rolesAllowed={["admin", "manager", "store"]}>
              <StockTable />
            </ProtectedRoute>
          ),
        },

        {
          path: "output",
          element: (
            <ProtectedRoute rolesAllowed={["admin", "manager", "store"]}>
              <OutputTable />
            </ProtectedRoute>
          ),
        },

        {
          path: "vip",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: (
                <ProtectedRoute rolesAllowed={["vip"]}>
                  <VipSales />
                </ProtectedRoute>
              ),
            },
            {
              path: "stocks",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager", "vip"]}>
                  <VipStockTable page="vip" />
                </ProtectedRoute>
              ),
            },
            {
              path: "output",
              element: (
                <ProtectedRoute rolesAllowed={["manager", "admin", "vip"]}>
                  <VipOutputTable page="vip" />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "vibe",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: (
                <ProtectedRoute rolesAllowed={["vibe"]}>
                  <VipSales page="Vibe" />
                </ProtectedRoute>
              ),
            },
            {
              path: "stocks",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager", "vibe"]}>
                  <VipStockTable page="vibe" />
                </ProtectedRoute>
              ),
            },
            {
              path: "output",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager", "vibe"]}>
                  <VipOutputTable page="vibe" />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "kitchen",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: (
                <ProtectedRoute rolesAllowed={["kitchen"]}>
                  <VipSales page="Kitchen" />
                </ProtectedRoute>
              ),
            },
            {
              path: "stocks",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager", "kitchen"]}>
                  <VipStockTable page="kitchen" />
                </ProtectedRoute>
              ),
            },
            {
              path: "output",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager", "kitchen"]}>
                  <VipOutputTable page="kitchen" />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "manager",
          element: <Outlet />,
          children: [
            {
              path: "report",
              element: (
                <ProtectedRoute rolesAllowed={["manager", "admin"]}>
                  <ManagerReport />
                </ProtectedRoute>
              ),
            },
            {
              path: "menu",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager"]}>
                  <Menus />
                </ProtectedRoute>
              ),
            },
            // {
            //   path: "output",
            //   element: <VipOutputTable />,
            // },
          ],
        },
        {
          path: "admin",
          element: <Outlet />,
          children: [
            {
              path: "reports",
              element: (
                <ProtectedRoute rolesAllowed={["admin"]}>
                  <AdminReport />
                </ProtectedRoute>
              ),
            },
            // {
            //   path: "stocks",
            //   element: <VipStockTable page="vip" />,
            // },
            // {
            //   path: "output",
            //   element: <VipOutputTable />,
            // },
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
