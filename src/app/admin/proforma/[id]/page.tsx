'use client'

import React from 'react'
import {useParams} from 'next/navigation'
import Proforma from '@/components/Proforma'

type Props = {}

const RecruiterProforma = (props: Props) => {
  const params = useParams()
  return (
    <Proforma id={params.id} />
  )
}

export default RecruiterProforma