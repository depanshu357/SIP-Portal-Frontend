import RecruiterSidebar from '@/components/Sidebar/RecruiterSidebar'
import { SessionProvider } from 'next-auth/react'

const layout = ({ children }: { children: React.ReactNode }, session: any): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      <RecruiterSidebar >
        {children}
      </RecruiterSidebar >
    </SessionProvider>
  )
}

export default layout