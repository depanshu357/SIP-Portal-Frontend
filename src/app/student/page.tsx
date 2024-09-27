'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { doSignOut } from '@/app/actions'

type Props = {}

const StudentPage = (props: Props) => {
  return (
    <div>StudentPage
      <Button onClick={() => doSignOut()}>Click me</Button>
    </div>
  )
}

export default StudentPage