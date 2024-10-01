"use client";

import Nav from "@/components/Nav";
import { useState } from "react";
import {
  Bell,
  FileBox,
  Phone,
  UserRoundPen,
} from "lucide-react";
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
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default RecruiterSidebar;
