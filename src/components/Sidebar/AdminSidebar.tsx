"use client";

import { useContext, useEffect, useState } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { usePathname, useRouter } from "next/navigation";
import { EventContext } from "@/contexts/eventContext";

import Nav from "@/components/Nav";
import { Bell, Calendar, DoorOpen, FileText, LayoutList } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

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
  isForEvent?: boolean;
};

const initialLinks: Array<LinkType> = [
  {
    title: "Events",
    label: "",
    icon: LayoutList,
    variant: "default",
    href: "/admin/event",
    isForEvent: false,
  },
  {
    title: "Admin",
    label: "",
    icon: AdminPanelSettingsOutlinedIcon,
    variant: "default",
    href: "/admin/admin",
    isForEvent: true,
  },
  {
    title: "Student",
    label: "",
    icon: PersonSearchOutlinedIcon,
    variant: "ghost",
    href: "/admin/student",
    isForEvent: true,
  },
  {
    title: "Recruiters",
    label: "",
    icon: BadgeOutlinedIcon,
    variant: "ghost",
    href: "/admin/recruiter",
    isForEvent: true,
  },
  {
    title: "Create-Notice",
    label: "",
    icon: EmailOutlinedIcon,
    variant: "ghost",
    href: "/admin/create-notice",
    isForEvent: true,
  },
  {
    title: "Create-Event",
    label: "",
    icon: Calendar,
    variant: "ghost",
    href: "/admin/create-event",
    isForEvent: false,
  },
  {
    title: "Notifications",
    label: "",
    icon: Bell,
    variant: "ghost",
    href: "/admin/notifications",
    isForEvent: true,
  },
  {
    title: "Resume",
    label: "",
    icon: FileText,
    variant: "ghost",
    href: "/admin/resume",
    isForEvent: true,
  },
  {
    title: "Job Openings",
    label: "",
    icon: WorkOutlineModifiedIcon,
    variant: "ghost",
    href: "/admin/job-openings",
    isForEvent: true,
  }
];

const AdminSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const eventContext = useContext(EventContext);
  const event = eventContext ? eventContext.event : "";
  const setEvent: React.Dispatch<React.SetStateAction<string>> = eventContext ? eventContext.setEvent : () => {};
  const [links, setLinks] = useState<Array<LinkType>>(initialLinks);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    function handleLinks() {
      const fileteredLinks = initialLinks.filter((link) => {
        if (event === "") {
          return link.isForEvent === false;
        } else {
          return link.isForEvent === true;
        }
      });
      setLinks(
        fileteredLinks.map((link: LinkType) => {
          if (link.href === pathname) {
            return { ...link, variant: "default" };
          } else {
            return { ...link, variant: "ghost" };
          }
        })
      );
    }
    handleLinks();
    return () => {
      handleLinks();
    };
  }, [event,pathname]);
  const handleEventLeave = () => {
    setEvent("");
    router.push("/admin/event");
  }
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
      <div className="h-10 bg-emerald-200 w-full fixed top-0 right-0 z-20 flex flex-row-reverse gap-2 items-center px-2">
        {event!=="" && <span className="cursor-pointer" onClick={handleEventLeave}><ExitToAppIcon /></span>}
        {event}
      </div>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
      >
        <div className="pt-12 bg-emerald-50 w-full overflow-hidden p-4 h-screen overflow-y-scroll">
          {children}
        </div>
      </SnackbarProvider>
    </div>
  );
};

export default AdminSidebar;
