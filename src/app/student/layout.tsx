"use client";

import StudentSidebar from "@/components/Sidebar/StudentSidebar";
import { EventContext } from "@/contexts/eventContext";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

const layout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [event, setEvent] = useState<string>("");
  return (
    <SessionProvider>
      <MantineProvider>
        <EventContext.Provider value={{ event, setEvent }}>
          <StudentSidebar>{children}</StudentSidebar>
        </EventContext.Provider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default layout;
