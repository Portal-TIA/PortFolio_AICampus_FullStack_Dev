import * as React from "react"
import {
  IconHome,
  IconLayoutList,
  IconUser,
  IconBell,
  IconMessage,
  IconSettings,
  IconHelp,
  IconLogin,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "게스트",
    email: "guest@travelsns.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "광고",
      url: "/",
      icon: IconHome,
    },
    {
      title: "PRO",
      url: "/",
      icon: IconHome,
    },
    {
      title: "보도 자료",
      url: "/",
      icon: IconHome,
    },
    {
      title: "베스트 콘텐츠",
      url: "/",
      icon: IconHome,
    },
    {
      title: "여행 게시판",
      url: "/board",
      icon: IconLayoutList,
    },
    {
      title: "알림 소식",
      url: "/notifications",
      icon: IconBell,
    },
    {
      title: "메시지(DM)",
      url: "/messages",
      icon: IconMessage,
    },
    {
      title: "블로그",
      url: "/profile",
      icon: IconUser,
    },
  ],
  navSecondary: [
    {
      title: "환경 설정",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "고객 센터",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "로그인",
      url: "/login",
      icon: IconLogin,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">커뮤니티</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}