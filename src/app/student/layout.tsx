import React from 'react'
import { SessionProvider } from 'next-auth/react'
type Props = {}

const layout = ({children}: {children: React.ReactNode}, session: any): React.ReactNode => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default layout