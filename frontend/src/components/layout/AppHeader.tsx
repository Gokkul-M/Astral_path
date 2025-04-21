
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/tasks":
      return "Smart Tasks";
    case "/thought-web":
      return "Thought Web";
    case "/focus":
      return "Focus Mode";
    case "/settings":
      return "Settings";
    default:
      return "Cogniflow";
  }
};

export const AppHeader = () => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <header className="border-b border-border h-16 px-4 md:px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu size={20} />
          </Button>
        </SidebarTrigger>
        <h1 className="font-semibold text-xl hidden md:block">{title}</h1>
      </div>
      <div>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
      </div>
    </header>
  );
};
