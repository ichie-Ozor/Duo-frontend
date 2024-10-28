import {
  Navigate,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import AppIndex from "./AppIndex";
import NotFound from "./NotFound";
// import { useDispatch, useSelector } from "react-redux";
import Dashboard from "@/app/dashboard/page";
import { StockTable } from "@/app/Stocks/StockTable";
import InAndOut from "@/app/In/InAndOut";

export default function AppNavigation() {
  // const isAuthenticated = useSelector((state) => state.auth.authenticated);

  let Pages = useRoutes([
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
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

        // {
        //   path: "superagenttable",
        //   element: <SuperAgentTable />,
        // },

        // {
        //   path: "superagenthistory/history/:id",
        //   element: <SuperAgentHistory />,
        // },

        // {
        //   path: "agenttable/view/:id",
        //   element: <AgentView />,
        // },

        // {
        //   path: "vendorReg/detail/:id",
        //   element: <VendorDetail />,
        // },
        // {
        //   path: "/vehicleOwner",
        //   element: <VehicleOwner />,
        // },
        // {
        //   path: "collection-point",
        //   element: <CollectionPointData />,
        // },
      ],
    },
    // {
    //   path: "/",
    //   element: isAuthenticated ? (
    //     <Navigate to="/dashboard" replace />
    //   ) : (
    //     <Navigate to="/login" replace />
    //   ),
    // },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return Pages;
}
