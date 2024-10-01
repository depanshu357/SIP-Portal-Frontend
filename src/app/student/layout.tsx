import StudentSidebar from '@/components/Sidebar/StudentSidebar'
import { SessionProvider } from 'next-auth/react'

const layout = ({ children }: { children: React.ReactNode }, session: any): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      <StudentSidebar >
        {children}
      </StudentSidebar >
    </SessionProvider>
  )
}

export default layout