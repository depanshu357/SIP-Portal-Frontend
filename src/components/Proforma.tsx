import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { Paper } from '@mui/material'
import { Label } from './ui/label'
import RichTextReader from './RichTextReader'
import BranchProgramDisplayTable from './BranchProgramDisplayTable'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";

type Props = {id: any}

const Proforma = ({id}: Props) => {
  const [data, setData] = useState<any>({})
  const router = useRouter()
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  useEffect(() => {
    const instance = axios.create({
        withCredentials: true,
        });
    instance.get(`${process.env.NEXT_PUBLIC_API_KEY}/proforma`,{
        params: {
            proformaId: id,
            eventId: event.id
        }
    }).then((res) => {
        console.log(res.data.proforma)
        setData(res.data.proforma)
    }).catch((err) => {
        console.log(err)
    })
  },[])
  return (
    <div>
    <Paper
    sx={{
      maxWidth: "1200px",
      marginX: "10px",
      margin: "auto",
      marginTop: "2rem",
      padding: "10px",
    }}
    elevation={3}
  >
    <div onClick={() => router.back()} className='cursor-pointer'>
        <ArrowBackIcon  />
    </div>
    <h1 className="text-center text-4xl p-2 font-bold text-emerald-600">
            Proforma
          </h1>
    <div className='flex flex-col gap-2'>
        <div className="flex flex-col">
            <Label className='text-md font-bold'>Company</Label>
            <div className='border-emerald-200 border-2 rounded-md p-2'>{data?.Company}</div>
        </div>
        <div>
            <Label className='text-md font-bold'>Profile</Label>
            <div className='border-emerald-200 border-2 rounded-md p-2'>{data.Title}</div>
        </div>
        <div>
            <Label className='text-md font-bold'>Description</Label>
            <div className='border-emerald-200 border-2 rounded-md'>
                <RichTextReader key={data?.ID} value={data?.Description?.toString() ?? ""} />
            </div>
        </div>
        <div>
            <Label className='text-md font-bold'>Stipend</Label>
            <div className='border-emerald-200 border-2 rounded-md p-2'>{data.Stipend}</div>
        </div>
        <div>
            <Label className='text-md font-bold'>Location</Label>
            <div className='border-emerald-200 border-2 rounded-md p-2'>{data.Location}</div>
        </div>
    </div>
    <div>
        <BranchProgramDisplayTable eligibility={data?.Eligibility} />
    </div>


  </Paper>
  </div>
    
  )
}

export default Proforma