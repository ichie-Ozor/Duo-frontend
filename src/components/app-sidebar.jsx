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
        },
        {
          title: "Stock",
          url: "stocks",
        },
        {
          title: "Output",
          url: "output",
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
        },
        {
          title: "Stock",
          url: "vip/stocks",
        },
        {
          title: "Output",
          url: "vip/output",
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
        },
        {
          title: "Stock",
          url: "vibe/stocks",
        },
        {
          title: "Output",
          url: "vibe/output",
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
          url: "kitchen/transfer",
        },
        {
          title: "Stock",
          url: "kitchen/stocks",
        },
        {
          title: "Output",
          url: "kitchen/output",
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
        },
        {
          title: "Settings",
          url: "manager/menu",
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
  return (
    <Sidebar collapsible="icon" {...props} className="duo-sidebar">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
