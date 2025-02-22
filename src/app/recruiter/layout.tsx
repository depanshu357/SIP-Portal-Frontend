'use client';

import '@mantine/dates/styles.css';
import RecruiterSidebar from "@/components/Sidebar/RecruiterSidebar";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

const layout = (
  { children }: { children: React.ReactNode },
  session: any
): React.ReactNode => {
  const [event, setEvent] = useState<EventType>(EventDefault);
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <EventContext.Provider value={{ event, setEvent }}>
        <RecruiterSidebar>{children}</RecruiterSidebar>
        </EventContext.Provider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default layout;
