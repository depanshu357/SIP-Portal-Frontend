"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import {SnackbarProvider, enqueueSnackbar} from "notistack";
import {
  Bell,
  FileText,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

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

const AdminSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [links, setLinks] = useState<Array<LinkType>>([
    {
      title: "Admin",
      label: "",
      icon: AdminPanelSettingsOutlinedIcon,
      variant: "default",
      href: "/admin/admin",
    },
    {
      title: "Student",
      label: "",
      icon: PersonSearchOutlinedIcon,
      variant: "ghost",
      href: "/admin/student",
    },
    {
      title: "Recruiters",
      label: "",
      icon: BadgeOutlinedIcon,
      variant: "ghost",
      href: "/admin/recruiter",
    },
    {
      title: "Create-Notice",
      label: "",
      icon: EmailOutlinedIcon,
      variant: "ghost",
      href: "/admin/create-notice",
    },
    {
      title: "Notifications",
      label: "",
      icon: Bell,
      variant: "ghost",
      href: "/admin/notifications",
    },
    {
      title: "Resume",
      label: "",
      icon: FileText,
      variant: "ghost",
      href: "/admin/resume",
    },
    {
      title: "Job Openings",
      label: "",
      icon: WorkOutlineModifiedIcon,
      variant: "ghost",
      href: "/admin/job-openings",
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
      <div className="h-10 bg-emerald-200 w-full fixed top-0 right-0 z-20"></div>  
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

export default AdminSidebar;
