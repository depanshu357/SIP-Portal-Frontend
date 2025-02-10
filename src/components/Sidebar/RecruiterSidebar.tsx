"use client";

import Nav from "@/components/Nav";
import { useContext, useEffect, useState } from "react";
import {useRouter, usePathname} from "next/navigation";
import { EventContext } from "@/contexts/eventContext";

import {
  BadgeInfo,
  Bell,
  FileBox,
  LayoutList,
  Phone,
  ReceiptText,
  UserRoundPen,
} from "lucide-react";
import { SnackbarProvider } from "notistack";
import { TooltipProvider } from "@/components/ui/tooltip";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
    label: "128",
    icon: Bell,
    variant: "default",
    href: "/recruiter/notifications",
    isForEvent: true,
  },
  {
    title: "Job Description",
    label: "0",
    icon: FileBox,
    variant: "ghost",
    href: "/recruiter/job-description",
    isForEvent: true,
  },
  {
    title: "Job Openings",
    label: "0",
    icon: WorkOutlineModifiedIcon,
    variant: "ghost",
    href: "/recruiter/job-openings",
    isForEvent: true,
  },
  {
    title: "Applicants",
    label: "",
    icon: ListAltIcon,
    variant: "ghost",
    href: "/recruiter/applicants",
    isForEvent: true,
  },
  {
    title: "Profile",
    label: "",
    icon: UserRoundPen,
    variant: "ghost",
    href: "/recruiter/profile",
    isForEvent: true,
  },
  {
    title: "Contact us",
    label: "",
    icon: Phone,
    variant: "ghost",
    href: "/recruiter/contact-us",
    isForEvent: true,
  },
  {
    title: "Events",
    label: "",
    icon: LayoutList,
    variant: "ghost",
    href: "/recruiter/event",
    isForEvent: false,
  },
  {
    title: "Profile",
    label: "",
    icon: UserRoundPen,
    variant: "ghost",
    href: "/recruiter/profile",
    isForEvent: false,
  },
  {
    title: "Company Policy",
    label: "",
    icon: ReceiptText,
    variant: "ghost",
    href: "/recruiter/policy",
    isForEvent: false,
  },
  {
    title: "Contact us",
    label: "",
    icon: Phone,
    variant: "ghost",
    href: "/recruiter/contact-us",
    isForEvent: false,
  },
  {
    title: "About",
    label: "",
    icon: BadgeInfo,
    variant: "ghost",
    href: "/recruiter/about",
    isForEvent: false,
  },
]

const RecruiterSidebar = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const eventContext = useContext(EventContext);
  const event:EventType = eventContext ? eventContext.event : EventDefault;
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
      });
      const fileteredLinks = initialLinks.filter((link) => {
        return link.isForEvent === isForEvent;
      });
      const finalLinks: LinkType[] = fileteredLinks.map((link: LinkType) => {
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
      handleLinks();
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
      const finalLinks: LinkType[] = fileteredLinks.map((link: LinkType) => {
        if (link.href === pathname) {
          return { ...link, variant: "default" };
        } else {
          return { ...link, variant: "ghost" };
        }
      });
      setLinks(finalLinks);
    }
    return () => {
      if (event.Title === "") {
        router.push("/recruiter/event");
      }
      handleLinks();
    };
  }, []);
  const handleEventLeave = () => {
    setEvent(EventDefault);
    router.push("/recruiter/event");
  }
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

export default RecruiterSidebar;
