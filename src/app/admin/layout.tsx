import AdminSidebar from '@/components/Sidebar/AdminSidebar'
import { SessionProvider } from 'next-auth/react'
import { MantineProvider } from '@mantine/core'
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';

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