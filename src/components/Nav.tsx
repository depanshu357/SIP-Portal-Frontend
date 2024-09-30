"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Link2,
  LinkIcon,
  LogOut,
  LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@mui/material";
import { useState } from "react";
type IconType = typeof Icon;
interface NavProps {
  isCollapsed: boolean;
  setIsCollapsed?: (isCollapsed: boolean) => void;
  links: {
    title: string;
    label?: string;
    icon: any;
    variant: "default" | "ghost";
    href: string;
  }[];
  setLinks?: (links: any[]) => void;
  breakpoint?: number
}

const Nav = ({ links, isCollapsed, setLinks, setIsCollapsed, breakpoint }: NavProps) => {
  const { data: session } = useSession();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleLinkClick = (index: number) => {
    console.log("clicked", index);
    // links.forEach((link, i) => {
    //   if (i === index) {
    //     links[i].variant = "default";
    //   } else {
    //     links[i].variant = "ghost";
    //   }
    // });
    const newLinks = links?.map((link, i) => {
      if (i === index) {
        link.variant = "default";
      } else {
        link.variant = "ghost";
      }
      return link;
    });
    if (newLinks === undefined) return;
    setLinks(newLinks);
  };
  return (
    <>
      {/* desktop view */}
      <div
        data-collapsed={isCollapsed}
        className="drop-shadow-lg hidden md:flex group flex-col justify-between gap-4 py-2 data-[collapsed=true]:py-2 align-b h-screen bg-emerald-200 z-40"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {/* <div> */}
          <div className="text-emerald-600 font-bold text-xl flex justify-center">
            {isCollapsed ? "" : "SIP Portal"}
            {!isCollapsed && (
              <ArrowLeft
                className="h-5 w-5 m-auto cursor-pointer"
                onClick={() => setIsCollapsed(true)}
              />
            )}
            {isCollapsed && (
              <ArrowRight
                className="h-5 w-5 m-auto cursor-pointer"
                onClick={() => setIsCollapsed(false)}
              />
            )}
          </div>
          <Separator className="my-1 bg-emerald-400" />
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                    onClick={() => handleLinkClick(index)}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {/* {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )} */}
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Link
                  key={index}
                  href={link.href}
                  className={
                    cn(
                      buttonVariants({ variant: link.variant, size: "sm" }),
                      link.variant === "default" &&
                        "shadow-md bg-white text-emerald-700 hover:bg-white dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                      "justify-start"
                    ) + " w-[180px]  gap-2 "
                  }
                  onClick={() => handleLinkClick(index)}
                >
                  <link.icon className="h-4 w-4" />
                  {link.title}
                  {/* {link.label && (
                <span
                  className={cn(
                    "ml-auto w-[60px]",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )} */}
                </Link>
                {index === breakpoint && <Separator className="my-1 bg-emerald-400" />}
              </>
            )
          )}
          {/* </div> */}
        </nav>
        <div className="px-2 flex flex-col gap-2 mb-2">
          <div
            className={
              isCollapsed
                ? "w-full"
                : "w-[180px]" +
                  " bg-white rounded-md p-2 flex flex-row items-center gap-2 w-[170px] overflow-x-clip "
            }
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://" />
              <AvatarFallback className="bg-emerald-50 text-emerald-600">
                {session?.user?.name
                  ?.split(" ")
                  .map((n: string, index: number) => {
                    if (index === 0 || index === 1) return n[0];
                    return "";
                  }) ?? "SIP"}
              </AvatarFallback>
            </Avatar>
            <div
              className={isCollapsed ? "hidden" : "flex" + " flex flex-col "}
            >
              <span>
                {session?.user?.name ?? session?.user?.role ?? "User"}
              </span>
              <span className="text-gray-500 text-sm">
                {session?.user?.email?.split('@')[0] ?? "Email"}
              </span>
            </div>
          </div>
          <span
            className={
              "cursor-pointer hover:bg-white flex flex-row p-2 gap-2 rounded-md"
            }
            onClick={() =>
                signOut({ redirect: true, callbackUrl: "/sign-in" })
              }
          >
            <LogOut className="h-5 w-5" />
            <span
              
              className={isCollapsed ? "hidden" : "block"}
            >
              Sign out
            </span>
          </span>
        </div>
      </div>
      {/* mobile view */}
      {!isNavOpen && <ArrowRight className="visible md:hidden h-5 w-5 m-auto cursor-pointer absolute top-2 left-2 z-20 text-emerald-600" onClick={() => setIsNavOpen(true)}/>}
      <div className={`${!isNavOpen ? "-translate-x-full" : ""} ease-in-out duration-500 absolute z-40 shadow-md md:hidden flex flex-col justify-between gap-4 py-2 align-b h-screen bg-emerald-200 `}>
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {/* <div> */}
          <div className="text-emerald-600 font-bold text-xl flex justify-center">
            {"SIP Portal"}
            {isNavOpen && (
              <ArrowLeft
                className="h-5 w-5 m-auto cursor-pointer"
                onClick={() => setIsNavOpen(false)}
              />
            )}
          </div>
          <Separator className="my-1 bg-emerald-400" />
          {links.map((link, index) => (
            <div key={index}>
              <Link
                key={index}
                href={link.href}
                className={
                  cn(
                    buttonVariants({ variant: link.variant, size: "sm" }),
                    link.variant === "default" &&
                      "shadow-md bg-white text-emerald-700 hover:bg-white dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start"
                  ) + " w-[180px]  gap-2 "
                }
                onClick={() => handleLinkClick(index)}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
              {index === 2 && <Separator className="my-1 bg-emerald-400" />}
            </div>
          ))}
          {/* </div> */}
        </nav>
        <div className="px-2 flex flex-col gap-2 mb-2">
          <div
            className={
              isCollapsed
                ? "w-full"
                : "w-[170px]" +
                  " bg-white rounded-md p-2 flex flex-row items-center gap-2 w-[170px] overflow-x-clip "
            }
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://" />
              <AvatarFallback className="bg-emerald-50 text-emerald-600">
                {session?.user?.name
                  ?.split(" ")
                  .map((n: string, index: number) => {
                    if (index === 0 || index === 1) return n[0];
                    return "";
                  }) ?? "SIP"}
              </AvatarFallback>
            </Avatar>
            <div
              className={isCollapsed ? "hidden" : "flex" + " flex flex-col "}
            >
              <span>
                {session?.user?.name ?? session?.user?.role ?? "User"}
              </span>
              <span className="text-gray-500 text-sm">
                {session?.user?.email?.split("@")[0] ?? "Email"}
              </span>
            </div>
          </div>
          <span
            className={
              "cursor-pointer hover:bg-white flex flex-row p-2 gap-2 rounded-md"
            }
          >
            <LogOut className="h-5 w-5" />
            <span
              onClick={() =>
                signOut({ redirect: true, callbackUrl: "/sign-in" })
              }
              className={isCollapsed ? "hidden" : "block"}
            >
              Sign out
            </span>
          </span>
        </div>
      </div>
      {isNavOpen && (
        <div className="visible md:hidden w-screen h-screen bg-gray-600 bg-opacity-25 absolute z-30" onClick={() => setIsNavOpen(false)}>
            
        </div>
      )}
    </>
  );
};

export default Nav;
