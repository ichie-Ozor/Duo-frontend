import { useCallback, useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, Package2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { _get, separator } from "../lib/Helper";
// import DropdownLink from "../pages/UI/DropDownLink";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";
export function AppIn() {
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);
  const logOut = () => {
    dispatch(logout(navigate));
  };
  const getBalance = useCallback(() => {
    _get(
      `balance?query_type=balance&source_id=${user.account_id}`,
      (resp) => {
        //  console.log(resp.results[0]);
        setBalance(resp.results[0].balance);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [user]);
  useEffect(() => {
    getBalance();
  }, [showBalance, getBalance]);

  const [activeDropdown, setActiveDropdown] = useState(null);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-yellow-400 md:block fixed top-0 z-30 -ml-2 hidden h-[calc(100vh-0.1px)] w-full shrink-0 md:sticky md:block h-full">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center sticky top-0  border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <h4 className="text-muted">Keke App</h4>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1 ">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2"></nav>
          </div>
          <div className="mt-auto p-0 sticky bottom-0 ">
            <Card
              x-chunk="dashboard-02-chunk-0"
              className="bg-yellow-400 border-none"
            >
              <CardContent className="p-2 pt-0 md:p-4 ">
                <Button size="sm" className="w-full">
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 text-black ">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-yellow-400 ">
              <nav className="grid gap-2 text-lg font-medium bg-yellow-400">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Keke App</span>
                </Link>
                {sidebarModules.map((module, index) => {
                  // Check if the user has access to the module
                  if (user.accessTo && user.accessTo.includes(module.title)) {
                    // If the module has a submenu
                    if (module.subMenu) {
                      return (
                        <DropdownMenu
                          key={index}
                          mainPath={module.route}
                          mainLabel={module.title}
                          icon={module.icon}
                          subPaths={
                            // Filter the submenu to only include items the user has access to
                            module.subMenu.filter(
                              (subItem) =>
                                user.functionalities &&
                                user.functionalities.includes(subItem.label)
                            )
                          }
                          isOpen={activeDropdown === module.title}
                        />
                      );
                    } else {
                      return (
                        <NavLink
                          key={index}
                          to={module.route}
                          className={({ isActive }) =>
                            `flex items-center gap-4 rounded-lg p-2 transition-all hover:text-primary hover:bg-muted ${
                              isActive ? "bg-muted text-primary" : "text-muted"
                            }`
                          }
                          onClick={closeSheet}
                        >
                          {module.icon && <module.icon />}
                          {module.title}
                        </NavLink>
                        // <div
                        //   key={index}
                        //   onClick={() => navigate(module.route)}
                        //   className={`navbar-link-item ${
                        //     location.pathname === module.route &&
                        //     "navbar-active-side-menu"
                        //   }`}
                        // >
                        //   <module.icon className="icon shadow" />
                        //   {module.title}
                        // </div>
                      );
                    }
                  }
                  return null; // Return null if the user doesn't have access
                })}
              </nav>
              <div className="mt-auto">
                <Card className="border-0">
                  {/* <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader> */}
                  <CardContent className="p-4 bg-yellow-400 border-none">
                    <Button size="sm" className="w-full" onClick={logOut}>
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                {/* <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                /> */}
                <h4>Welcome {user.username}</h4>
              </div>
            </form>
          </div>
          <h4>
            Balance :{" "}
            {showBalance ? (
              balance != null ? (
                separator(balance)
              ) : (
                0
              )
            ) : (
              <span style={{ marginTop: 10, fontWeight: "bold" }}>***</span>
            )}{" "}
          </h4>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 bg-transparent"
            onClick={() => {
              setShowBalance(!showBalance);
            }}
          >
            {showBalance ? <EyeOff color="black" /> : <Eye />}
          </Button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
        <main className="sm:p-2 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthContext } from "@/app/auth/Context";

export default function AppIndex() {
  const location = useLocation();
  const { user, setUser, token, setToken } = useContext(AuthContext);
  console.log(user, token, "App index");
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="dashboard">Store</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{location.pathname.slice(1)}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <h3 className="mr-6 pr-5 text-2xl">{user.name}</h3>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
