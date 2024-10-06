"use client";

import AdminSidebar from "@/components/Sidebar/AdminSidebar";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { createContext, useContext, useState } from "react";

interface EventContextType {
  event: string;
  setEvent: React.Dispatch<React.SetStateAction<string>>;
}

export const EventContext = createContext<EventContextType | null>(null);

const layout = (
  { children }: { children: React.ReactNode },
  session: any
): React.ReactNode => {
  const [event, setEvent] = useState("");
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <EventContext.Provider value={{ event, setEvent }}>
          <AdminSidebar>{children}</AdminSidebar>
        </EventContext.Provider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default layout;
