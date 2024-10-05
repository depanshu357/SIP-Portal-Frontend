"use client";

import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import {
  Bell,
  FileBox,
  Phone,
  UserRoundPen,
} from "lucide-react";
import { SnackbarProvider } from "notistack";
import { TooltipProvider } from "@/components/ui/tooltip";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";

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

const RecruiterSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [links, setLinks] = useState<Array<LinkType>>([
    {
      title: "Notifications",
      label: "128",
      icon: Bell,
      variant: "default",
      href: "/recruiter/notifications",
    },
    {
      title: "Job Description",
      label: "0",
      icon: FileBox,
      variant: "ghost",
      href: "/recruiter/submit-proforma",
    },
    {
      title: "Job Openings",
      label: "0",
      icon: WorkOutlineModifiedIcon,
      variant: "ghost",
      href: "/recruiter/job-openings",
    },
    {
      title: "Applicants",
      label: "",
      icon: ListAltIcon,
      variant: "ghost",
      href: "/recruiter/applicants",
    },
    {
      title: "Profile",
      label: "",
      icon: UserRoundPen,
      variant: "ghost",
      href: "/recruiter/profile",
    },
    {
      title: "Contact us",
      label: "",
      icon: Phone,
      variant: "ghost",
      href: "/recruiter/contact-us",
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
          breakpoint = {3}
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

export default RecruiterSidebar;
