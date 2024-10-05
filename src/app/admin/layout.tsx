import AdminSidebar from '@/components/Sidebar/AdminSidebar'
import { SessionProvider } from 'next-auth/react'
import { MantineProvider } from '@mantine/core'


const layout = ({ children }: { children: React.ReactNode }, session: any): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      <MantineProvider>
        <AdminSidebar >
          {children}
        </AdminSidebar >
      </MantineProvider>
    </SessionProvider>
  )
}

export default layout