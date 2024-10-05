import RecruiterSidebar from "@/components/Sidebar/RecruiterSidebar";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

const layout = (
  { children }: { children: React.ReactNode },
  session: any
): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <RecruiterSidebar>{children}</RecruiterSidebar>
      </MantineProvider>
    </SessionProvider>
  );
};

export default layout;
