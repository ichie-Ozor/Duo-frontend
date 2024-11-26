import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/app/auth/Context";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  teams: [
    {
      name: "Duo Hotels",
      logo: GalleryVerticalEnd,
      plan: "Store",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Store",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        // {
        //   title: "Dashbord",
        //   url: "dashboard",
        // },
        {
          title: "In & Out",
          url: "In-out",
          roles: ["store"],
        },
        {
          title: "Stock",
          url: "stocks",
          roles: ["store", "manager", "admin"],
        },
        {
          title: "Output",
          url: "output",
          roles: ["store", "manager", "admin"],
        },
      ],
    },
    {
      title: "VIP",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        // {
        //   title: "Dashbord",
        //   url: "dashboard",
        // },
        {
          title: "Sales",
          url: "vip/sales",
          roles: ["vip"],
        },
        {
          title: "Stock",
          url: "vip/stocks",
          roles: ["vip", "manager", "admin"],
        },
        {
          title: "Output",
          url: "vip/output",
          roles: ["vip", "manager", "admin"],
        },
      ],
    },
    {
      title: "VIBE",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        // {
        //   title: "Dashbord",
        //   url: "dashboard",
        // },
        {
          title: "Sales",
          url: "vibe/sales",
          roles: ["vibe"],
        },
        {
          title: "Stock",
          url: "vibe/stocks",
          roles: ["vibe", "manager", "admin"],
        },
        {
          title: "Output",
          url: "vibe/output",
          roles: ["vibe", "manager", "admin"],
        },
      ],
    },
    {
      title: "Kitchen",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        // {
        //   title: "Dashbord",
        //   url: "dashboard",
        // },
        {
          title: "Transfer",
          url: "kitchen/sales",
          roles: ["kitchen"],
        },
        {
          title: "Stock",
          url: "kitchen/stocks",
          roles: ["kitchen", "manager", "admin"],
        },
        {
          title: "Output",
          url: "kitchen/output",
          roles: ["kitchen", "manager", "admin"],
        },
      ],
    },
    {
      title: "Manager",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        // {
        //   title: "Dashbord",
        //   url: "dashboard",
        // },
        {
          title: "Report",
          url: "manager/report",
          roles: ["manager", "admin"],
        },
        {
          title: "Settings",
          url: "manager/menu",
          roles: ["manager", "admin"],
        },
        // {
        //   title: "Output",
        //   url: "kitchen/output",
        // },
      ],
    },
    {
      title: "Admin",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Reports",
          url: "admin/reports",
          roles: ["admin"],
        },
        // {
        //   title: "Sales",
        //   url: "kitchen/sales",
        // },
        // {
        //   title: "Stock",
        //   url: "kitchen/stocks",
        // },
        // {
        //   title: "Output",
        //   url: "kitchen/output",
        // },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useContext(AuthContext);
  const userRole = user?.accessTo;

  console.log(userRole, "user role", user);

  const filteredNavMain = data.navMain.filter((item) => {
    return item.items.roles?.includes(userRole);
  });

  const navItems = filteredNavMain.map((item) => ({
    ...item,
    items: item.items?.filter((subItem) => subItem.roles?.includes(userRole)),
  }));

  return (
    <Sidebar collapsible="icon" {...props} className="duo-sidebar">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
