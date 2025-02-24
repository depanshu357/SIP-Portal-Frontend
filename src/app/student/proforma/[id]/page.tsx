'use client'

import {useParams} from 'next/navigation'
import Proforma from '@/components/Proforma'

type Props = {}

const ProformaForStudent = (props: Props) => {
    const params = useParams()
    return (
      <Proforma id={params.id} />
    )
}

export default ProformaForStudent