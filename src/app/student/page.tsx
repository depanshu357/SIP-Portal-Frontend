'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { doSignOut } from '@/app/actions'

const StudentPage = () => {
  return (
    <div>StudentPage
      <Button onClick={() => doSignOut()}>Click me</Button>
    </div>
  )
}

export default StudentPage