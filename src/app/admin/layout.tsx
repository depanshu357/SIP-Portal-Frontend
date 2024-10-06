"use client";

import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { createContext, useContext, useState } from "react";
import { EventContext } from "@/contexts/eventContext";

interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children}: LayoutProps): React.ReactNode => {
  const [event, setEvent] = useState<string>("");
  return (
    <SessionProvider>
      <MantineProvider>
        <EventContext.Provider value={{ event, setEvent }}>
          <AdminSidebar>{children}</AdminSidebar>
        </EventContext.Provider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default layout;
