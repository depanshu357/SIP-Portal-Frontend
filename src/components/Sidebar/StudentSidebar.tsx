"use client";

import Nav from "@/components/Nav";
import { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import { EventDefault, EventType } from "@/types/custom_types";

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
    title: "Job Openings",
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
    title: "Events",
    label:"",
    icon: LayoutList,
    variant: "default",
    href: "/student/event",
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
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  const setEvent: React.Dispatch<React.SetStateAction<EventType>> = eventContext ? eventContext.setEvent : () => {};
  const [links, setLinks] = useState<Array<LinkType>>(initialLinks);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    function handleLinks() {
      let isForEvent: boolean = false;
      initialLinks.forEach((link: LinkType) => {
        if (link.href === pathname) {
          isForEvent = link.isForEvent ?? false;
        }
        if(pathname.startsWith("/student/proforma")){
          isForEvent = true;
        }
      });
      const filteredLinks = initialLinks.filter((link) => {
        return link.isForEvent === isForEvent;
      });
      if(isForEvent && event.Title === "") {
        router.push("/student/event");
      }
      const finalLinks: LinkType[] = filteredLinks.map((link: LinkType) => {
        if (link.href === pathname) {
          return { ...link, variant: "default" };
        } else {
          return { ...link, variant: "ghost" };
        }
      });
      setLinks(finalLinks);
    }
    handleLinks();
    return () => {
      // handleLinks();
    };
  }, [event, pathname]);
  useEffect(() => {
    function handleLinks() {
      let isForEvent: boolean = false;
      initialLinks.forEach((link: LinkType) => {
        if (link.href === pathname) {
          isForEvent = link.isForEvent ?? false;
        }
      });
      const fileteredLinks = initialLinks.filter((link) => {
        return link.isForEvent === isForEvent;
      });
      if(isForEvent && event.Title === "") {
        router.push("/student/event");
      }
      const finalLinks: LinkType[] = fileteredLinks.map((link: LinkType) => {
        if (link.href === pathname) {
          return { ...link, variant: "default" };
        } else {
          return { ...link, variant: "ghost" };
        }
      });
      setLinks(finalLinks);
    }
    if (event.Title === "") {
      router.push("/student/event");
    }
    handleLinks();
    return () => {
    };
  }, []);
  const handleEventLeave = () => {
    setEvent(EventDefault);
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
        {event.Title!=="" && <span className="cursor-pointer" onClick={handleEventLeave}><ExitToAppIcon /></span>}
        {event.Title}
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
