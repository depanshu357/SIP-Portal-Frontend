import AdminSidebar from '@/components/Sidebar/AdminSidebar'
import { SessionProvider } from 'next-auth/react'

const layout = ({ children }: { children: React.ReactNode }, session: any): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      <AdminSidebar >
        {children}
      </AdminSidebar >
    </SessionProvider>
  )
}

export default layout