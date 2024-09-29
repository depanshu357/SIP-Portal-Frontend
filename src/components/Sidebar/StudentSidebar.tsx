"use client";

import Nav from "@/components/Nav";
import { useState } from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Bell,
  File,
  FileText,
  Inbox,
  MessagesSquare,
  Phone,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  UserRoundPen,
  Users2,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import WorkIcon from "@mui/icons-material/Work";
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
  return (
    <div className="flex flex-row bg-white">
      <TooltipProvider>
        <Nav
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          links={links}
          setLinks={setLinks}
        />
      </TooltipProvider>
    <div className="h-10 bg-emerald-200 w-full fixed top-0 right-0"></div>

      <div className="mt-10">{children}</div>
    </div>
  );
};

export default StudentSidebar;
