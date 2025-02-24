"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {useRouter} from "next/navigation"

import {
  DataGrid,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

import { dataGridTheme } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CustomNoRowsOverlay } from "@/components/CustomNoRowsOverlay";
import { EventContext } from "@/contexts/eventContext";
import { EventDefault, EventType } from "@/types/custom_types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { enqueueSnackbar } from "notistack";

function Toolbar() {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
      <div>
        <GridToolbarQuickFilter />
      </div>
    </div>
  );
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

const JobOpenings = (props: Props) => {
  const [rows, setRows] = useState<any>([]); 
  const router = useRouter();
  const eventContext = useContext(EventContext);
  const event: EventType = eventContext ? eventContext.event : EventDefault;

  function handleEventShowProforma(id: string){
    router.push(`/admin/proforma/${id}`);
  }
  useEffect(() => {
    let instance = axios.create({
      withCredentials: true,
    });
    instance
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/admin/job-descriptions`, {
        params: {
          event: event.id,
        },
      })
      .then((res) => {
        console.log(res.data.jobDescriptionList);
        let jobDescriptionList = res.data.jobDescriptionList
        setRows(jobDescriptionList.map((row: any) => {return {id: row.ID, title: row.Title, company: row.Company, visible: row.Visible, deadline: row.Deadline}}))
      });
  }, []);

  const handleEventChange = (id:string) => {
    const authInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_KEY,
        withCredentials: true,
      });
      authInstance
      .put(`/admin/toggle-proforma-visibility`, {
        id: id,
      }).then((res) => {
        enqueueSnackbar(res.data.message, {
          variant: "success",
        });
        setRows((prev:any) => {
            return prev.map((data:any) => {
                if(data.id === id) return {...data, visible: !data.visible}
                return data
            })
        })
      }).catch((err) => {
        enqueueSnackbar(err.response?.data?.message || "An error occurred", {
          variant: "error",
        });
      })
    
  }

  const columns = [
    { field: "title", headerName: "Profile", minWidth: 200, flex: 1 },
    { field: "company", headerName: "Company", minWidth: 100, flex: 1 },
    { field: "deadline", headerName: "Deadline", minWidth: 200, flex: 1,
        renderCell: (params: { row: any }) => {
          return (
            <div>
              {formatTime(params.row.deadline)}
            </div>
          );
        }
       },
    {
      field: "actions",
      headerName: "Visibility Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: any }) => {
        return (
          <div>
            <Switch
              id="event-mode"
              checked={params.row.visible}
              className=" data-[state=checked]:bg-emerald-600 bg-red focus:ring-emerald-500"
              onClick={() => {
                handleEventChange(params.row.id);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "proforma",
      headerName: "Proforma",
      flex: 1,
      minWidth: 100,
      renderCell: (params: { row: any }) => {
        return (
          <div>
            <Button
            onClick={() => handleEventShowProforma(params.row.id)}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            Open
          </Button>
          </div>
        );
      },
    }
]
  return (
    <div>
      <ThemeProvider theme={dataGridTheme}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          slots={{ toolbar: Toolbar, noRowsOverlay: CustomNoRowsOverlay }}
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
    </div>
  );
};

export default JobOpenings;
