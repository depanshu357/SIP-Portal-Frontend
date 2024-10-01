"use client";

import Nav from "@/components/Nav";
import { useState } from "react";
import {
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
      label: "0",
      icon: BadgeOutlinedIcon,
      variant: "ghost",
      href: "/admin/recruiter",
    },
    {
      title: "Notice-Student",
      label: "23",
      icon: EmailOutlinedIcon,
      variant: "ghost",
      href: "/admin/notice-student",
    },
    {
      title: "Notice-Company",
      label: "",
      icon: EmailOutlinedIcon,
      variant: "ghost",
      href: "/admin/notice-company",
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
      <div className="mt-8 bg-emerald-50 w-full overflow-hidden p-4">{children}</div>
    </div>
  );
};

export default AdminSidebar;
