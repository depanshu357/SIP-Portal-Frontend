"use client";

import axios from "axios";
import {useRouter} from 'next/navigation'

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { Button } from "@/components/ui/button";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";

type Received = {
  ID: string;
  Title: string;
  Profile: string;
  Deadline: string;
  Visible: boolean;
}

type Row = {
  id: string;
  title: string;
  profile: string;
  deadline: string;
  visible: boolean;
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const time = `${formattedHours}:${minutes} ${ampm}`;
  return `${day}-${month}-${year}` === "01-01-1" ? "N/A" : `${day}-${month}-${year} ${time}`;
}



 
type Props = {};

const RecruiterJobOpenings = (props: Props) => {
  const [jobOpenings, setJobOpenings] = useState<Row[]>([]);
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        withCredentials: true,
      });
      instance
        .get(`${process.env.NEXT_PUBLIC_API_KEY}/recruiter/job-descriptions`, 
          {
            params: {
              eventId: event.id,
            }
          }
        )
        .then((res) => {
          const jobDescriptions = res.data.jobDescriptions;
          const modifiedData: Row[] = jobDescriptions.map((job: Received) => {
            return {
              id: job.ID,
              title: job.Title,
              profile: job.Profile,
              deadline: job.Deadline,
              visible: job.Visible,
            };
          });
          setJobOpenings(modifiedData);
          console.log(jobDescriptions);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    return () => {};
  }, []);

  const handleEventShowProforma = (id: string) => {
    router.push(`/recruiter/proforma/${id}`);
  }

  const handleEditProforma = (id: string) => {
    router.push(`/recruiter/edit-proforma/${id}`)
  }

  const columns = [
    { field: "title", headerName: "Position", minWidth: 200, flex: 1 },
    { field: "deadline", headerName: "Deadline", minWidth: 200, flex: 1,
      renderCell: (params: { row: Row }) => {
        return (
          <div>
            {formatTime(params.row.deadline)}
          </div>
        );
      }
     },
    {
      field: "link",
      headerName: "Enter",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: Row }) => {
        return (
          <Button
            onClick={() => handleEventShowProforma(params.row.id)}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            Link
          </Button>
        );
      },
    },
    {
      field: "edit",
      headerName: "Action",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: Row }) => {
        return (
          <Button
            onClick={() => handleEditProforma(params.row.id)}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            Edit
          </Button>
        );
      },
    },
    
  ];
  return (<div>
    <ThemeProvider theme={dataGridTheme}>
        <DataGrid
          autoHeight
          rows={jobOpenings}
          columns={columns}
          slots={{ noRowsOverlay: CustomNoRowsOverlay }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            padding: "10px",
            maxWidth: "1200px",
            marginX: "10px",
            margin: "auto",
            backgroundColor: "white",
            "--DataGrid-overlayHeight": "300px",
            marginTop: "4rem",
            minHeight: "calc(100vh - 10rem)",
          }}
        />
      </ThemeProvider>
  </div>)
};

export default RecruiterJobOpenings;
