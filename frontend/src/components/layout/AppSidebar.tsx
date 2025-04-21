import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BrainCircuit,
  CheckSquare,
  Timer,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Tasks", path: "/tasks", icon: CheckSquare },
  { title: "Thought Web", path: "/thought-web", icon: BrainCircuit },
  { title: "Focus Mode", path: "/focus", icon: Timer },
  { title: "Settings", path: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <Sidebar className="border-r border-border bg-white dark:bg-[#1e1e2f] min-h-screen shadow-lg">
      {/* Header */}
      <SidebarHeader className="py-6 px-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow">
            🌠
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-white">
            Astral Path
          </span>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="py-4 px-3">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out group hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700",
                    isActive(item.path)
                      ? "bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-white font-semibold shadow-inner"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "transition-transform duration-200 group-hover:scale-110",
                      isActive(item.path) ? "text-purple-700 dark:text-white" : ""
                    )}
                  />
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-5 border-t border-border mt-auto bg-gradient-to-t from-white/80 to-white/40 dark:from-[#1e1e2f]/80 dark:to-[#1e1e2f]/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md ring-2 ring-white dark:ring-gray-800">
            G
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              Gokkul
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
