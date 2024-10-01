'use client'
import React from 'react'
import {useSession} from 'next-auth/react'
// import { SessionProvider } from 'next-auth/react'

const Home = () => {
  const {data: session} = useSession()
  // console.log(session)
  return (
    <div >Student Home
      <div>
        {session ? (
          <div> 
            <p>Signed in as {session?.user?.email}</p>
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home