import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  // useNavigation,
  useRoutes,
} from "react-router-dom";
// import { Outlet } from "react-router-dom";
import AppIndex from "./AppIndex";
// import NotFound from "./NotFound";
import NotFound from "./Notfound";
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
import { useContext, useEffect } from "react";
import AdminReport from "@/app/admin/Reports";
import Transfer from "@/app/Kitchen/Transfer";
import ReceptionSale from "@/app/reception/receptionSale";
import { ReceptionStock } from "@/app/reception/receptionStock";
import ReceptionOutput from "@/app/reception/receptionOuput";
// import { server_url } from "@/lib/Helper";
// import { Navigation,  } from "lucide-react";

export default function AppNavigation() {
  // const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const { user, token } = useContext(AuthContext);
  // let a = localStorage.getItem("@@token");
  // setToken(localStorage.getItem("@@token"));

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    // useNavigation
    if (token) {
      if (!location.pathname.includes("login")) {
        navigation(location.pathname);
      }

      //   fetch(`${server_url}/verify-token`, {
      //     method: "GET",
      //     headers: {
      //       authorization: token,
      //     },
      //   })
      //     .then((resp) => resp.json())
      //     .then((data) => {
      //       if (data.success) {
      //         setUser(data.user);
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      //   // Fetch user data from API here
      //   // setUser(response.data);
    }
  }, [token]);
  console.log(user);
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
              path: "transfer",
              element: (
                <ProtectedRoute rolesAllowed={["kitchen"]}>
                  <Transfer page="Kitchen" />
                </ProtectedRoute>
              ),
            },
            {
              path: "stocks",
              element:
                <ProtectedRoute rolesAllowed={["admin", "manager", "kitchen"]}>
                  {/* <Transfer page="kitchen" /> */}
                  <VipStockTable page="kitchen" />,
                </ProtectedRoute>
            },
            {
              path: "output",
              element: 
              <ProtectedRoute rolesAllowed={["admin", "manager", "kitchen"]}>
                  {/* <Transfer page="kitchen" /> */}
                  <VipOutputTable page="kitchen" />,
                </ProtectedRoute>
            },
            {
              path: "stocks",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager", "kitchen"]}>
                  <Transfer page="kitchen" />
                </ProtectedRoute>
              ),
            },
            {
              path: "output",
              element: (
                <ProtectedRoute rolesAllowed={["admin", "manager", "kitchen"]}>
                  <Transfer page="kitchen" />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "reception",
          element: <Outlet />,
          children: [
            {
              path: "sales",
              element: (
                <ProtectedRoute rolesAllowed={["reception"]}>
                  <ReceptionSale />
                </ProtectedRoute>
              ),
            },
            {
              path: "stocks",
              element: (
                <ProtectedRoute
                  rolesAllowed={["admin", "manager", "reception"]}
                >
                  <ReceptionStock />
                </ProtectedRoute>
              ),
            },
            {
              path: "output",
              element: (
                <ProtectedRoute
                  rolesAllowed={["admin", "manager", "reception"]}
                >
                  <ReceptionOutput />
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
