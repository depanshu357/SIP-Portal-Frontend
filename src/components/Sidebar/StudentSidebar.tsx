"use client";

import Nav from "@/components/Nav";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EventContext } from "@/contexts/eventContext";

import {
  BadgeInfo,
  Bell,
  FileText,
  LayoutList,
  Phone,
  ReceiptText,
  UserRoundPen,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SnackbarProvider } from "notistack";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PolicyIcon from '@mui/icons-material/Policy';

const WorkOutlineModifiedIcon = () => {
  return (
    <WorkOutlineOutlinedIcon
      sx={{ width: "1rem", height: "1rem", margin: "0" }}
    />
  );
};

const PolicyIconModified = () => {
  return(<PolicyIcon sx={{width:"16",height:"16",margin:"0"}}/>)
}

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
    title: "Notifications",
    label: "",
    icon: Bell,
    variant: "default",
    href: "/student/notifications",
    isForEvent: true,
  },
  {
    title: "Resume",
    label: "",
    icon: FileText,
    variant: "ghost",
    href: "/student/resume",
    isForEvent: true,
  },
  {
    title: " Job Openings",
    label: "",
    icon: WorkOutlineModifiedIcon,
    variant: "ghost",
    href: "/student/job-openings",
    isForEvent: true,
  },
  {
    title: "Profile",
    label: "",
    icon: UserRoundPen,
    variant: "ghost",
    href: "/student/profile",
    isForEvent: true,
  },
  {
    title: "Contact us",
    label: "",
    icon: Phone,
    variant: "ghost",
    href: "/student/contact-us",
    isForEvent: true,
  },
  {
    title: "Events",
    label:"",
    icon: LayoutList,
    variant: "ghost",
    href: "/student/event",
    isForEvent: false
  },
  {
    title: "Profile",
    label:"",
    icon: UserRoundPen,
    variant: "ghost",
    href: "/student/profile",
    isForEvent: false
  },
  {
    title: "Intern Policy",
    label:"",
    icon: ReceiptText,
    variant: "ghost",
    href: "/student/policy",
    isForEvent: false
  },
  {
    title: "Contact us",
    label: "",
    icon: Phone,
    variant: "ghost",
    href: "/student/contact-us",
    isForEvent: false,
  },
  {
    title: "About",
    label: "",
    icon: BadgeInfo,
    variant: "ghost",
    href: "/student/about",
    isForEvent: false,
  },
]

const StudentSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const eventContext = useContext(EventContext);
  const event = eventContext ? eventContext.event : "";
  const setEvent: React.Dispatch<React.SetStateAction<string>> = eventContext ? eventContext.setEvent : () => {};
  const [links, setLinks] = useState<Array<LinkType>>(initialLinks);
  const router = useRouter();
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
  useEffect(() => {
    function handleLinks() {
      const fileteredLinks = initialLinks.filter((link) => {
        if (event === "") {
          return link.isForEvent === false;
        } else {
          return link.isForEvent === true;
        }
      });
      setLinks(fileteredLinks);
    }
    handleLinks();
    return () => {
      handleLinks();
    };
  }, [event]);
  const handleEventLeave = () => {
    setEvent("");
    router.push("/student/event");
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
