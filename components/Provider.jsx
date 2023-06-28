"use client" // using the browser capability

import { SessionProvider } from 'next-auth/react'

// Higher order component - wrap other component with it
const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider