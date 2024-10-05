"use client";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import {
  Bell,
  FileText,
  Phone,
  UserRoundPen,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SnackbarProvider } from "notistack";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const WorkOutlineModifiedIcon = () => {
  return (
    <WorkOutlineOutlinedIcon
      sx={{ width: "1rem", height: "1rem", margin: "0" }}
    />
  );
};

type LinkType = {
  title: string;
  label?: string;
  icon: any;
  variant: "default" | "ghost";
  href: string;
};

const StudentSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [links, setLinks] = useState<Array<LinkType>>([
    {
      title: "Notifications",
      label: "128",
      icon: Bell,
      variant: "default",
      href: "/student/notifications",
    },
    {
      title: "Resume",
      label: "9",
      icon: FileText,
      variant: "ghost",
      href: "/student/resume",
    },
    {
      title: " Job Openings",
      label: "0",
      icon: WorkOutlineModifiedIcon,
      variant: "ghost",
      href: "/student/job-openings",
    },
    {
      title: "Profile",
      label: "23",
      icon: UserRoundPen,
      variant: "ghost",
      href: "/student/profile",
    },
    {
      title: "Contact us",
      label: "",
      icon: Phone,
      variant: "ghost",
      href: "/student/contact-us",
    },
  ]);
  useEffect(() => {
    const Intiate = () => {
      const pathname = window.location.pathname;
      setLinks((prev) =>
        prev.map((link) => {
          if (link.href === pathname) {
            return { ...link, variant: "default" };
          } else {
            return { ...link, variant: "ghost" };
          }
        })
      );
    }
    
    return () => {
      Intiate()
    }
  }, [])
  return (
    <div className="flex flex-row bg-white">
      <TooltipProvider>
        <Nav
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          links={links}
          setLinks={setLinks}
          breakpoint={2}
        />
      </TooltipProvider>
      <div className="h-10 bg-emerald-200 w-full fixed top-0 right-0"></div>
      <SnackbarProvider anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }} 
          autoHideDuration={3000}>
      <div className="pt-12 bg-emerald-50 w-full overflow-hidden p-4 h-screen overflow-y-scroll">{children}</div>
      </SnackbarProvider>
    </div>
  );
};

export default StudentSidebar;
