import { Bot, SquareTerminal, User } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Product",
      url: "#",
      icon: SquareTerminal,
      // isActive: true,
      items: [
        {
          title: "Create",
          url: "#",
        },
        {
          title: "Update",
          url: "#",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Create",
          url: "#",
        },
        {
          title: "Update",
          url: "#",
        },
      ],
    },
    {
      title: "User",
      url: "#",
      icon: User,
      items: [
        {
          title: "Create",
          url: "#",
        },
        {
          title: "Update",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({
  onSectionChange,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onSectionChange: (
    section:
      | "product"
      | "category"
      | "user"
      | "user-create"
      | "product-create"
      | "category-create"
  ) => void;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/*<SidebarHeader>*/}
      {/*  <TeamSwitcher teams={data.teams} />*/}
      {/*</SidebarHeader>*/}
      <SidebarContent>
        <NavMain items={data.navMain} onSectionChange={onSectionChange} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      {/*<SidebarFooter>*/}
      {/*  <NavUser user={data.user} />*/}
      {/*</SidebarFooter>*/}
      <SidebarRail />
    </Sidebar>
  );
}
