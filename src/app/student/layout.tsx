import StudentSidebar from "@/components/Sidebar/StudentSidebar";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

const layout = (
  { children }: { children: React.ReactNode },
  session: any
): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <StudentSidebar>{children}</StudentSidebar>
      </MantineProvider>
    </SessionProvider>
  );
};

export default layout;
