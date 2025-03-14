import { 
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, 
    SidebarTrigger
} from '@/components/ui/sidebar'
import { Calendar, Home, Icon, Inbox, Search, Settings } from "lucide-react"
import React from 'react'



// Menu items.
const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]


const SidebarComponent = () => {
  return (
    <>
    <Sidebar>
      <SidebarContent>
      <div className="flex items-center gap-2 pb-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" /> {/* Adjust size */}
          <span className="text-lg font-semibold">LMS</span>
        </div>

        <SidebarGroup>
        
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
        {/* <SidebarTrigger/> */}

        </>
  )
}

export default SidebarComponent;